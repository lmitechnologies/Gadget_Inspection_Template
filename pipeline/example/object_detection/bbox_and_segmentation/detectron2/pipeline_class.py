import time
import os
import sys
import cv2
import logging
import torch
import json

sys.path.append('/home/gadget/pipeline')
from pipeline_base import PipelineBase as Base

# functions from the LMI AI Solutions repo: https://github.com/lmitechnologies/LMI_AI_Solutions
# from detectron2_lmi.model import Detectron2Model
import gadget_utils.pipeline_utils as pipeline_utils


PASS = 'PASS'
FAIL = 'FAIL'


class ModelPipeline(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        """initialize the pipeline
        
        Args:
            kwargs: configs defined in the pipeline_def.json
        """
        super().__init__()
        
    
    @Base.track_exception(logger)
    def load(self, model_roles, configs):
        """load the model(s)

        Args:
            model_roles (dict): model roles
            configs (dict): runtime configs
        """
        self.class_map = {v['index']:k for k,v in configs['od_model']['object_configs'].items()}
        self.load_models(model_roles, configs, 'od_model', class_map=self.class_map)
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """warm up the model for the first time

        Args:
            configs (dict): runtime configs
        """
        t1 = time.time()
        self.models['od_model'].warmup()
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
        
        
    def preprocess(self, image, hw):
        """preprocess the image for object detection

        Args:
            image (numpy): a numpy array of image
            hw (list): a list of [height, width]

        Returns:
            img (numpy): a resized image
            operators (list): a list of operators for converting back to original image size
        """
        h0,w0 = image.shape[:2]
        th,tw = hw
        img = cv2.resize(image, (tw,th))
        operators = [{'resize':[tw,th,w0,h0]}]
        return img, operators
    
    
    @torch.inference_mode()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs:dict) -> dict:
        """predict the result based on the inputs

        Args:
            configs (dict): runtime configs
            inputs (dict): inputs

        Raises:
            Exception: failed to load pipeline model(s)

        Returns:
            dict: a result dictionary
        """
        start_time = time.time()
        # init a result dict
        self.init_results()
        
        image = inputs['image']['pixels']
        
        if not self.models:
            raise Exception('failed to load pipeline model(s)')
        
        # load runtime config
        confs = {k:v['confidence'] for k,v in configs['od_model']['object_configs'].items()} # confidence thresholds
        
        # run the object detection model
        hw = self.models['od_model'].image_size
        processed_im, operators = self.preprocess(image, hw)
        # the results are all in the original image space
        results_dict = self.models['od_model'].predict(processed_im, confs=confs, operators=operators, return_segments=True)
        
        # annotate the image using bounding boxes
        results_dict = {k:v[0] for k,v in results_dict.items()}
        annotated_image = self.models['od_model'].annotate_image(results_dict, image)
        
        # upload annotated image to GadgetAPP and GoFactory
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # grab the results
        objects = results_dict['classes']       # object names
        boxes = results_dict['boxes']           # bounding boxes
        scores = results_dict['scores']         # scores for the bounding boxes
        masks = results_dict['masks']           # binary masks for instance segmentation
        segments = results_dict['segments']     # polygons according to the masks
        
        # upload predictions to GoFactory
        h0,w0 = image.shape[:2]
        for i,name in enumerate(objects):
            box = boxes[i].astype(int)
            seg = segments[i].astype(int)
            score = scores[i]
            self.add_prediction('boxes', box, score, name, h0, w0)
            self.add_prediction('polygons', seg, score, name, h0, w0)
        self.logger.info(f'predictions length: {len(self.results["outputs"]["labels"]["content"]["predictions"])}')
        
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
    # unit test
    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    image_dir = './data'
    output_dir = './outputs'
    fmt = 'jpg'
    
    logging.basicConfig()
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    
    # load the pipeline definition
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    
    # initialize the pipeline
    pipeline = ModelPipeline(**kwargs)
    
    # load and warmup the model
    pipeline.load({},kwargs)
    pipeline.warm_up(kwargs)

    # load test images
    image_path_batches = pipeline_utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt=fmt)
    for batch in image_path_batches:
        for image_path in batch:
            # load a image
            fname = os.path.basename(image_path)
            logger.info(f'processing {fname}...')
            im_bgr = cv2.imread(image_path)
            im = cv2.cvtColor(im_bgr, cv2.COLOR_BGR2RGB)
            
            # convert to the input format
            inputs = {
                'image':{'pixels':im},
            }
            
            # run the pipeline
            results = pipeline.predict(kwargs, inputs)
            assert pipeline.check_return_types(), 'invalid return types'
            
            # save the annotated image
            annotated_image = results['outputs']['annotated']
            bgr = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(os.path.join(output_dir, fname.replace(f'.{fmt}',f'_annotated.{fmt}')), bgr)
    
    pipeline.clean_up()
    