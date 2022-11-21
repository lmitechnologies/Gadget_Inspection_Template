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
import traceback
import tensorflow as tf
import utils
import glob

W2=428
H2=512

class ModelPipeline:

    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)

    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs
        """
        self.COLORS = [(255,0,0),(0,255,0),(0,0,255)] #BGR
        self.configs = {}
        self.configs['engine_path'] = os.path.realpath(os.path.expandvars(kwargs.get('engine_file',"")))
        self.configs['class_map'] = {int(k):v for k,v in kwargs.get('class_map', {}).items()}
        
        #map model name -> model instance
        self.models = collections.OrderedDict()
        self.count = 0
        
        
    def load(self):
        """
        create model instances with weight files
        if loading files fail, then don't create model instances
        """
        try:
            if not self.configs['class_map']:
                raise Exception('Failed to load confidence thresholds')
            self.logger.info(f"loading model {self.configs['engine_path']}")
            self.models['rcnn'] = tf.saved_model.load(self.configs['engine_path'])
            self.logger.info('model loaded')
        except Exception as e:
            self.logger.error(traceback.format_exc())
            self.logger.error('models are failed to load')
            self.models = None

    def save_model(self):
        # self.models['rcnn'].save_model
        pass
        

    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destroyed first
        """
        L = list(reversed(self.models.keys())) if self.models else []
        self.logger.info('cleanning up pipeline...')
        for model_name in L:
            del self.models[model_name]
            self.logger.info(f"{model_name} is cleaned up")

        del self.models
        self.models = None
        self.logger.info('pipeline is cleaned up')


    def warm_up(self):
        """
        warm up all the models in the pipeline
        """
        self.logger.info(f"ModelPipeline warm_up")
        dummy = tf.zeros((1,H2,W2,3), dtype= tf.uint8)
        self.models['rcnn'](dummy)
        self.logger.info(f"ModelPipeline warm_up done")

    def predict(self, input_image: str, configs: dict, results_storage_path: str) -> dict:
        errors = []
        result_dict = None
        try:
            result_dict = self.predict_internal(input_image, configs, results_storage_path)
        except Exception as e:
            self.logger.error(f"ModelPipeline predict - Exception {e}")
            errors.append(str(e))
        if not result_dict:
            result_dict = {
                'file_path': input_image,
                'decision': None,
                'slope': 0,
                'automation_keys': [],
                'factory_keys': [],
                'errors': errors
            }
        return result_dict

    def predict_internal(self, input_image: str, configs: dict, results_storage_path: str) -> dict:
        self.count += 1
        
        self.logger.info(f"ModelPipeline predict - load input_image {input_image} {self.count}")
        predict_start_time = time.time()

        if input_image.endswith(".png"):
            image = tf.io.read_file(input_image)
            image = tf.io.decode_image(image, expand_animations=False)
        else:
            assert(input_image.endswith(".npy"))
            image = np.load(input_image, allow_pickle=True) #RGB

        image_load_time = time.time() - predict_start_time
        
        # im preprocess
        start_time = time.time()
        if tf.shape(image)[-1] == 1:
            image = tf.image.grayscale_to_rgb(image)
        
        image = tf.cast(image, dtype=tf.uint8)
        #resize image
        image = tf.image.resize(image, size=(H2, W2))
        image = tf.expand_dims(image, axis=0)
        image = tf.cast(image, dtype=tf.uint8)
        image_tensor = tf.convert_to_tensor(image)
        preprocess_time = time.time() - start_time

        self.logger.info(f"ModelPipeline predict inferring...")
        # feed the preprocessed image into the model -> outputs: [3 keypoints]
        start_time = time.time()
        detections = self.models['rcnn'](image_tensor)
        inference_time = time.time() - start_time
        
        boxes=detections['detection_boxes'].numpy()
        scores=detections['detection_scores'].numpy()
        labels=detections['detection_classes'].numpy()
        N=detections['num_detections'].numpy()
        
        if 'detection_keypoints' in list(detections.keys()):
            keypoints=detections['detection_keypoints'].numpy()
        else:
            keypoints=np.empty((boxes.shape[1],1))
            keypoints[:]=np.nan

        test_mode = configs.get('test_mode', False)
        confidence_leg = configs.get('confidence_leg', 0.5)
        
        start_time = time.time()
        # #recast to 1-D array
        boxes=np.squeeze(boxes).tolist()
        scores=np.squeeze(scores)
        labels=np.squeeze(labels)
        keypoints=np.squeeze(keypoints).tolist()

        records = zip(boxes,keypoints,scores,labels)
        records = [r for r in records if r[2] >= confidence_leg]
        if not records:
            self.logger.warning(f"====== no records for input_image {input_image} ======")
            return None
        output_image = np.squeeze(image.numpy()) #RGB
        for (box,keypoint_pairs,score,label) in records:
            self.logger.info(f"====== {box},{keypoint_pairs},{score},{label} ======")
            #extract bounding box
            (startY,startX,endY,endX)=box
            idx = int(label)-1
            label=self.configs['class_map'][idx]
            #scale bounding box from [0,1] to [W,H]
            startX=int(startX*W2)
            startY=int(startY*H2)
            endX=int(endX*W2)
            endY=int(endY*H2)
            
            # annotation
            text = f"{label}: {score:.2f}"
            cv2.rectangle(output_image, (startX, startY), (endX, endY),self.COLORS[idx], 1)
            y = startY - 10 if startY - 10 > 10 else startY + 10
            
            # if not np.isnan(keypoint_pairs).any():
            if keypoint_pairs:
                keypoint_pairs_ints = [(int(pair[1]*W2),int(pair[0]*H2)) for pair in keypoint_pairs]
                for pair in keypoint_pairs_ints:
                    cv2.circle(output_image,(pair[0], pair[1]),3,self.COLORS[idx],-1)

                for point1, point2 in zip(keypoint_pairs_ints, keypoint_pairs_ints[1:]): 
                    cv2.line(output_image, point1, point2, self.COLORS[idx], 1)

                p1, p2 = keypoint_pairs_ints[0], keypoint_pairs_ints[1]
                slope = 1000.0 if p1[0] == p2[0] else abs((p2[1]-p1[1])/(p2[0]-p1[0]))
                slope = min(1000.0, round(slope, 2))
                text += f", slope: {slope:.2f}"
                cv2.putText(output_image, text, (startX, y),cv2.FONT_HERSHEY_SIMPLEX, 0.3, self.COLORS[idx], 1)

        postprocess_time = time.time() - start_time

        self.logger.info(f"ModelPipeline predict saving ...")
        
        start_time = time.time()
        out_name = 'annot_'+os.path.basename(input_image)
        annotated_image_path = os.path.join(results_storage_path, out_name)
        if test_mode:
            # cv2.imwrite(annotated_image_path,cv2.cvtColor(output_image.copy(),cv2.COLOR_BGR2RGB))

            annotated_image_path = annotated_image_path.replace('.npy','.png')
            cv2.imwrite(annotated_image_path, output_image[:,:,::-1]) # convert to BGR
            self.logger.info(f"ModelPipeline imwrite to {annotated_image_path}")
        else:
            np.save(annotated_image_path,output_image[:,:,::-1])
            self.logger.info(f"ModelPipeline save to {annotated_image_path}")
            assert(os.path.isfile(annotated_image_path)), f"Failed to save {annotated_image_path}"

        image_save_time = time.time() - start_time

        total_proc_time = time.time() - predict_start_time
        
        # gather the results dictionary and return the dictionary ??
        result_dict = {
                'file_path': annotated_image_path,
                'automation_keys': ['boxes','scores','labels'],
                'factory_keys': ['boxes','scores','labels','keypoints'],
                'confidence': float(score),
                'decision': label,
                'slope': slope,
                'errors': [],
                'image_load_time': image_load_time,
                'preprocess_time': preprocess_time,
                'inference_time': inference_time,
                'postprocess_time': postprocess_time,
                'image_save_time': image_save_time,
                'total_proc_time': total_proc_time
            }
        
        # box,keypoint_pairs,score,label
        result_dict['boxes'] = [r[0] for r in records]
        result_dict['keypoints'] = [r[1] for r in records]
        result_dict['scores'] = [float(r[2]) for r in records]
        result_dict['labels'] = [float(r[3]) for r in records]

        self.logger.info(f"result_dict {result_dict}")
        
        return result_dict


