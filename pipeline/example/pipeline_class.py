import time
import os
import sys
import cv2
import logging
import torch

sys.path.append('/home/gadget/pipeline')
sys.path.append('/home/gadget/LMI_AI_Solutions/object_detectors')
sys.path.append('/home/gadget/LMI_AI_Solutions/classifiers')
sys.path.append('/home/gadget/LMI_AI_Solutions/lmi_utils')

from pipeline_base import PipelineBase as Base
from yolov8_lmi.model import Yolov8
import gadget_utils.pipeline_utils as pipeline_utils


PASS = 'PASS'
FAIL = 'FAIL'


class pipeline_test1(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        super().__init__()
        # frame index
        self.index = 0
        
    
    @Base.track_exception(logger)
    def load(self, configs):
        self.models['od'] = Yolov8(configs['middle_model']['path'])
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        t1 = time.time()
        imgsz = configs['middle_model']['hw']
        self.models['od'].warmup(imgsz)
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
        
        
    def od_preprocess(self, image, hw):
        h0,w0 = image.shape[:2]
        th,tw = hw
        img = cv2.resize(image, (tw,th))
        operators = [{'resize':[tw,th,w0,h0]}]
        return img, operators
    
    
    @torch.no_grad()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs, **kwargs) -> dict:
        start_time = time.time()
        # init a result dict
        self.init_results()
        self.index += 1
        
        image = inputs['image']['pixels']
        
        if not self.models:
            raise Exception('failed to load pipeline model(s)')
        
        # load runtime config
        iou = configs['middle_model']['iou']
        hw = configs['middle_model']['hw']
        class_info = configs['middle_model']['classes']
        confs = {k:v['confidence'] for k,v in class_info.items()}
        colormap = {k:v['rgb'] for k,v in class_info.items()}
        
        # stage 1: detection the foreground
        img_middle, operators_middle = self.od_preprocess(image, hw)
        results_dict1, time_info1 = self.models['od'].predict(img_middle, confs, operators_middle, iou)
        
        # annotate the image
        annotated_image = self.models['od'].annotate_image(results_dict1, image, colormap)
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # upload decision to automation
        objects = results_dict1['classes']
        decision = PASS if len(objects) == 0 else FAIL
        self.update_results('decision', decision, to_automation=True)
        
        # update factory tags
        tag = PASS if decision == PASS else FAIL
        self.update_results('tags', tag, to_factory=True)
        
        total_proc_time = time.time()-start_time
        
        self.logger.info(f'found objects: {objects}')
        self.logger.info(f'total proc time: {total_proc_time:.4f}s\n')
        
        return self.results



if __name__ == '__main__':
    logging.basicConfig()
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    image_dir = './data'
    output_dir = './outputs'
    fmt = 'png'
    
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    pipeline = pipeline_test1(**kwargs)
    
    logger.info('start loading the pipeline...')
    pipeline.load(kwargs)
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
            
            annotated_image = results['outputs']['annotated']
            tmp = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(os.path.join(output_dir, fname.replace(f'.{fmt}',f'_annotated.{fmt}')), tmp)
    
    pipeline.clean_up(None)
    