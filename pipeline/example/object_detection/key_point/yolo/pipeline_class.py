import time
import os
import sys
import cv2
import logging
import torch
import ultralytics # fix empty results issue for ARM

# local imports
from pipeline_base import PipelineBase as Base

# functions from LMI AI Solutions repo: https://github.com/lmitechnologies/LMI_AI_Solutions
import gadget_utils.pipeline_utils as pipeline_utils


PASS = 'PASS'
FAIL = 'FAIL'
MIN_PTS = 4


class ModelPipeline(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.logger.info(f'gadget version: {self.version}')
        
    
    @Base.track_exception(logger)
    def load(self, model_roles, configs):
        """load the models"""
        self.load_models(model_roles, configs, '_model')
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        t1 = time.time()
        self.models['pose_model'].warmup()
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
        
        
    def preprocess(self, image, hw):
        """preprocess the image for object detection

        Args:
            image (numpy): a numpy array of image
            hw (list): a list of [height, width]

        Returns:
            img (numpy): a resized image
            operators (list): a list of operators used for converting back to original image size
        """
        h0,w0 = image.shape[:2]
        th,tw = hw
        img = cv2.resize(image, (tw,th))
        operators = [{'resize':[tw,th,w0,h0]}]
        return img, operators
    
    
    @torch.inference_mode()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs) -> dict:
        start_time = time.time()
        # init a result dict
        self.init_results()
        
        image = inputs['image']['pixels']
        
        if not self.models:
            raise Exception('failed to load pipeline model(s)')
        
        # load runtime config
        iou = configs['pose_model']['iou']
        hw = self.models['pose_model'].image_size
        class_info = configs['pose_model']['object_configs']
        confs = {k:v['confidence'] for k,v in class_info.items()}
        
        # run the object detection model
        processed_im, operators = self.preprocess(image, hw)
        results_kp, time_info = self.models['pose_model'].predict(processed_im, confs, operators, iou)
        
        # annotate the image using key points
        annotated_image = self.models['pose_model'].annotate_image(results_kp, image)
        
        # upload annotated image to GadgetAPP and GoFactory
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # obtain the results
        pts = results_kp['points'].astype(int)
        boxes = results_kp['boxes'].astype(int)
        objects = results_kp['classes']
        scores = results_kp['scores']
        
        # upload predictions to GoFactory
        h0,w0 = image.shape[:2]
        for i, c in enumerate(objects):
            box = boxes[i]
            score = scores[i]
            self.add_prediction('boxes', box, score, c, h0, w0)
            for pt in pts[i]:
                self.add_prediction('keypoints', pt, score, c, h0, w0)
        self.logger.info(f'predictions length: {len(self.results["outputs"]["labels"]["content"]["predictions"])}')
        
        # upload decision to the automation service
        decision = PASS if len(pts)>MIN_PTS else FAIL 
        self.update_results('decision', decision, to_automation=True)
        
        # upload tags to GoFactory
        tag = PASS if decision == PASS else FAIL
        self.update_results('tags', tag, to_factory=True)
        
        total_proc_time = time.time()-start_time
        
        self.logger.info(f'found objects: {objects}')
        self.logger.info(f'pts shape: {pts.shape}')
        self.logger.info(f'total proc time: {total_proc_time:.4f}s\n')
        
        return self.results



if __name__ == '__main__':
    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    image_dir = './data'
    output_dir = './outputs'
    fmt = 'jpg'
    
    logging.basicConfig()
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    pipeline = ModelPipeline(**kwargs)
    
    logger.info('start loading the pipeline...')
    pipeline.load({},kwargs)
    pipeline.warm_up(kwargs)

    image_path_batches = pipeline_utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt=fmt)
    z_scores = []
    FOMs = []
    filenames = []
    for batch in image_path_batches:
        for image_path in batch:
            fname = os.path.basename(image_path)
            logger.info(f'processing {fname}...')
            im_bgr = cv2.imread(image_path)
            im = cv2.cvtColor(im_bgr, cv2.COLOR_BGR2RGB)
            
            inputs = {
                'image':{'pixels':im},
            }
            results = pipeline.predict(kwargs, inputs)
            assert pipeline.check_return_types(), 'invalid return types'
            
            annotated_image = results['outputs']['annotated']
            tmp = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(os.path.join(output_dir, fname.replace(f'.{fmt}',f'_annotated.{fmt}')), tmp)
    
    pipeline.clean_up()
    