# for unit test
if __name__ == '__main__':
    print("main started.")

    BATCH_SIZE = 1
    
    # os.environ['PIPELINE_SERVER_SETTINGS_MODELS_ROOT'] = '/home/aaeon/jarvis-middletown-hamsplit/ml-sandbox/objdet/tf/centernet/trained-inference-models/trained_model/saved_model'
    os.environ['PIPELINE_SERVER_SETTINGS_MODELS_ROOT'] = '/home/aaeon/jarvis-middletown-hamsplit/ml-sandbox/objdet/tf/centernet/trt/trt-models-tf2.5.0'
    pipeline_def_file = './pipeline_def.json'
    
    kwargs = utils.load_pipeline_def(pipeline_def_file)
    pipeline = ModelPipeline(**kwargs)
    
    print("pipeline loading...")
    start_time = time.time()
    pipeline.load()
    image_save_time = time.time() - start_time
    print("pipeline done", image_save_time)

    print("warming up...")
    start_time = time.time()
    pipeline.warm_up()
    image_save_time = time.time() - start_time
    print("warming up done", image_save_time)

    image_dir = '../data/test_npys'
    output_dir = '../data/outputs/test_npys'

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    image_path_batches = utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt='npy')
    for batch in image_path_batches:
        for image_path in batch:
            res = pipeline.predict(image_path, configs={'test_mode':True}, results_storage_path=output_dir)
            print("res", res)

    pipeline.clean_up()


###################################################################
# trt conversion
# gsutil -m rsync -ru gs://lmi-jarvis-middletown-hamsplit-models/ml-sandbox ./ml-sandbox/
# https://source.cloud.google.com/trex-winchester-board/ml_sandbox/+/master:models/tf/objdet/efficientdet/trt/
# https://catalog.ngc.nvidia.com/orgs/nvidia/containers/l4t-tensorflow
# l4t-tensorflow:r32.5.0-tf2.3-py3

####################################################################
# new engagement improvements:
# 1. initialize gadget (ml_models) git repo with new-engagement repo
# 2. automate the creation process of saved_model and tensorrt engine
# 3. new-engagement project improvements:
#    1) replace dummy parameters with general parameters like exposure_time, gain, etc.
#    2) add detailed folder structure explanation and guidline into README
# 4. create a simple folder structure template for ml-sandbox as well, and initialize the git repo with it.