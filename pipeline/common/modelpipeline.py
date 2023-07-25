import time
import sys, os
import logging
import collections
import numpy as np
import cv2

from anomalib.anomaly_model import AnomalyModel
from yolov5_trt import YoLov5TRT
from image_utils.img_resize import resize
from image_utils.split_vstack_image import split_vstack_image, split_hstack_image
from gadget_utils.pipeline_utils import revert_to_origin
from common.utils import plot_one_box, Decision, render_profile


FAIL = 'FAIL'

class ModelPipeline:

    logger = logging.getLogger(__name__)
    
    def __init__(self,**kwargs):
        self.kwargs = kwargs
        self.index = 0
        self.models = collections.OrderedDict()

    def __getattr__(self, name):
        if name == 'gpu_mem_limit':
            return self.kwargs.get('gpu_mem_limit', 2048)
        if name == 'od_class_map':
            return {int(k):v for k,v in self.kwargs.get('od_class_map').items()}
        if name == 'COLOR_MAP':
            return {k:[int(c) for c in v.split(',')] for k,v in self.kwargs.get('COLOR_MAP').items()}
        if name in self.kwargs:
            return self.kwargs.get(name)
        return None
        
    def get_runtime_config(self, configs, name, default=None):
        if name in configs:
            return configs[name]
        res = getattr(self, name)
        return res or default
    
    def get_od_confidence_map(self, configs):
        return {k:self.get_runtime_config(configs, f"od_confidence_{v}") for k,v in self.od_class_map.items()}

    def load(self):
        try:
            self.logger.info(f'loading ad engine from {self.ad_engine_file}')
            t0 = time.time()
            self.models['adet']=AnomalyModel(self.ad_engine_file)
            self.logger.info(f'ad engine load time: {time.time()-t0} seconds')
        except Exception as e:
            self.logger.error(f'ad model load failed - {e}')

        try:
            self.logger.info(f"loading od model {self.od_engine_file}...")
            t0 = time.time()
            self.models['odet'] = YoLov5TRT(self.od_engine_file)
            self.logger.info(f'od model load time: {time.time()-t0} seconds')
        except Exception as e:
            self.logger.error(f'od model load failed - {e}')
        
    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destroyed first
        """
        models = list(reversed(self.models.keys())) if self.models else []
        self.logger.info('cleanning up pipeline...')
        for model_name in models:
            del self.models[model_name]
            self.logger.info(f'{model_name} is cleaned up')
        del self.models
        self.models = None
        self.logger.info('pipeline is cleaned up')

    def warm_up(self):
        try:
            self.models['adet'].warmup()
        except Exception as ex:
            self.logger.exception(ex)

        try:
            self.logger.info("Object detector warm_up started.")
            t0 = time.time()
            self.models['odet'].warmup(imgsz=(1,3,self.OD_H,self.OD_W))
            self.logger.info(f'Object detector warm_up ended -> {time.time()-t0}')
        except Exception as ex:
            self.logger.exception(ex)

    def od_preprocess(self, image: np.ndarray, profile: np.ndarray):
        image = cv2.cvtColor(image, cv2.COLOR_GRAY2RGB)
        return resize(image, width=self.OD_W, height=self.OD_H, inter = cv2.INTER_CUBIC, device='cpu')      

    def od_predict(self,image,profile,confience_map,class_map,iou_thres):
        input_image = self.od_preprocess(image, profile)
        im,_ = self.models['odet'].preprocess(input_image)
        pred = self.models['odet'].forward(im)
        dets = self.models['odet'].postprocess(pred,input_image,confience_map,iou_thres=iou_thres)
        od_decision, post_res = self.od_postprocess(dets, class_map)
        post_res['boxes'] = [revert_to_origin([(box[0],box[1]),(box[2],box[3])], [{'resize':[self.OD_W,self.OD_H,image.shape[1],image.shape[0]]}]) 
                             for box in post_res['boxes']]
        return od_decision, post_res

    def od_decision(self, result_dict):
        return Decision.DEFECT if result_dict['defects'] else Decision.NONE

    def od_postprocess(self, dets, class_map):
        result_dict = {'defects': [], 'scores': [], 'boxes': []}

        for _,det in enumerate(dets):
            for *xyxy, conf, cls in reversed(det):
                defect_name = class_map[int(cls)]
                box = [int(x) for x in xyxy]
                result_dict['defects'].append(defect_name)
                result_dict['scores'].append(conf.item())
                result_dict['boxes'].append(box)
        return self.od_decision(result_dict), result_dict

    def pp_preprocess(self, image, profile):
        return image, profile
    
    def pp_postprocess(self, annot, test_mode=False):
        return annot if test_mode else resize(annot, self.GADGETAPP_W, device='cpu')

    def predict(self, configs: dict, image: np.ndarray, **kwargs) -> dict:
        t0 = time.time()
        test_mode = self.get_runtime_config(configs, 'test_mode', False)

        profile = kwargs.get('profile', None)
        profile = render_profile(profile)
        image, profile = self.pp_preprocess(image, profile)

        result = {
                'automation_keys': ['decision'],
                'should_archive': False,
                'factory_keys': ['tags','decision'],
                'decision': str(Decision.NONE),
                'errors': [],
            }
        
        self.index += 1
        decision = Decision.NONE

        try:
            t0 = time.time()
            ad_input = self.ad_preprocess(image)
            ad_decision, annot, ad_result = self.models['adet'].predict(cv2.cvtColor(ad_input, cv2.COLOR_GRAY2RGB),
                                                        err_thresh=self.get_runtime_config(configs, 'ad_error_threshold'),
                                                        err_size=self.get_runtime_config(configs, 'ad_error_size'))
            ad_decision = Decision.ANOMALY if ad_decision==FAIL else Decision.NONE
            annot = self.ad_postprocess(annot, ad_result)
            ad_inference_time=time.time() - t0
        except Exception as e:
            self.logger.exception(e)
            result['errors'].append(str(e))
            return result
        
        result.update(ad_result)
        decision |= ad_decision

        try:
            t0=time.time()
            od_decision, od_result = self.od_predict(image, profile,
                                                     self.get_od_confidence_map(configs),
                                                     self.od_class_map,
                                                     iou_thres=self.get_runtime_config(configs, 'iou_thres'))
            for i in range(len(od_result['defects'])):
                name, score, box = od_result['defects'][i], od_result['scores'][i], od_result['boxes'][i]
                plot_one_box(box,annot,label=f'{name}: {score:.2f}', color=self.COLOR_MAP[name], line_thickness=1)
            od_inference_time=time.time()-t0
        except Exception as e:
            self.logger.exception(e)
            result['errors'].append(str(e))
            return result
        
        result.update(od_result)
        decision |= od_decision

        result['annotated_output'] = self.pp_postprocess(annot, test_mode)
        
        time_dict = {
                'ad_inference_time': ad_inference_time,
                'od_inference_time': od_inference_time,
                'total_proc_time': time.time() - t0
                }
        result.update(time_dict)
        result['should_archive'] = True if decision==Decision.ANOMALY or self.index % 20 == 0 else False
        result['decision'] = str(decision)
        result['tags'] = [result['decision']]

        return result
    
    def ad_preprocess(self, image, profile=None):
        del profile # irrelevant here
        if self.SPLIT_NUM > 1:
            image = split_vstack_image(image, self.SPLIT_NUM)
        return image
    
    def ad_postprocess(self, annot, result):
        del result  # irrelevant here
        if self.SPLIT_NUM > 1:
            annot = split_hstack_image(annot, self.SPLIT_NUM)
        return annot
