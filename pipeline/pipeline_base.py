import cv2
import time
import collections
import functools
import sys
import logging
from abc import ABCMeta, abstractmethod

# add path to LMI AIS modules
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/lmi_utils')

import gadget_utils.pipeline_utils as pipeline_utils


# decorator to track exceptions
def track_exception(logger=logging.getLogger(__name__)):
    def deco(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception:
                logger.exception(f'failed to run funtion: {func.__name__}')
                return None
        return wrapper
    return deco



class PipelineBase(metaclass=ABCMeta):
    
    logger = logging.getLogger(__name__)
    
    def __init__(self):
        """
        init the pipeline.
        it has the following attributes:
            models: a dictionary of model instances, e.g., {model_name: model_instance}
            configs: a dictionary of the initial configs to load models, e.g., {model_path: '/path/to/model'}
            results: a dictionary of the results, e.g., {'outputs':{}, 'automation_keys':[], 'factory_keys':[], 'tags':[], 'should_archive':True, 'decision':None}
        """
        self.models = collections.OrderedDict()
        self.configs = {}
        self.results = self.init_results()
        
        
    def init_results(self):
        """
        init the output results
        """
        results = {
            "outputs": {
                "annotated": None
            },
            "automation_keys": [],
            "factory_keys": [],
            "tags": [],
            "should_archive": True,
            "decision": None,
            "errors": [],
        }
        return results
    
    
    @abstractmethod
    def warm_up(self):
        """
        warmup the pipeline
        """
        pass
    
    
    @abstractmethod
    def load(self):
        """
        load models into self.models
        """
        pass
    
    
    @abstractmethod
    def predict(self, configs: dict, inputs, **kwargs) -> dict:
        """the main function to run the pipeline. It should update self.results and return it.

        Args:
            configs (dict): runtime configs
            inputs (dict): the input data

        Returns:
            dict: should return self.results
        """
        pass
    
    
    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destroyed first
        """
        L = list(reversed(self.models.keys())) if self.models else []
        for model_name in L:
            del self.models[model_name]
            self.logger.info(f'{model_name} is cleaned up')

        del self.models
        self.models = None
        self.logger.info('pipeline is cleaned up')
        
        
    def update_results(self, result_key:str, value, sub_key=None):
        """ 
        modify the self.results with the following rules:
        1: If the result_key is not in the self.results, create the key-value pair.
        2: If the self.results[result_key] is a list, append the value to the list.
        3: If the self.results[result_key] is a dictionary and sub_key is not None, update the value of the sub_key.
        4: Otherwise, update the value of the result_key.

        Args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
        """
        if result_key not in self.results:
            if sub_key is not None:
                self.results[result_key] = {sub_key:value}
            else:
                self.results[result_key] = value
        elif isinstance(self.results[result_key], list):
            self.results[result_key].append(value)
        elif isinstance(self.results[result_key], dict) and sub_key is not None:
            self.results[result_key][sub_key] = value
        else:
            self.results[result_key] = value
            
            
    def add_to_factory(self, result_key:str):
        """add result_key to the GoFactory

        Args:
            result_key (str): the key to be added to the factory_keys list
        """
        if result_key not in self.results['factory_keys']:
            self.results['factory_keys'].append(result_key)
            
            
    def add_to_automation(self, result_key:str):
        """add result_key to the Automation service

        Args:
            result_key (str): the key to be added to the automation_keys list
        """
        if result_key not in self.results['automation_keys']:
            self.results['automation_keys'].append(result_key)
            
            
    def update_factory(self, result_key:str, value, sub_key=None):
        """
        update key-value pair to the self.results and also upload the key to GoFactory.
        
        args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
        
        """
        self.update_results(result_key, value, sub_key)
        self.add_to_factory(result_key)
        
        
    def update_automation(self, result_key:str, value, sub_key=None):
        """
        update key-value pair to the self.results and also upload the key to Automation service
        
        args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
        """
        self.update_results(result_key, value, sub_key)
        self.add_to_automation(result_key)
    
    
    @staticmethod
    def yolov8_obj_predict(model, image, configs, operators=[], iou=0.4):
        """run yolov8 object detector inference. It converts the results to the original coordinates space if the operators are provided.
        
        Args:
            model (Yolov8): the object detection model loaded memory
            image (np.ndarry): the input image
            configs (dict): a dictionary of the confidence thresholds for each class, e.g., {'classA':0.5, 'classB':0.6}
            operators (list): a list of dictionaries of the image preprocess operators, such as {'resize':[resized_w, resized_h, orig_w, orig_h]}, {'pad':[pad_left, pad_right, pad_top, pad_bot]}
            iou (float): the iou threshold for non-maximum suppression. defaults to 0.4

        Returns:
            list of [results, time info]
            results (dict): a dictionary of the results, e.g., {'boxes':[], 'classes':[], 'scores':[], 'masks':[], 'segments':[]}
            time_info (dict): a dictionary of the time info, e.g., {'preproc':0.1, 'proc':0.2, 'postproc':0.3}
        """
        time_info = {}
        
        # preprocess
        t0 = time.time()
        im = model.preprocess(image)
        time_info['preproc'] = time.time()-t0
        
        # infer
        t0 = time.time()
        pred = model.forward(im)
        time_info['proc'] = time.time()-t0
        
        # postprocess
        t0 = time.time()
        conf_thres = {}
        for k in configs:
            conf_thres[k] = configs[k]
        results = model.postprocess(pred,im,image,conf_thres,iou=iou)
        
        # return empty results if no detection
        results_dict = collections.defaultdict(list)
        if not len(results['boxes']):
            time_info['postproc'] = time.time()-t0
            return results_dict, time_info
        
        # only one image, get first batch
        boxes = results['boxes'][0]
        scores = results['scores'][0].tolist()
        classes = results['classes'][0].tolist()

        # deal with segmentation results
        if len(results['masks']):
            masks = results['masks'][0]
            segs = results['segments'][0]
            # convert mask to sensor space
            result_contours = [pipeline_utils.revert_to_origin(seg, operators) for seg in segs]
            masks = pipeline_utils.revert_masks_to_origin(masks, operators)
            results_dict['segments'] = result_contours
            results_dict['masks'] = masks
        
        # convert box to sensor space
        boxes = pipeline_utils.revert_to_origin(boxes, operators)
        results_dict['boxes'] = boxes
        results_dict['scores'] = scores
        results_dict['classes'] = classes
            
        time_info['postproc'] = time.time()-t0
        return results_dict, time_info
    
    
    @staticmethod
    def yolov8_cls_predict(model, image):
        """run yolov8 classifier inference

        Args:
            model (Yolov8_cls): the classifier model loaded memory
            image (np.ndarray): the input image

        Returns:
            list of [results, time info]
            results (dict): a dictionary of the results, e.g., {'classes':[], 'scores':[]}
            time_info (dict): a dictionary of the time info, e.g., {'preproc':0.1, 'proc':0.2, 'postproc':0.3}
        """
        time_info = {}
        
        # preprocess
        t0 = time.time()
        im = model.preprocess(image)
        time_info['preproc'] = time.time()-t0
        
        # infer
        t0 = time.time()
        pred = model.forward(im)
        time_info['proc'] = time.time()-t0
        
        # postprocess
        t0 = time.time()
        results = model.postprocess(pred)
        time_info['postproc'] = time.time()-t0
        
        return results, time_info
    
    
    @staticmethod
    def annotate_image(results, image, colormap=None):
        """annotate the object dectector results on the image. If colormap is None, it will use the random colors.

        Args:
            results (dict): the results of the object detection, e.g., {'boxes':[], 'classes':[], 'scores':[], 'masks':[], 'segments':[]}
            image (np.ndarray): the input image
            colors (list, optional): a dictionary of colormaps, e.g., {'class-A':(0,0,255), 'class-B':(0,255,0)}. Defaults to None.

        Returns:
            np.ndarray: the annotated image
        """
        boxes = results['boxes']
        classes = results['classes']
        scores = results['scores']
        masks = results['masks']
        
        image2 = image.copy()
        if not len(boxes):
            return image2
        
        for i in range(len(boxes)):
            mask = masks[i] if len(masks) else None
            pipeline_utils.plot_one_box(
                boxes[i],
                image2,
                mask,
                label="{}: {:.2f}".format(
                    classes[i], scores[i]
                ),
                color=colormap[classes[i]] if colormap is not None else None,
            )
        return image2