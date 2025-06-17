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
    # Maps prediction keys to the specific classes and types needed for annotation.
    _PREDICTION_HANDLERS = {
        'boxes': {
            'value_func': lambda v: Box(x_min=v[0], y_min=v[1], x_max=v[2], y_max=v[3], angle=v[4] if len(v) > 4 else 0),
            'type': AnnotationType.BOX.value
        },
        'polygons': {
            'value_func': lambda v: Polygon(points=v),
            'type': AnnotationType.POLYGON.value
        },
        'masks': {
            'value_func': lambda v: Mask(mask=v),
            'type': AnnotationType.MASK.value
        },
        'keypoints': {
            'value_func': lambda v: Point2d(x=v[0], y=v[1]),
            'type': AnnotationType.KEYPOINT.value
        }
    }
    
    def __init__(self):
        """
        init the pipeline.
        it has the following attributes:
            models: a dictionary of model instances, e.g., {model_name: model_instance}
            results: a dictionary of the results, e.g., {'outputs':{}, 'automation_keys':[], 'factory_keys':[], 'tags':[], 'should_archive':True, 'decision':None}
        """
        self.models = collections.OrderedDict()
        self.init_results()
        
    
    def _load_model(self, model_name:str, metadata:dict, **kwargs):
        """ load a model with the given metadata.
        
        args:
            model_name (str): the name of the model to be loaded.
            metadata (dict): the metadata of the model to be loaded.
            kwargs (dict): additional arguments to be passed to the model constructor.
        Raises:
            ValueError: if the model_type is not supported.
        """
        if model_name in self.models:
            self.logger.info(f'{model_name} is already loaded')
        self.logger.info(f"Loading {model_name} from {metadata['model_path']}")
            
        if metadata.get('model_type', '').lower() == 'anomalydetection':
            if 'image_size' in metadata:
                if metadata['image_size'] is None:
                    metadata['image_size'] = [224, 224]
            self.models[model_name] = AnomalyDetector(
                metadata, **kwargs
            )
        elif metadata.get('model_type', '').lower() in ['objectdetection', 'instancesegmentation', 'pose', 'obb', 'od', 'seg']:
            self.models[model_name] = ObjectDetector(
                metadata, **kwargs
            )
        else:
            raise ValueError(f'model_type {metadata.get("model_type", "")} is not supported')
        
        
    def load_models(self, model_roles: dict, configs: dict, filter: str = '-model', **kwargs):
        """load models based on the provided model roles and configurations.
        
        Args:
            model_roles (dict): a dictionary from gofactory
            configs (dict): the configs from pipeline definition json file.
            filter (str, optional): a model filter. Defaults to '-model'.
        """
        self.logger.info(f'Model Roles: {model_roles}')
        model_config_keys = [k for k in configs.keys() if f'{filter}' in k]
        for model_key in model_config_keys:
            model_config = configs[model_key]
            use_factory = model_config.get('use_factory', False)
            # Start with the default configuration.
            config_to_use = model_config['metadata']
            model_source = "default"
            
            can_use_factory_role = (
                use_factory and
                model_key in model_roles and
                model_roles[model_key].get('model_type') is not None
            )
            
            if can_use_factory_role:
                config_to_use = model_roles[model_key]
                model_source = "GoFactory"
            elif use_factory:
                self.logger.warning(
                    f"'{model_key}' was configured to use GoFactory, but its role was invalid or not found. "
                    "Falling back to default model."
                )
                
            self._load_model(model_key, config_to_use, **kwargs)
            self.logger.info(f"Successfully loaded {model_source} model: '{model_key}'")
        self.logger.info(f'Final loaded models: {list(self.models.keys())}')
        
    
    def add_one_prediction(self, key:str, value:object, score:float, label:str, image_height:int, image_width:int):
        """add a new prediction in the self.results
        
        Args:
            key (str): the key of the predictions to be updated, e.g., 'boxes', 'polygons', 'masks', 'keypoints'.
            value (object): the value of the prediction, e.g., a list of coordinates for boxes, polygons, and keypoints; a numpy array for masks.
            score (float): the confidence score of the prediction.
            label (str): the label of the prediction.
            image_height (int): the height of the image that the prediction is made on.
            image_width (int): the width of the image that the prediction is made on.
        """
        if key not in self._PREDICTION_HANDLERS:
            raise ValueError(f'Unsupported prediction type: "{key}"')
        
        predictions = {
            key: {
                'classes': [label],
                'objects': [value],
                'confidences': [score]
            }
        }
        self.add_predictions(predictions, image_height, image_width, key='outputs', sub_key='labels')
        
        
    def add_predictions(self, predictions, image_height:int, image_width:int, key='outputs', sub_key='labels'):
        """add predictions to the results.
        
        Args:
            predictions (dict): a dictionary of predictions with one of these keys: boxes, polygons, masks and keypoints. e.g., {"boxes": {"classes": [], "objects": [], "confidences": []}}.
            image_height (int): the height of the image.
            image_width (int): the width of the image.
            key (str, optional): the key of the self.results. Defaults to 'outputs'.
            sub_key (str, optional): the key of the sub dictionary to be updated. Defaults to 'labels'.
        """
        default_entry = {
            'type': 'object',
            'format': 'json',
            'extension': '.label.json',
            'content': {
                'height': image_height,
                'width': image_width,
                'predictions': [],
            }
        }
        
        if key not in self.results:
            self.results[key] = {sub_key: default_entry}
        elif sub_key not in self.results[key]:
            self.results[key][sub_key] = default_entry
        
        if self.results[key][sub_key]['content']['height'] != image_height or self.results[key][sub_key]['content']['width'] != image_width:
            raise ValueError(f'Image size mismatch: {self.results[key][sub_key]["content"]["height"]}x{self.results[key][sub_key]["content"]["width"]} != {image_height}x{image_width}')
        
        prediction_list = self.results[key][sub_key]['content']['predictions']
        for pred_type, handler in self._PREDICTION_HANDLERS.items():
            if pred_type in predictions:
                data = predictions[pred_type]
                
                for idx, value_data in enumerate(data['objects']):
                    value_object = handler['value_func'](value_data)
                    annotation = Annotation(
                        id=str(len(prediction_list)),
                        value=value_object,
                        label_id=data['classes'][idx],
                        confidence=float(data['confidences'][idx]),
                        type=handler['type']
                    )
                    prediction_list.append(annotation.to_dict())
                    

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
            
    
    def check_return_types(self, check_sub_keys=['labels']) -> bool:
        """check if the result dictionary is json serializable
        
        Args:
            check_sub_keys (list, optional): a list of sub keys to check in 'outputs'. Defaults to ['labels'].
        """
        def is_json_serializable(obj, key):
            """Check if an object can be serialized to JSON."""
            try:
                json.dumps(obj)
                return True
            except (TypeError, OverflowError):
                self.logger.error(f'{key} is not json serializable.')
                return False
        
        for k,v in self.results.items():
            if k == 'outputs':
                for sub_key in check_sub_keys:
                    if sub_key not in v:
                        self.logger.warning(f'{sub_key} is not found in outputs, skip checking it')
                    elif not is_json_serializable(v[sub_key], f'"{sub_key}" in "outputs"'):
                        return False
            else:
                if not is_json_serializable(v,k):
                    return False
        return True
    