import time
import os
import cv2
import logging
import torch

from lmi_utils.pipeline_base import PipelineBase as Base
import lmi_utils.gadget_utils.pipeline_utils as pipeline_utils


PASS = 'PASS'
FAIL = 'FAIL'


class ModelPipeline(Base):
    
    logger = logging.getLogger(__name__)
    
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        """initialize the pipeline
        
        Args:
            kwargs: configs defined in the pipeline_def.json
        """
        super().__init__(**kwargs)
        self.logger.info(f'gadget version: {self.version}')
        
    
    @Base.track_exception(logger)
    def load(self, models, configs):
        """load the model(s)

        Args:
            models (dict): model roles
            configs (dict): runtime configs
        """
        # assume the order of class names is the same as that in the model configs
        self.class_map = {i:k for i,k in enumerate(configs['models']['od_model']['configs']['confidence'].keys())}
        self.load_models(models, configs, 'od_model', class_map=self.class_map)
        self.logger.info('models are loaded')
    
    
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """warm up the model for the first time

        Args:
            configs (dict): runtime configs
        """
        t1 = time.time()
        self.models['od_model'].warmup()
        t2 = time.time()
        self.logger.info(f'warm up time: {t2-t1:.4f}')
    
    
    @torch.inference_mode()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs:dict) -> dict:
        """predict the result based on the inputs

        Args:
            configs (dict): runtime configs
            inputs (dict): inputs

        Raises:
            Exception: failed to load pipeline model(s)

        Returns:
            dict: a result dictionary
        """
        start_time = time.time()
        # init a result dict
        self.init_results()
        
        image = inputs['image']['pixels']
        
        if not self.models:
            raise Exception('failed to load pipeline model(s)')
        
        # load runtime config
        confs = configs['models']['od_model']['configs']['confidence'] # confidence thresholds
    
        # global processing
        processed_im, ops = self.preprocess('od_model', image)
        
        results_dict,_ = self.models['od_model'].predict(processed_im, confs, return_segments=True)

        # revert global processing
        reverted_dict = self.revert_preprocess(results_dict, ops)
        
        # remove batch dim
        dt = {k:v[0] for k,v in reverted_dict.items()}
        
        # upload annotated image to GadgetAPP and GoFactory
        annotated_image = self.models['od_model'].annotate_image(dt, image)
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # grab the results
        objects = dt['classes']       # object names
        boxes = dt['boxes']           # bounding boxes
        scores = dt['scores']         # scores for the bounding boxes
        masks = dt['masks']           # binary masks for instance segmentation
        segments = dt['segments']     # polygons according to the masks
        
        # upload predictions to GoFactory
        h0,w0 = image.shape[:2]
        for i,name in enumerate(objects):
            box = boxes[i].astype(int)
            seg = segments[i].astype(int)
            score = scores[i]
            self.add_prediction('boxes', box, score, name, h0, w0)
            self.add_prediction('polygons', seg, score, name, h0, w0)
        self.logger.info(f'predictions length: {len(self.results["outputs"]["labels"]["content"]["predictions"])}')
        
        # upload decision to the Gadget automation service
        decision = PASS if len(objects) == 0 else FAIL # assume no object is PASS
        self.update_results('decision', decision, to_automation=True)
        
        # upload tags to GoFactory
        tag = PASS if decision == PASS else FAIL
        self.update_results('tags', tag, to_factory=True)
        
        total_proc_time = time.time()-start_time
        
        self.logger.info(f'found objects: {objects}')
        self.logger.info(f'total proc time: {total_proc_time:.4f}s\n')
        
        return self.results



if __name__ == '__main__':
    # unit test
    import shutil
    BATCH_SIZE = 1
    pipeline_def_file = './pipeline/pipeline_def.json'
    static_manifest_file = '/app/models/static/examples/object_detection/bbox_and_segmentation/detectron2/manifest.json'
    image_dir = './data'
    output_dir = './outputs/bbox_and_seg/detectron2'
    fmts = ['jpg', 'png']
    
    logging.basicConfig()
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    
    # delete contents in the output dir
    if os.path.exists(output_dir):
        shutil.rmtree(output_dir)
    os.makedirs(output_dir, exist_ok=True)
    
    # load the pipeline definition
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    # create manifest for static models
    manifest = pipeline_utils.get_models_from_static_manifest(static_manifest_file)
    kwargs['models'] = manifest
    
    # initialize the pipeline
    pipeline = ModelPipeline(**kwargs)
    
    # load and warmup the model
    pipeline.load(manifest, kwargs)
    pipeline.warm_up(kwargs)

    # load test images
    image_path_batches = []
    for fmt in fmts:
        image_path_batches += pipeline_utils.get_img_path_batches(BATCH_SIZE, image_dir, fmt=fmt)
        
    for batch in image_path_batches:
        for image_path in batch:
            # load a image
            fname = os.path.basename(image_path)
            logger.info(f'processing {fname}...')
            im_bgr = cv2.imread(image_path)
            im = cv2.cvtColor(im_bgr, cv2.COLOR_BGR2RGB)
            
            # convert to the input format
            inputs = {
                'image':{'pixels':im},
            }
            
            # run the pipeline
            results = pipeline.predict(kwargs, inputs)
            assert pipeline.check_return_types(), 'invalid return types'
            
            # save the annotated image
            annotated_image = results['outputs']['annotated']
            bgr = cv2.cvtColor(annotated_image,cv2.COLOR_RGB2BGR)
            cv2.imwrite(os.path.join(output_dir, fname.replace(f'.{fmt}',f'_annotated.{fmt}')), bgr)
    
    pipeline.clean_up()
    