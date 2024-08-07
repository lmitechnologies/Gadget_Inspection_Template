import time
import os
import sys
import cv2
import logging
import torch

sys.path.append('/home/gadget/workspace/pipeline')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/object_detectors')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/classifiers')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/lmi_utils')

from pipeline_base import PipelineBase as Base
from yolov8_lmi.model import Yolov8
import gadget_utils.pipeline_utils as pipeline_utils



class pipeline_test1(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        super().__init__()
        
        self.configs['middle_model'] =  os.path.realpath(os.path.expandvars(kwargs.get('middle_model',"")))
        self.configs['middle_hw'] = kwargs.get('middle_hw', [256, 256])
        
        self.colormap = {'left':(0,0,255), 'right':(255,0,0)}
    
    
    @Base.track_exception(logger)
    def warm_up(self):
        t1 = time.time()
        for name in self.models:
            imgsz = self.configs[f'{name}_hw']
            self.models[name].warmup(imgsz)
            self.logger.info(f'warming up {name} on the input size of {imgsz}')
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
    
    
    @Base.track_exception(logger)
    def load(self):
        self.models['middle'] = Yolov8(self.configs['middle_model'])
        self.logger.info('models are loaded')
        
        
    def preprocess_middle(self, image):
        h0,w0 = image.shape[:2]
        th,tw = self.configs['middle_hw']
        img = cv2.resize(image, (tw,th))
        operators = [{'resize':[tw,th,w0,h0]}]
        return img, operators
    
    
    @torch.no_grad()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs, **kwargs) -> dict:
        start_time = time.time()
        self.init_results()
        
        image = inputs['image']['pixels']
        
        if not self.models:
            self.logger.exception('failed to load pipeline model(s)')
            return self.results
        
        # load runtime config
        test_mode = configs.get('test_mode', False)
        middle_configs = configs['middle_configs']
        iou = middle_configs['model_configs']['iou']
        confs = {k:v['confidence'] for k,v in middle_configs['object_configs'].items()}
        
        # stage 1: detection the foreground
        img_middle, operators_middle = self.preprocess_middle(image)
        results_dict1, time_info1 = self.models['middle'].predict(img_middle, confs, operators_middle, iou)
        
        # annotate the image
        annotated_image = self.models['middle'].annotate_image(results_dict1, image, self.colormap)
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # local tests
        if test_mode:
            outpath = kwargs['output_path']
            fname = kwargs['fname']
            tmp = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(os.path.join(outpath, fname.replace('.png','_annotated.png')), tmp)
        
        total_proc_time = time.time()-start_time
        
        # upload results to the factory
        objects = results_dict1['classes']
        self.update_results('objects', objects, to_factory=True)
        self.update_results('total_proc_time', total_proc_time, to_factory=True)
        
        # upload results to automation
        decision = 0 if len(objects) == 0 else 1
        self.update_results('decision', decision, to_automation=True)
        
        # update factory tags
        tag = 'no_objects' if decision == 0 else 'objects_found'
        self.update_results('tags', tag, to_factory=True)
        
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
    
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    pipeline = pipeline_test1(**kwargs)
    
    logger.info('start loading the pipeline...')
    pipeline.load()
    pipeline.warm_up()

    image_path_batches = pipeline_utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt='png')
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
            configs = {'test_mode':True, 'output_path':output_dir, 'fname':fname}
            configs.update(kwargs)
            results = pipeline.predict(configs, inputs, output_path=output_dir,fname=fname)
    
    pipeline.clean_up()