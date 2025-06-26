import collections
import functools
import logging
import traceback
from abc import ABCMeta, abstractmethod
import json
from od_core.object_detector import ObjectDetector
from ad_core.anomaly_detector import AnomalyDetector
from dataset_utils.representations import Box, Polygon, Mask, Point2d, AnnotationType, Annotation


class PipelineBase(metaclass=ABCMeta):
    
    logger = logging.getLogger(__name__)
    models: collections.OrderedDict
    results: dict
    
    def __init__(self):
        """
        init the pipeline.
        it has the following attributes:
            models: a dictionary of model instances, e.g., {model_name: model_instance}
            results: a dictionary of the results, e.g., {'outputs':{}, 'automation_keys':[], 'factory_keys':[], 'tags':[], 'should_archive':True, 'decision':None}
        """
        self.models = collections.OrderedDict()
        self.init_results()
    
    def _load_model(self,model_name:str, metadata:dict):
        """
        load models
        """
        if model_name in self.models:
            self.logger.info(f'{model_name} is already loaded')
        self.logger.info(f"Loading {model_name} from {metadata['model_path']}")
            
        if metadata.get('model_type', '').lower() == 'anomalydetection':
            if 'image_size' in metadata:
                if metadata['image_size'] is None:
                    metadata['image_size'] = [224, 224]
            self.models[model_name] = AnomalyDetector(
                metadata,
            )
        elif metadata.get('model_type', '').lower() in ['objectdetection', 'instancesegmentation', 'pose', 'obb', 'od', 'seg']:
            self.models[model_name] = ObjectDetector(
                metadata,
            )
        else:
            raise ValueError(f'model_type {metadata.get("model_type", "")} is not supported')
        
    def load_models(self, model_roles: dict, configs: dict, filter: str = '-model'):
        self.logger.info(f'Model Roles: {model_roles}')
        model_config_keys = [k for k in configs.keys() if f'{filter}' in k]
        for model_key in model_config_keys:
            use_factory = configs[model_key].get('use_factory', False)
            if use_factory:
                if model_key in model_roles:
                    if model_roles[model_key].get('model_type', None) is not None:
                        self._load_model(model_key, model_roles[model_key])
                        self.logger.info(f'GoFactory model: {model_key} loaded')
                    else:
                        self.logger.warning(f'{model_key} role is not in GoFactory, loading default model')
                        self._load_model(model_key, configs[model_key]['metadata'])
                else:
                    self.logger.warning(f'{model_key} role is not in GoFactory, loading default model')
                    self._load_model(model_key, configs[model_key]['metadata'])
            else:
                self._load_model(model_key, configs[model_key]['metadata'])
                self.logger.info(f'Default model: {model_key} loaded')
        self.logger.info(f'Loaded models: {self.models.keys()}')
        
    
    def update_predictions(self, key:str, value, score, label, image_height:int, image_width:int):
        predictions = {
            'boxes': {"classes": [], "objects": [], "confidences": []},
            'polygons': {"classes": [], "objects": [], "confidences": []},
            'masks': {"classes": [], "objects": [], "confidences": []},
            'keypoints': {"classes": [], "objects": [], "confidences": []},
        }
        if key not in predictions:
            raise ValueError(f'key {key} is not in predictions')
        predictions[key]['classes'] = [label]
        predictions[key]['objects'] = [value]
        predictions[key]['confidences'] = [score]
        
        self.add_predictions(predictions, image_height=image_height, image_width=image_width, key='outputs', sub_key='labels')
        
        
    def add_predictions(self, predictions, image_height:int,image_width:int,key='outputs', sub_key='labels'):
        """add predictions to the results.
        Args:
            predictions (dict): the predictions to be added in the following format in the form of {"<type>": {"classes": [], "objects": [], "confidences"}} for ex: {"boxes": {"classes": [], "objects": [], "confidences": []}}.
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
                    'content': dict(
                        height=image_height,
                        width=image_width,
                        predictions=[],
                    )
                }
            }
        elif sub_key not in self.results[key]:
            self.results[key][sub_key] = {
                'type': 'object',
                'format': 'json',
                'extension': '.label.json',
                'content': dict(
                    height=image_height,
                    width=image_width,
                    predictions=[],
                )
            }
        
        if self.results[key][sub_key]['content']['height'] != image_height or self.results[key][sub_key]['content']['width'] != image_width:
            raise ValueError(f'Image size mismatch: {self.results[key][sub_key]["content"]["height"]}x{self.results[key][sub_key]["content"]["width"]} != {image_height}x{image_width}')
        
        if 'boxes' in predictions:
            boxes = predictions['boxes']["objects"]
            labels = predictions['boxes']['classes']
            confidences = predictions['boxes']['confidences']
            for idx, value in enumerate(boxes):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                box = Box(
                    x_min=value[0],
                    y_min=value[1],
                    x_max=value[2],
                    y_max=value[3],
                    angle=0,
                )
                self.results[key][sub_key]['content']['predictions'].append(
                    Annotation(
                        id = str(len(self.results[key][sub_key]['content']['predictions'])),
                        value=box,
                        label_id=label,
                        confidence=conf,
                        type=AnnotationType.BOX.value
                    ).to_dict()
                )
        if 'polygons' in predictions:
            polygons = predictions['polygons']["objects"]
            labels = predictions['polygons']['classes']
            confidences = predictions['polygons']['confidences']
            for idx, value in enumerate(polygons):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                polygon = Polygon(
                    points=value,
                )
                self.results[key][sub_key]['content']['predictions'].append(
                    Annotation(
                        id = str(len(self.results[key][sub_key]['content']['predictions'])),
                        value=polygon,
                        label_id=label,
                        confidence=conf,
                        type=AnnotationType.POLYGON.value
                    ).to_dict()
                )
        if 'masks' in predictions:
            masks = predictions['masks']["objects"]
            labels = predictions['masks']['classes']
            confidences = predictions['masks']['confidences']
            for idx, value in enumerate(masks):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                mask = Mask(
                    mask=value,
                )
                self.results[key][sub_key]['content']['predictions'].append(
                    Annotation(
                        id = str(len(self.results[key][sub_key]['content']['predictions'])),
                        value=mask,
                        label_id=label,
                        confidence=conf,
                        type=AnnotationType.MASK.value
                    ).to_dict()
                )
        if 'keypoints' in predictions:
            keypoints = predictions['keypoints']["objects"]
            labels = predictions['keypoints']['classes']
            confidences = predictions['keypoints']['confidences']
            for idx, value in enumerate(keypoints):
                conf = confidences[idx] if isinstance(confidences, list) else confidences
                label = labels[idx] if isinstance(labels, list) else labels
                keypoint = Point2d(
                    x=value[0],
                    y=value[1],
                )
                self.results[key][sub_key]['content']['predictions'].append(
                    Annotation(
                        id = str(len(self.results[key][sub_key]['content']['predictions'])),
                        value=keypoint,
                        label_id=label,
                        confidence=conf,
                        type=AnnotationType.KEYPOINT.value
                    ).to_dict()
                )
        
                    

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
    def load(self, configs: dict):
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
            
    
    def check_return_types(self) -> bool:
        """check if the return types are json serializable for debugging purpose.
        """
        def is_json_serializable(obj, key):
            """Check if an object can be serialized to JSON."""
            try:
                json.dumps(obj)
                return True
            except (TypeError, OverflowError):
                self.logger.error(f'{key} is not json serializable, with data: {obj}')
                return False
        
        for k,v in self.results.items():
            if k == 'outputs':
                # only check labels in outputs
                if 'labels' in v:
                    if not is_json_serializable(v['labels'], 'labels in outputs'):
                        return False
            else:
                if not is_json_serializable(v,k):
                    return False
        return True