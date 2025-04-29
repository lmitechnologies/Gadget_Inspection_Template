import collections
import functools
import logging
import traceback
from abc import ABCMeta, abstractmethod
from dataset_utils.representations import PipelinePredictions, Box, Polygon, Mask, Point2d
from datetime import datetime


class PipelineBase(metaclass=ABCMeta):
    
    logger = logging.getLogger(__name__)
    models: collections.OrderedDict
    results: dict
    labels: dict
    
    def __init__(self):
        """
        init the pipeline.
        it has the following attributes:
            models: a dictionary of model instances, e.g., {model_name: model_instance}
            results: a dictionary of the results, e.g., {'outputs':{}, 'automation_keys':[], 'factory_keys':[], 'tags':[], 'should_archive':True, 'decision':None}
        """
        self.models = collections.OrderedDict()
    
    
    def init_results(self):
        """
        init the output results
        """
        self.results = {
            "outputs": {
                "annotated": None,
            },
            "automation_keys": [],
            "factory_keys": ['tags'],
            "tags": [],
            "should_archive": True,
            "errors": [],
        }
    
    
    
    @classmethod
    def track_exception(cls, logger=logging.getLogger(__name__)):
        """track exceptions and log the error message to GoFactory.
        
        Args:
            logger (Logger, optional): the logger to use. Defaults to logging.getLogger(__name__).
        """
        def deco(func):
            @functools.wraps(func)
            def wrapper(self, *args, **kwargs):
                try:
                    return func(self, *args, **kwargs)
                except Exception:
                    logger.exception(f'Failed to run function: {func.__name__}')
                    if func.__name__ == 'predict':
                        # upload error messages to GoFactory
                        err_msg = traceback.format_exc()
                        self.update_results('errors', err_msg, to_factory=True)
                        self.update_results('tags', 'ERROR', to_factory=True)
                        self.update_results('should_archive', True)
                        return self.results
            return wrapper
        return deco
    
    @abstractmethod
    def warm_up(self, configs: dict):
        """
        warmup the pipeline
        """
        pass
    
    
    @abstractmethod
    def load(self, model_roles: dict, configs: dict):
        """
        load models
        """
        pass
    
    
    @abstractmethod
    def predict(self, configs: dict, inputs: dict):
        """
        the main function to run the pipeline.
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
        self.models = collections.OrderedDict()
        self.logger.info('pipeline is cleaned up')
    
    
        
    def update_results(self, key:str, value, sub_key=None, to_factory=False, to_automation=False, overwrite=False):
        """ 
        modify the self.results with the following rules:
        1: If the key is not in the self.results, create the key-value pair.
        2: If the self.results[key] is a list,
            2.1: if overwrite is False, append the value to the list.
            2.2: if overwrite is True, overwrite the list with the value.
        3: If the self.results[key] is a dictionary and sub_key is not None, update the value of the sub_key.
        4: Otherwise, update the value of the key.

        Args:
            key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
            to_factory (bool, optional): add the key to the gofactory. Defaults to False.
            to_automation (bool, optional): add the key to the automation. Defaults to False.
            overwrite (bool, optional): if self.results[key] is a list, overwrite it with value. Defaults to False.
        """
        if key not in self.results:
            if sub_key is not None:
                self.results[key] = {sub_key:value}
            else:
                self.results[key] = value
        elif isinstance(self.results[key], list):
            if overwrite:
                self.results[key] = value
            else:
                self.results[key].append(value)
        elif isinstance(self.results[key], dict) and sub_key is not None:
            self.results[key][sub_key] = value
        else:
            self.results[key] = value
            
        if to_factory and key not in self.results['factory_keys']:
            self.results['factory_keys'].append(key)
            
        if to_automation and key not in self.results['automation_keys']:
            self.results['automation_keys'].append(key)
    

        

    def add_predictions(self, predictions, image_height:int,image_width:int,key='outputs', sub_key='labels'):
        """add predictions to the results.
        Args:
            predictions (dict): the predictions to be added in the following format in the form of {"<type>": {"classes": [], "objects": [], "confidences"}} for ex: {"boxes": {"classes": [], "objects": [], "confidences"}}.
            image_height (int): the height of the image.
            image_width (int): the width of the image.
            key (str, optional): the key of the self.results. Defaults to 'outputs'.
            sub_key (str, optional): the key of the sub dictionary to be updated. Defaults to 'labels'.
        """
        if key not in self.results:
            self.results[key] = {
                sub_key: {
                    'type': 'object',
                    'format': 'json',
                    'extension': '.label.json',
                    'content': PipelinePredictions(
                        image_height=image_height,
                        image_width=image_width,
                        predictions=[],
                    )
                }
            }
        elif sub_key not in self.results[key]:
            self.results[key][sub_key] = {
                'type': 'object',
                'format': 'json',
                'extension': '.label.json',
                'content': PipelinePredictions(
                    height=image_height,
                    width=image_width,
                    predictions=[],
                )
            }
        
        if isinstance(self.results[key][sub_key]['content'], dict):
            self.results[key][sub_key]['content'] = PipelinePredictions.from_dict(self.results[key][sub_key]['content'])
            if self.results[key][sub_key]['content'].height != image_height or self.results[key][sub_key]['content'].width != image_width:
                raise ValueError('image height and width are not the same as the previous predictions')

        if 'boxes' in predictions:
            boxes = predictions['boxes']["objects"]
            labels = predictions['boxes']['labels']
            confidences = predictions['boxes']['confidences']
            for idx, value in enumerate(boxes):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                self.results[key][sub_key]['content'].create_prediction(
                    Box(
                        x_min=value[0],
                        y_min=value[1],
                        x_max=value[2],
                        y_max=value[3],
                        angle=0 if len(value) <= 4 else value[4],
                    ),
                    label_id=label,
                    confidence=conf,
                )
                
        
        elif 'polygons' in predictions:
            polygons = predictions['polygons']["objects"]
            labels = predictions['polygons']['labels']
            confidences = predictions['polygons']['confidences']
            for idx, value in enumerate(polygons):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                self.results[key][sub_key]['content'].create_prediction(
                    Polygon(
                        points=value,
                    ),
                    label_id=label,
                    confidence=conf,
                )
        
        elif 'masks' in predictions:
            masks = predictions['masks']["objects"]
            labels = predictions['masks']['labels']
            confidences = predictions['masks']['confidences']
            for idx, value in enumerate(masks):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                self.results[key][sub_key]['content'].create_prediction(
                    Mask(
                        mask=value,
                    ),
                    label_id=label,
                    confidence=conf,
                )
        
        elif 'keypoints' in predictions:
            keypoints = predictions['keypoints']["objects"]
            labels = predictions['keypoints']['labels']
            confidences = predictions['keypoints']['confidences']
            for idx, value in enumerate(keypoints):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                self.results[key][sub_key]['content'].create_prediction(
                    Point2d(
                        x=value[0],
                        y=value[1],
                    ),
                    label_id=label,
                    confidence=conf,
                )

        else:
            raise ValueError('predictions should contain boxes, polygons, masks or keypoints')
        
        self.results[key][sub_key]['content'] = self.results[key][sub_key]['content'].to_dict()

    
            
    def check_return_types(self) -> bool:
        """check if the return types are json serializable for debugging purpose.
        """
        def is_json_serializable(obj):
            """Check if an object can be serialized to JSON."""
            try:
                json.dumps(obj)
                return True
            except (TypeError, OverflowError):
                return False
        
        def helper(data, key=None):
            if isinstance(data, dict):
                for k,v in data.items():
                    if not helper(v, k):
                        return False
            
            if not is_json_serializable(data):
                self.logger.info(f'key: {key} is not json serializable')
                return False
            return True
        
        dt = {}
        for k,v in self.results.items():
            # only check labels in outputs
            if k == 'outputs':
                if 'labels' in v:
                    if k not in dt:
                        dt[k] = {}
                    dt[k]['labels'] = v['labels']
            else:
                dt[k] = v
        return helper(dt)
    