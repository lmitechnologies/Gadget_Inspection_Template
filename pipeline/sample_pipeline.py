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

sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/object_detectors')
sys.path.append('/home/gadget/workspace/LMI_AI_Solutions/lmi_utils')

# modules from LMI_AI_Solutions repo
from yolov8_lmi.model import Yolov8
import gadget_utils.pipeline_utils as pipeline_utils


PAD_W,PAD_H = 1280,1984
RESIZE_RATE = 0.5
TARGET_CLASSES = ['rivet']


class ModelPipeline:

    logger = logging.getLogger('Pipeline')
    logger.setLevel(logging.DEBUG)

    def __init__(self, **kwargs):
        COLORMAP=[]
        self.det_configs = {}
        self.det_configs['model_path'] = os.path.realpath(os.path.expandvars(kwargs.get('model_path',"")))
        self.det_configs['H'] = kwargs.get('input_h', 640)
        self.det_configs['W'] = kwargs.get('input_w', 640)
        
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
            self.models['det'] = Yolov8(self.det_configs['model_path'])
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
            imgsz = [self.det_configs['H'], self.det_configs['W']]
            self.models[model_name].warmup(imgsz)
            self.logger.info(f'warming up {model_name} on the input size of {imgsz}')
            
            
    def internal_preprocess(self, input_image):
        operators_det = {}
        I2,pad_l,pad_r,pad_t,pad_b = pipeline_utils.fit_array_to_size(input_image, PAD_W, PAD_H)
        img_det = cv2.resize(I2, None, fx=RESIZE_RATE, fy=RESIZE_RATE)
        th,tw = img_det.shape[:2]
        operators_det = [{'pad':[pad_l,pad_r,pad_t,pad_b]},{'resize':[tw,th,PAD_W,PAD_H]}]
        return img_det,operators_det
            
            
    def det_predict(self, image, operators, configs):
        time_info = {}
        
        # preprocess
        t0 = time.time()
        processed_image = self.models['det'].preprocess(image)
        time_info['preproc'] = time.time()-t0
        
        # infer
        t0 = time.time()
        pred = self.models['det'].forward(processed_image)
        time_info['proc'] = time.time()-t0
        
        # postprocess
        t0 = time.time()
        conf_thres = {
            c:configs.get(f'confidence_{c}', 0.5) for c in TARGET_CLASSES # set to 0.5 if not specified
        }
        self.logger.debug(f'[DET] conf_thres: {conf_thres}')
        results = self.models['det'].postprocess(pred,processed_image,image,conf_thres)
        
        # found objects
        if len(results['boxes']):
            # batch of 1 image
            results = {k: v[0] for k,v in results.items()}
            # convert coordinates to sensor space
            results['boxes'] = pipeline_utils.revert_to_origin(results['boxes'], operators)
            results['classes'] = results['classes'].tolist()
            results['scores'] = results['scores'].tolist()
        time_info['postproc'] = time.time()-t0
        return results, time_info


    def predict(self, configs: dict, inputs: dict) -> dict:
        errors = []
        image = inputs['image']
        result_dict = {
                'annotated_output': image,
                'automation_keys': [],
                'factory_keys': [],
                'should_archive': False,
                'errors': errors,
                'total_proc_time': 0,
            }
        
        if not self.models:
            errors.append('failed to load pipeline model(s)')
            self.logger.exception('failed to load pipeline model(s)')
            result_dict['errors'] = errors
            return result_dict
        
        # preprocess
        t0 = time.time()
        img_det,operators_det = self.internal_preprocess(image)
        preproc_time = time.time()-t0
        
        # load runtime config
        test_mode = configs.get('test_mode', False)
        
        try:
            od_dict, time_info = self.det_predict(img_det, operators_det, configs)
        except Exception as e:
            self.logger.exception('failed to run detection model')
            errors.append(str(e))
            result_dict['errors'] = errors
            return result_dict
        
        # grab OD results
        boxes = od_dict['boxes']
        classes = od_dict['classes']
        scores = od_dict['scores']
        
        # annotate the image
        annotated_image = image.copy()
        for i,box in enumerate(boxes):
            pipeline_utils.plot_one_box(
                box,
                annotated_image,
                label=f'{classes[i]}: {scores[i]:.2f}',
                color=self.det_configs['color_map'][classes[i]],
            )
            
        # save annotated image if test mode is enabled
        if test_mode:
            outpath = kwargs.get('results_storage_path','./outputs')
            annotated_image_path = os.path.join(outpath, 'annotated_'+str(self.frame_index).zfill(4))+'.png'
            annot_bgr = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(annotated_image_path, annot_bgr)
            
        # gather time info
        prep_time = time_info['preproc'] + preproc_time
        infer_time = time_info['proc']
        postproc_time = time_info['postproc']
        total_time = prep_time + infer_time + postproc_time

        # pack results
        result_dict['should_archive'] = True
        result_dict['annotated_output'] = annotated_image
        result_dict['factory_keys'] = ['total_proc_time'] # send proc_time to GoFactory
        result_dict['det_boxes'] = boxes
        result_dict['det_scores'] = scores
        result_dict['det_classes'] = classes
        result_dict['total_proc_time'] = total_time
        
        # print logs
        self.logger.info(f'found objects: {classes}')
        self.logger.info(f'preprocess:{prep_time:.4f}, inference:{infer_time:.4f}, ' +
            f'postprocess:{postproc_time:.4f}, total:{total_time:.4f}\n')
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
            inputs = {'image': im}
            configs = {'test_mode':True}
            pipeline.predict(configs=configs, inputs=inputs)

    pipeline.clean_up()