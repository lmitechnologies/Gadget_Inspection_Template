import time
import os
import sys
import cv2
import logging
import torch

sys.path.append('/home/gadget/pipeline')
sys.path.append('/home/gadget/LMI_AI_Solutions/object_detectors')
sys.path.append('/home/gadget/LMI_AI_Solutions/lmi_utils')

from pipeline_base import PipelineBase as Base

# functions from LMI AI Solutions repo: https://github.com/lmitechnologies/LMI_AI_Solutions
import gadget_utils.pipeline_utils as pipeline_utils
from ultralytics_lmi.yolo.model import Yolo
from od_core.object_detector import ObjectDetector


PASS = 'PASS'
FAIL = 'FAIL'


class ModelPipeline(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        super().__init__()
        
    
    @Base.track_exception(logger)
    def load(self, configs):
        """load the models"""
        # self.logger.info(f'registry: {ObjectDetector._registry.keys()}')
        self.models['seg'] = ObjectDetector(configs['seg_model']['metadata'], configs['seg_model']['path'])
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        t1 = time.time()
        imgsz = configs['seg_model']['hw']
        self.models['seg'].warmup(imgsz)
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
        iou = configs['seg_model']['iou']
        hw = configs['seg_model']['hw']
        class_info = configs['seg_model']['classes']
        confs = {k:v['confidence'] for k,v in class_info.items()}   # confidence thresholds
        
        # run the object detection model
        processed_im, operators = self.preprocess(image, hw)
        results_dict, time_info = self.models['seg'].predict(processed_im, confs, operators, iou)
        
        # annotate the image using polygons
        annotated_image = self.models['seg'].annotate_image(results_dict, image)
        
        # grab the results
        masks = results_dict['masks']   # binary masks for instance segmentation
        segs = results_dict['segments'] # polygons according to the masks
        boxes = results_dict['boxes']   # bounding boxes
        scores = results_dict['scores'] # model confidence scores
        objects = results_dict['classes']   # class labels
        
        # upload labels to Label Studio for further manual labeling
        annots = {
            'image_width': image.shape[1],
            'image_height': image.shape[0],
            'boxes': [],
            'polygons': []
        }
        annot_obj = {
            'type': 'object',
            'format': 'json',
            'extension': '.label.json',
            'content': annots
        }
        for i,name in enumerate(objects):
            box = boxes[i].astype(int).tolist()
            seg = segs[i]
            score = scores[i].item()
            dt = {
                'object': name,
                'x': box[0],
                'y': box[1],
                'width': box[2]-box[0],
                'height': box[3]-box[1],
                'score': score,
            }
            annots['boxes'].append(dt)
            xs,ys = seg[:,0],seg[:,1]
            annots['polygons'].append({
                'object': name,
                'x': xs.tolist(),
                'y': ys.tolist(),
                'score': score,
            })
        self.update_results('outputs', annot_obj, sub_key='labels')
        
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
        
        if not self.check_return_types():
            raise Exception('invalid return types')
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
    
    pipeline.clean_up(kwargs)
    