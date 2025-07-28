import time
import os
import sys
import cv2
import logging
import torch

sys.path.append('/home/gadget/pipeline')
sys.path.append('/home/gadget/LMI_AI_Solutions/classifiers')

from pipeline_base import PipelineBase as Base

# functions from the LMI AI Solutions repo: https://github.com/lmitechnologies/LMI_AI_Solutions
from yolov8_cls.model import Yolov8_cls
import gadget_utils.pipeline_utils as pipeline_utils


PASS = 'PASS'
FAIL = 'FAIL'
FAILED_CLASS = 'class1' # the class that indicates a failure


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
            configs (dict): runtime configs
        """
        self.models['cls'] = Yolov8_cls(configs['cls_model']['path'])
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """warm up the model for the first time

        Args:
            configs (dict): runtime configs
        """
        t1 = time.time()
        imgsz = configs['cls_model']['hw']
        self.models['cls'].warmup(imgsz)
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
        
        
    def preprocess(self, image, hw):
        """preprocess the image for object detection

        Args:
            image (numpy): a numpy array of image
            hw (list): a list of [height, width]

        Returns:
            img (numpy): a resized image
        """
        th,tw = hw
        img = cv2.resize(image, (tw,th))
        return img
    
    
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
        hw = configs['cls_model']['hw']
        
        # run the object detection model
        processed_im = self.preprocess(image, hw)
        results_dict, time_info = self.models['cls'].predict(processed_im)
        
        # upload decision to the Gadget automation service
        object_cls = results_dict['classes'][0]
        score = results_dict['scores'][0]
        decision = FAIL if object_cls == FAILED_CLASS else PASS
        self.update_results('decision', decision, to_automation=True)
        
        # add text to image
        annotated_image = image.copy()
        cv2.putText(annotated_image, f'{object_cls}: {score:.2f}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        # add the annotated image to the results
        self.update_results('outputs',annotated_image, sub_key='annotated')
        
        # upload tags to GoFactory
        tag = PASS if decision == PASS else FAIL
        self.update_results('tags', tag, to_factory=True)
        
        total_proc_time = time.time()-start_time
        
        self.logger.info(f'found class: {object_cls} with confidence: {score}')
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
    