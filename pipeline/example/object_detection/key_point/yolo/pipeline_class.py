import time
import os
import cv2
import logging
import torch

from lmi_utils.pipeline_base import PipelineBase as Base
import lmi_utils.gadget_utils.pipeline_utils as pipeline_utils


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
    def load(self, models, configs):
        """load the model(s)

            Args:
                models (dict): model roles
                configs (dict): runtime configs
        """
        self.load_models(models, configs, '_model')
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """warm up the model for the first time

            Args:
                models (dict): model roles
                configs (dict): runtime configs
        """
        t1 = time.time()
        self.models['pose_model'].warmup()
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
    
    
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
        model_configs = configs['models']['pose_model']['configs']
        confs = model_configs['confidence']
                
        # run the object detection model
        processed_im, ops = self.preprocess('pose_model', image)
        results_kp, time_info = self.models['pose_model'].predict(processed_im, confs)
        reverted = self.revert_preprocess(results_kp, ops)
        
        # remove batch dim
        dt = {k:v[0] for k,v in reverted.items()}

        # annotate the image using key points
        annotated_image = self.models['pose_model'].annotate_image(dt, image)
        
        # upload annotated image to GadgetAPP and GoFactory
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # obtain the results
        pts = dt['points'].astype(int)
        boxes = dt['boxes'].astype(int)
        objects = dt['classes']
        scores = dt['scores']
        
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
    import shutil
    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    static_manifest_file = '/app/models/static/examples/object_detection/key_point/yolo/manifest.json'
    image_dir = './data'
    output_dir = './outputs/key_point'
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
    