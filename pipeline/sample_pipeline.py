"""
Description:
pipeline class

Requirements:
this pipeline class, needs to have the following methods:
    load
    clean_up
    warm_up
    predict
"""

import os
import time
import shutil
import collections
import numpy as np
import cv2
import logging
import sys

#own modules
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/object_detectors')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/lmi_utils')

from yolov5.trt.yolov5_trt import YoLov5TRT
import gadget_utils.pipeline_utils as pipeline_utils


PAD_W,PAD_H = 1280,1984
RESIZE_RATE = 0.5
TARGET_CLASSES = ['rivet']


class ModelPipeline:

    logger = logging.getLogger('Pipeline')
    logger.setLevel(logging.DEBUG)

    def __init__(self, **kwargs):
        """
        class_map: the class id -> class name
        """
        np.random.seed(777)
        COLORMAP=[(0,255,0)] #BGR
        self.det_configs = {}
        self.det_configs['engine_path'] = os.path.realpath(os.path.expandvars(kwargs.get('det_engine_file',"")))
        self.det_configs['id_to_cls'] = pipeline_utils.convert_key_to_int(kwargs.get('det_class_map', {}))
        self.det_configs['cls_to_id'] = pipeline_utils.val_to_key(self.det_configs['id_to_cls'])
        
        self.det_configs['conf_thres'] = {
            c: kwargs.get(f'confidence_{c}',0.5) for c in TARGET_CLASSES
        }
        
        self.det_configs['color_map'] = {
            c:COLORMAP[i] if COLORMAP and i<len(COLORMAP) else np.random.randint(0,255,size=3).tolist() 
            for i,c in enumerate(TARGET_CLASSES)
        }

        #map model name -> model instance
        self.models = collections.OrderedDict()
        self.frame_index = 0


    def load(self):
        """
        create model instances with engine files
        if loading files fail, then don't create model instances
        """

        try:
            self.models['det'] = YoLov5TRT(self.det_configs['engine_path'])
            self.logger.info('models are loaded')
        except Exception:
            self.logger.exception('models are failed to load')
            self.models = None

        
    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destoried first
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


    def warm_up(self):
        """
        warm up all the models in the pipeline
        """
        if not self.models:
            return
        for model_name in self.models:
            imgsz = [1,3,self.models[model_name].input_h, self.models[model_name].input_w]
            self.models[model_name].warmup(imgsz)
            self.logger.info(f'warming up {model_name} on the input size of {imgsz}')
            
            
    def internal_preprocess(self, input_image):
        operators_det = {}
        I2,pad_l,pad_r,pad_t,pad_b = pipeline_utils.fit_array_to_size(input_image, PAD_W, PAD_H)
        img_det = cv2.resize(I2, None, fx=RESIZE_RATE, fy=RESIZE_RATE)
        th,tw = img_det.shape[:2]
        operators_det = [{'pad':[pad_l,pad_r,pad_t,pad_b]},{'resize':[tw,th,PAD_W,PAD_H]}]
        return img_det,operators_det
            
            
    def det_predict(self, image, operators, configs, annotated_image=None):
        time_info = {}
        
        # preprocess
        t0 = time.time()
        im,im0 = self.models['det'].preprocess(image)
        time_info['preproc'] = time.time()-t0
        
        # infer
        t0 = time.time()
        pred = self.models['det'].forward(im)
        time_info['proc'] = time.time()-t0
        
        # postprocess
        t0 = time.time()
        conf_thres = {}
        for k in configs:
            if k not in self.det_configs['cls_to_id']:
                continue
            if k in TARGET_CLASSES:
                conf_thres[self.det_configs['cls_to_id'][k]] = configs[k]
            else:
                # disable detection on non-target classes
                conf_thres[self.det_configs['cls_to_id'][k]] = 1.1
        self.logger.debug(f'[DET] configs: {configs}')
        self.logger.debug(f'[DET] conf_thres: {conf_thres}')
        result_dets = self.models['det'].postprocess(pred,im0,conf_thres)
        
        # only one image, get first batch
        result_dets = result_dets[0].cpu().numpy()
        scores = result_dets[:,4]
        classes = [self.det_configs['id_to_cls'][i] for i in result_dets[:,5]]
        
        # convert coordinates to sensor space
        boxes = pipeline_utils.revert_to_origin(result_dets[:,:4], operators)
        
        # get the center and diameter
        boxes = np.array(boxes)     #[x1,y1,x2,y2]
        centers = 0.5*(boxes[:,:2]+boxes[:,2:])
        hws = centers-boxes[:,:2]   #[xc-x1,yc-y1]
        diameters = np.mean(hws,axis=1)
        
        # annotation
        if annotated_image is not None:
            for j,box in enumerate(boxes):
                pipeline_utils.plot_one_box(
                    box,
                    annotated_image,
                    label="{}: {:.2f}".format(
                        classes[j], scores[j]
                    ),
                    color=self.det_configs['color_map'][classes[j]],
                )
        
        results_dict = {
            'boxes': boxes.tolist(),
            'classes': classes,
            'scores': scores.tolist(),
            'centers': centers.tolist(),
            'diameters': diameters.tolist(),
        }
        time_info['postproc'] = time.time()-t0
        return results_dict, time_info


    def predict(self, configs: dict, image: np.ndarray, **kwargs) -> dict:
        errors = []
        result_dict = {
                'anotated_output': None,
                'automation_keys': [],
                'factory_keys': [],
                'should_archive': False,
                'errors': errors,
                'total_proc_time': 0,
            }
        
        if not self.models:
            errors.append('failed to load pipeline model(s)')
            self.logger.exception('failed to load pipeline model(s)')
            return result_dict
        
        # preprocess
        t0 = time.time()
        img_det,operators_det = self.internal_preprocess(image)
        preproc_time = time.time()-t0
        
        # load runtime config
        test_mode = configs.get('test_mode', False)
        conf_thres = {
            c:configs.get(f'confidence_{c}', self.det_configs['conf_thres'][c]) for c in TARGET_CLASSES 
        }
        
        annotated_image = None
        if test_mode:
            annotated_image = image.copy()
        
        try:
            results_dict1, time_info1 = self.det_predict(img_det, operators_det, conf_thres, annotated_image)
        except Exception as e:
            self.logger.exception('failed to run detection model')
            errors.append(str(e))
            return result_dict
            
        if test_mode:
            outpath = kwargs.get('results_storage_path','./outputs')
            annotated_image_path = os.path.join(outpath, 'annotated_'+str(self.frame_index).zfill(4))+'.png'
            annot_bgr = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(annotated_image_path, annot_bgr)
            
        # gather time info
        preprocess_time = time_info1['preproc'] + preproc_time
        inference_time = time_info1['proc']
        postprocess_time = time_info1['postproc']
        total_time = preprocess_time+inference_time+postprocess_time
        
        obj_list = results_dict1['classes']
        # if not len(obj_list):
        #     result_dict['should_archive'] = True
        result_dict['automation_keys'] = ['det_centers','det_diameters']
        result_dict['factory_keys'] = ['det_boxes','det_scores','det_classes','total_proc_time']
        result_dict['det_boxes'] = results_dict1['boxes']
        result_dict['det_scores'] = results_dict1['scores']
        result_dict['det_classes'] = results_dict1['classes']
        result_dict['det_centers'] = results_dict1['centers']
        result_dict['det_diameters'] = results_dict1['diameters']
        result_dict['errors'] = errors
        
        self.logger.info(f'found objects: {obj_list}')
        self.logger.info(f'preprocess:{preprocess_time:.4f}, inference:{inference_time:.4f}, ' +
            f'postprocess:{postprocess_time:.4f}, total:{total_time:.4f}\n')
        self.frame_index += 1
        
        return result_dict
        

if __name__ == '__main__':
    logger = logging.getLogger()
    logging.basicConfig()
    logger.setLevel(logging.DEBUG)

    BATCH_SIZE = 1
    os.environ['PIPELINE_SERVER_SETTINGS_MODELS_ROOT'] = './pipeline/models'
    pipeline_def_file = './pipeline/pipeline_def.json'
    image_dir = './data/test_images'
    output_dir = './data/outputs'
    im_fmt = 'png'
    
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    pipeline = ModelPipeline(**kwargs)
    
    logger.info('start loading the pipeline...')
    pipeline.load()
    pipeline.warm_up()

    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)

    image_path_batches = pipeline_utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt=im_fmt)
    for batch in image_path_batches:
        for image_path in batch:
            if im_fmt=='png':
                im_bgr = cv2.imread(image_path)
                im = cv2.cvtColor(im_bgr, cv2.COLOR_BGR2RGB)
            elif im_fmt=='npy':
                im = np.load(image_path)
            pipeline.predict(image=im, configs={'test_mode':True}, results_storage_path=output_dir)

    pipeline.clean_up()