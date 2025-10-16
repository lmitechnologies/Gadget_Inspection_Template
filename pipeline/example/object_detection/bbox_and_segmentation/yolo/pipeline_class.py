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


class ModelPipeline(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.logger.info(f'gadget version: {self.version}')
        
    
    @Base.track_exception(logger)
    def load(self, models, configs):
        """load the models"""
        self.load_models(models, configs, 'seg_model')
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        t1 = time.time()
        self.models['seg_model'].warmup()
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
        hw = self.models['seg_model'].image_size
        model_configs = configs['models']['seg_model']['configs']
        # TODO
        iou = model_configs.get('iou', 0.5)
        confs = {k:v['confidence'] for k,v in model_configs.items() if isinstance(v, dict)}
        # run the object detection model
        processed_im, operators = self.preprocess(image, hw)
        results_dict, time_info = self.models['seg_model'].predict(processed_im, confs, operators)
        
        # annotate the image using polygons
        annotated_image = self.models['seg_model'].annotate_image(results_dict, image)
        
        # grab the results
        masks = results_dict['masks']   # binary masks for instance segmentation
        segs = results_dict['segments'] # polygons according to the masks
        boxes = results_dict['boxes']   # bounding boxes
        scores = results_dict['scores'] # model confidence scores
        objects = results_dict['classes']   # class labels
        
        # upload labels to Label Studio and GoFactory
        h0,w0 = image.shape[:2]
        for i,name in enumerate(objects):
            box = boxes[i].astype(int)
            seg = segs[i].astype(int)
            score = scores[i]
            self.add_prediction('boxes', box, score, name, h0, w0)
            self.add_prediction('polygons', seg, score, name, h0, w0)
        self.logger.info(f'predictions length: {len(self.results["outputs"]["labels"]["content"]["predictions"])}')
        
        # upload annotated image to GadgetAPP and GoFactory
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # upload decision to the Gadget automation service
        decision = PASS if len(objects) == 0 else FAIL # assume no object is PASS
        self.update_results('decision', decision, to_automation=True)
        
        # upload tags to GoFactory
        tag = PASS if decision == PASS else FAIL
        self.update_results('tags', tag, to_factory=True)
        
        total_proc_time = time.time()-start_time
        
        self.logger.info(f'found objects: {objects}')
        self.logger.info(f'total proc time: {total_proc_time:.4f}s\n')
        
        return self.results



if __name__ == '__main__':
    import shutil
    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    static_manifest_file = '/app/models/static/examples/object_detection/bbox_and_segmentation/yolo/manifest.json'
    image_dir = './data'
    output_dir = './outputs/bbox_and_seg/yolo'
    fmts = ['jpg', 'png']
    
    logging.basicConfig()
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    
    # delete contents in the output dir
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir, exist_ok=True)
    
    # load the pipeline definition
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    # create manifest for static models
    manifest = pipeline_utils.get_models_from_static_manifest(static_manifest_file)
    kwargs['models'] = manifest
    
    pipeline = ModelPipeline(**kwargs)
    
    logger.info('start loading the pipeline...')
    pipeline.load(manifest, kwargs)
    pipeline.warm_up(kwargs)

    image_path_batches = []
    for fmt in fmts:
        image_path_batches += pipeline_utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt=fmt)
        
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
    