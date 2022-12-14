"""
Description:
Kayem pipeline class.

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
import json
import logging
import traceback

#own modules
from yolov5 import YoLov5TRT
from rcnn import RCNNTRT
import utils


PAD_W,PAD_H = 1600,480
RESIZE_RATE_YOLO = 0.6
RESIZE_RATE_MASK = 0.4


class ModelPipeline:

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    def __init__(self, **kwargs):
        """
        class_map: the class id -> class name
        """
        self.yolov5_configs = {}
        self.yolov5_configs['engine_path'] = os.path.realpath(os.path.expandvars(kwargs.get('yolov5_engine_file',"")))
        self.yolov5_configs['plugin_path'] = os.path.realpath(os.path.expandvars(kwargs.get('yolov5_plugin_file',"")))
        self.yolov5_configs['class_map'] = utils.convert_key_to_int(kwargs.get('yolov5_class_map', {}))
        
        self.yolov5_configs['conf_thres'] = {
            'knot':kwargs.get('confidence_knot',0.5),
        }
        self.yolov5_configs['iou_thres'] = kwargs.get('yolov5_iou_threshold',0.4)

        self.rcnn_configs = {}
        self.rcnn_configs['engine_path'] = os.path.realpath(os.path.expandvars(kwargs.get('rcnn_engine_file',"")))
        self.rcnn_configs['plugin_path'] = os.path.realpath(os.path.expandvars(kwargs.get('rcnn_plugin_file',"")))
        self.rcnn_configs['class_map'] = utils.convert_key_to_int(kwargs.get('rcnn_class_map', {}))
        
        self.rcnn_configs['conf_thres'] = {
            'wane':kwargs.get('confidence_wane',0.5),
            'knot':1.1, # disable knot detection
        }
        self.rcnn_configs['iou_thres'] = kwargs.get('rcnn_iou_threshold',0.4)
        self.rcnn_configs['mask_edge_length'] = kwargs.get('rcnn_mask_edge_length',14)
        self.rcnn_configs['max_output_bbox_cnt'] = kwargs.get('rcnn_max_output_bbox_cnt',20)

        #map model name -> model instance
        self.models = collections.OrderedDict()


    def load(self):
        """
        create model instances with engine files
        if loading files fail, then don't create model instances
        """
        try:
            if not self.yolov5_configs['class_map'] or not self.rcnn_configs['class_map']:
                raise Exception('Failed to load class maps')
            self.models['yolov5'] = YoLov5TRT(
                self.yolov5_configs['engine_path'], self.yolov5_configs['plugin_path'], self.yolov5_configs['class_map'], 
                self.yolov5_configs['conf_thres'], self.yolov5_configs['iou_thres']
                )
            self.models['rcnn'] = RCNNTRT(
                self.rcnn_configs['engine_path'], self.rcnn_configs['plugin_path'], self.rcnn_configs['class_map'], 
                self.rcnn_configs['conf_thres'], nms_iou=self.rcnn_configs['iou_thres'], 
                mask_edge_length=self.rcnn_configs['mask_edge_length'], max_num_bbox=self.rcnn_configs['max_output_bbox_cnt']
                )
            self.logger.info('models are loaded')
        except Exception as e:
            self.logger.error(traceback.format_exc())
            self.logger.error('models are failed to load')
            self.models = None
        

    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destoried first
        """
        L = list(reversed(self.models.keys())) if self.models else []
        self.logger.info('cleanning up pipeline...')
        for model_name in L:
            if self.models[model_name]:
                self.models[model_name].destroy()
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
            dummy_inputs = list(self.models[model_name].get_raw_image_zeros())
            self.logger.info(f'warming up {model_name} on dummy inputs with the size of {dummy_inputs[0].shape}')
            self.models[model_name].infer(dummy_inputs)


    def preprocess(self, input_images:list):
        """
        pad and resize images
        """
        images_yolo,images_mask = [],[]
        # need this to revert back to original image coordinates
        operators_yolo, operators_mask = {},{} 
        for i,I in enumerate(input_images):
            I2,pad_l,pad_t = utils.fit_array_to_size(I, PAD_W, PAD_H)
            out_yolo = cv2.resize(I2, None, fx=RESIZE_RATE_YOLO, fy=RESIZE_RATE_YOLO)
            out_mask = cv2.resize(I2, None, fx=RESIZE_RATE_MASK, fy=RESIZE_RATE_MASK)
            images_yolo.append(out_yolo)
            images_mask.append(out_mask)
            if i==0:
                operators_yolo = [{'pad':[pad_l,pad_t]},{'resize':[RESIZE_RATE_YOLO]*2}]
                operators_mask = [{'pad':[pad_l,pad_t]},{'resize':[RESIZE_RATE_MASK]*2}]    
        return images_yolo,operators_yolo,images_mask,operators_mask


    def postprocess(self, input_images, obj_det_dict1, obj_det_dict2, operators_yolo, operators_mask, mask_thres):
        """
        convert to original image coordinates
        convert masks to vertices
        plot predictions on input image
        """
        scores_yolo = obj_det_dict1[0]['scores']
        classes_yolo = obj_det_dict1[0]['classes']
        boxes_yolo = utils.revert_to_origin(obj_det_dict1[0]['boxes'], operators_yolo)
        annotated_images = [input_images[0].copy()]
        for j,box in enumerate(boxes_yolo):
            utils.plot_one_box(
                box,
                annotated_images[0],
                label="{}:{:.2f}".format(
                    classes_yolo[j], scores_yolo[j]
                ),
            )
        scores_mask = obj_det_dict2[0]['scores']
        classes_mask = obj_det_dict2[0]['classes']            
        masks = obj_det_dict2[0]['masks']
        boxes_mask = utils.revert_to_origin(obj_det_dict2[0]['boxes'], operators_mask)
        for j,box in enumerate(boxes_mask):
            utils.plot_one_box(
                box,
                annotated_images[0],
                mask=masks[j],mask_threshold=mask_thres[classes_mask[j]],
                label="{}:{:.2f}".format(
                    classes_mask[j], scores_mask[j]
                ),
            )
        
        # convert mask to vertices
        result_contours = []
        for i,mask in enumerate(masks):
            x1,y1,x2,y2 = map(int,boxes_mask[i])
            mask = cv2.resize(np.array(mask),(x2-x1,y2-y1))
            mask = (mask>mask_thres[classes_mask[i]])
            h,w = y2-y1,x2-x1 # pad to the edges
            canvas = np.zeros((h,w),dtype=np.uint8)
            canvas[mask] = np.uint8(255)
            contours,_ = cv2.findContours(canvas,mode=cv2.RETR_EXTERNAL,method=cv2.CHAIN_APPROX_SIMPLE)
            for contour in contours:
                cont_size=contour.shape[0]
                xval = contour.reshape((cont_size,2))[:,0] + x1
                yval = contour.reshape((cont_size,2))[:,1] + y1
                xy = [[x,y] for x,y in zip(xval,yval)]
                result_contours.append(xy)
        #annotated_images[0] = cv2.polylines(annotated_images[0], [np.array(pts,dtype=np.int) for pts in result_contours],isClosed=1, color=(0,0,0),thickness=2)
        return annotated_images,result_contours


    def predict(self, input_image: str, configs: dict, results_storage_path: str) -> dict:
        # load image from file
        start_time = time.time()
        errors = []
        try:
            #load as RGB
            input_images = [np.load(input_image)] 
        except Exception as e:
            errors.append(e)
            input_images = []
        image_load_time = time.time() - start_time

        # image preprocess
        start_time =  time.time()
        if input_images:
            images_yolo,operators_yolo,images_mask,operators_mask = self.preprocess(input_images)
        preprocess_time = time.time() - start_time

        # run inference 
        start_time = time.time()
        test_mode = configs.get('test_mode', False)
        
        if configs:
            conf_thres = {
                'knot':configs.get('confidence_knot', self.yolov5_configs['conf_thres']['knot']),
                'wane':configs.get('confidence_wane', self.rcnn_configs['conf_thres']['wane']),
            }
        iou_thres1 = configs.get('yolov5_iou_threshold', self.yolov5_configs['iou_thres'])
        iou_thres2 = configs.get('rcnn_iou_threshold', self.rcnn_configs['iou_thres'])
        if self.models and input_images:
            obj_det_dict1, proc_time_dict1, errors1 = self.models['yolov5'].infer(images_yolo, conf_thres, iou_thres1)
            conf_thres['knot'] = 1.1 # disable knot detection
            obj_det_dict2, proc_time_dict2, errors2 = self.models['rcnn'].infer(images_mask, conf_thres, iou_thres2)
            errors += errors1+errors2
        else:
            errors.append('failed to load pipeline model(s)')
        pipeline_time = time.time() - start_time

        # print errors
        for e in errors:
            self.logger.error(f'{e}')

        # plot predictions in orignal image
        start_time = time.time() 
        if self.models and input_images:
            try:
                annotated_images,result_contours = self.postprocess(
                    input_images, obj_det_dict1, obj_det_dict2, operators_yolo, operators_mask, conf_thres
                    )
            except Exception as e:
                self.logger.error(traceback.format_exc())
                self.logger.error(f'Exception in Postprocess')
        postprocess_time = time.time() - start_time

        # gather time info
        inference_time =  0
        if self.models:
            preprocess_time += proc_time_dict1['pre']+proc_time_dict2['pre']
            inference_time += proc_time_dict1['exec']+proc_time_dict2['exec']
            postprocess_time += proc_time_dict1['post']+proc_time_dict2['post']
        
        # Save the edited image
        image_save_time = 0
        annotated_image_path = ''
        start_time = time.time()
        if self.models and input_images:
            annotated_image_path = os.path.join(results_storage_path, 'annotated_'+os.path.basename(input_image))
            img = annotated_images[0] #only one input image
            
            # save classifier annotated image
            if test_mode:
                cv2.imwrite(annotated_image_path.replace('.npy','.png'), img[:,:,::-1]) # convert to BGR
            else:
                np.save(annotated_image_path,img)
        image_save_time = time.time() - start_time
        total_time = image_load_time + pipeline_time + image_save_time
        
        result_dict = {
                'file_path': input_image,
                'automation_keys': [],
                'factory_keys': [],
                'errors': errors,
                'image_load_time': image_load_time,
                'preprocess_time': preprocess_time,
                'inference_time': inference_time,
                'postprocess_time': postprocess_time,
                'image_save_time': image_save_time,
                'total_proc_time': total_time
            }

        if self.models and input_images:
            defect_list = obj_det_dict1[0]['classes']+obj_det_dict2[0]['classes']
            result_dict['automation_keys'] = ['yolo_boxes','yolo_scores','yolo_classes','maskrcnn_masks','maskrcnn_scores','maskrcnn_classes']
            result_dict['factory_keys'] = ['yolo_boxes','yolo_scores','yolo_classes','maskrcnn_masks','maskrcnn_scores','maskrcnn_classes','total_proc_time']
            #result_dict['defect_list'] = defect_list
            result_dict['file_path'] = annotated_image_path
            result_dict['yolo_boxes'] = obj_det_dict1[0]['boxes']
            result_dict['yolo_scores'] = obj_det_dict1[0]['scores']
            result_dict['yolo_classes'] = obj_det_dict1[0]['classes']
            #result_dict['maskrcnn_boxes'] = obj_det_dict2[0]['boxes']
            result_dict['maskrcnn_masks'] = result_contours
            result_dict['maskrcnn_scores'] = obj_det_dict2[0]['scores']
            result_dict['maskrcnn_classes'] = obj_det_dict2[0]['classes']
            result_dict['errors'] = errors
                
            self.logger.info(f'[FILE INFO]: {os.path.basename(input_image)}')
            self.logger.info(f'defect list: {defect_list}')
            self.logger.info(f'[FILE INFO]: annotated_im_path {annotated_image_path}')
            self.logger.info(f'[TIME INFO]: image_load:{image_load_time:.4f}, preprocess:{preprocess_time:.4f}, inference:{inference_time:.4f}, ' +
                f'postprocess:{postprocess_time:.4f}, image_save:{image_save_time:.4f}, total:{total_time:.4f}\n')
        return result_dict

if __name__ == '__main__':
    logger = logging.getLogger()
    logging.basicConfig()
    logger.setLevel(logging.DEBUG)

    BATCH_SIZE = 1
    os.environ['PIPELINE_SERVER_SETTINGS_MODELS_ROOT'] = './pipeline/trt_engines/arm'
    pipeline_def_file = './pipeline/pipeline_def.json'
    
    kwargs = utils.load_pipeline_def(pipeline_def_file)
    pipeline = ModelPipeline(**kwargs)
    
    logger.info('start loading the pipeline...')
    pipeline.load()
    pipeline.warm_up()

    #test on object detection training data 640x640
    image_dir = './data/test_images'
    output_dir = './data/outputs'

    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir)

    image_path_batches = utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt='npy')
    for batch in image_path_batches:
        for image_path in batch:
            pipeline.predict(image_path, configs={'test_mode':True}, results_storage_path=output_dir)

    pipeline.clean_up()
