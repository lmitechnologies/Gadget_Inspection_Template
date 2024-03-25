import cv2
import time
import collections
import numpy as np
import sys
import logging
import os
from abc import ABCMeta, abstractmethod

# add path to LMI AIS modules
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/object_detectors')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/classifiers')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/lmi_utils')

from yolov8_lmi.model import Yolov8
from yolov8_cls.model import Yolov8_cls
import gadget_utils.pipeline_utils as pipeline_utils



class Pipeline_Base(metaclass=ABCMeta):
    
    logger = logging.getLogger()
    
    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs.
        it has the following attributes:
            models: a dictionary of model instances, e.g., {model_name: model_instance}
            configs: a dictionary of the initial configs to load models, e.g., {model_path: '/path/to/model'}
            results: a dictionary of the results, e.g., {'outputs':{}, 'automation_keys':[], 'factory_keys':[], 'tags':[], 'should_archive':True, 'decision':None}
        """
        self.models = collections.OrderedDict()
        self.configs = {}
        
        self.results = {
            "outputs": {
                "annotated": None
            },
            "automation_keys": ["decision"],
            "factory_keys": [],
            "tags": None,
            "should_archive": True,
            "decision": None
        }
        
        
    def update_results(self, result_key, value, dict_key=None):
        """ 
        modify the self.results dictionary with the following rules:
        1: If the self.results[result_key] is a list, append the value to the list.
        2: If the self.results[result_key] is a dictionary and dict_key is not None, update the value of the dict_key.
        3: Otherwise, update the value of the result_key.

        Args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            dict_key (str, optional): the key of subdictionary to be updated. Defaults to None.
        """
        if isinstance(self.results[result_key], list):
            self.results[result_key].append(value)
        elif isinstance(self.results[result_key], dict) and dict_key is not None:
            self.results[result_key][dict_key] = value
        else:
            self.results[result_key] = value
            
        
    @abstractmethod
    def warmup(self):
        """
        warmup the pipeline
        """
        pass
    
    
    @abstractmethod
    def load(self):
        """
        load models
        """
        pass
    
    
    @abstractmethod
    def predict(self, configs: dict, inputs, **kwargs) -> dict:
        pass
    
    
    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destroyed first
        """
        L = list(reversed(self.models.keys())) if self.models else []
        self.logger.info('cleanning up pipeline...')
        for model_name in L:
            del self.models[model_name]
            self.logger.info(f'{model_name} is cleaned up')

        #del the pipeline
        del self.models
        self.models = None
        self.logger.info('pipeline is cleaned up')
    
    
    @staticmethod
    def yolov8_predict(model, image, operators, configs, iou):
        """run yolov8 object detector inference. It converts the results to the original coordinates space if the operators are provided.
        
        Args:
            model (Yolov8): the object detection model loaded memory
            image (np.ndarry): the input image
            operators (list): a list of dictionaries of the image preprocess operators, such as {'resize':[resized_w, resized_h, orig_w, orig_h]}, {'pad':[pad_left, pad_right, pad_top, pad_bot]}
            configs (dict): a dictionary of the confidence thresholds for each class, e.g., {'classA':0.5, 'classB':0.6}
            iou (float): the iou threshold for non-maximum suppression

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
    