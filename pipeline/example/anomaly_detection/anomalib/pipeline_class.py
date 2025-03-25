import time
import os
import sys
import cv2
import logging
import torch

sys.path.append('/home/gadget/pipeline')
sys.path.append('/home/gadget/LMI_AI_Solutions/lmi_utils')
sys.path.append('/home/gadget/LMI_AI_Solutions/anomaly_detectors')

from pipeline_base import PipelineBase as Base

# functions from the LMI AI Solutions repo: https://github.com/lmitechnologies/LMI_AI_Solutions
from anomalib_lmi.anomaly_model2 import AnomalyModel2
from ad_core.anomaly_detector import AnomalyDetector
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
    def load(self, configs):
        """load the model(s)

        Args:
            configs (dict): runtime configs
        """
        # self.logger.info(f'registry: {AnomalyDetector._registry.keys()}')
        self.models['ad'] = AnomalyDetector(configs['ad_model']['metadata'],configs['ad_model']['path'])
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """warm up the model for the first time

        Args:
            configs (dict): runtime configs
        """
        t1 = time.time()
        self.models['ad'].warmup()
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
    
    
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
        confs = configs['ad_model']['configs']
        err_threshold = confs['err_threshold']
        err_max = confs['err_max']
        err_size = confs['err_size']
        
        # run the object detection model
        err_map = self.models['ad'].predict(image)
        
        # annotate the image using err_map
        annotated_image = self.models['ad'].annotate(image, err_map, err_threshold, err_max)
        
        # upload annotated image to GadgetAPP and GoFactory
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # upload decision to the Gadget automation service
        cnt = err_map[err_map>err_threshold].sum()
        decision = PASS if cnt<err_size else FAIL
        self.update_results('decision', decision, to_automation=True)
        
        # upload tags to GoFactory
        tag = PASS if decision == PASS else FAIL
        self.update_results('tags', tag, to_factory=True)
        
        total_proc_time = time.time()-start_time
        self.logger.info(f'total proc time: {total_proc_time:.4f}s\n')
        
        if not self.check_return_types():
            raise Exception('invalid return types')
        return self.results



if __name__ == '__main__':
    # unit test
    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    image_dir = './data'
    output_dir = './outputs'
    fmt = 'png'
    
    logging.basicConfig()
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    
    # load the pipeline definition
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    
    # initialize the pipeline
    pipeline = ModelPipeline(**kwargs)
    
    # load and warmup the model
    pipeline.load(kwargs)
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
            
            # save the annotated image
            annotated_image = results['outputs']['annotated']
            bgr = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(os.path.join(output_dir, fname.replace(f'.{fmt}',f'_annotated.{fmt}')), bgr)
    
    pipeline.clean_up(kwargs)
    