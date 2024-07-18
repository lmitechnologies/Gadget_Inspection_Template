import collections
import functools
import logging
import traceback
from abc import ABCMeta, abstractmethod



class PipelineBase(metaclass=ABCMeta):
    
    logger = logging.getLogger(__name__)
    
    def __init__(self):
        """
        init the pipeline.
        it has the following attributes:
            models: a dictionary of model instances, e.g., {model_name: model_instance}
            configs: a dictionary of the initial configs to load models, e.g., {model_path: '/path/to/model'}
            results: a dictionary of the results, e.g., {'outputs':{}, 'automation_keys':[], 'factory_keys':[], 'tags':[], 'should_archive':True, 'decision':None}
        """
        self.models = collections.OrderedDict()
        self.configs = {}
        self.init_results()
        
        
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
                    err_msg = traceback.format_exc()
                    # upload the error message to GoFactory
                    self.update_results('errors', err_msg, to_factory=True)
                    self.update_results('tags', 'ERROR', to_factory=True)
                    self.update_results('should_archive', True)
                    return self.results
            return wrapper
        return deco
    
    
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
    
    
    @abstractmethod
    def warm_up(self):
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
    def predict(self):
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
        self.models = None
        self.logger.info('pipeline is cleaned up')
        
        
    def update_results(self, key:str, value, sub_key=None, to_factory=False, to_automation=False):
        """ 
        modify the self.results with the following rules:
        1: If the key is not in the self.results, create the key-value pair.
        2: If the self.results[key] is a list, append the value to the list.
        3: If the self.results[key] is a dictionary and sub_key is not None, update the value of the sub_key.
        4: Otherwise, update the value of the key.

        Args:
            key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
            to_factory (bool, optional): add the key to the gofactory. Defaults to False.
            to_automation (bool, optional): add the key to the automation. Defaults to False.
        """
        if key not in self.results:
            if sub_key is not None:
                self.results[key] = {sub_key:value}
            else:
                self.results[key] = value
        elif isinstance(self.results[key], list):
            self.results[key].append(value)
        elif isinstance(self.results[key], dict) and sub_key is not None:
            self.results[key][sub_key] = value
        else:
            self.results[key] = value
            
        if to_factory and key not in self.results['factory_keys']:
            self.results['factory_keys'].append(key)
            
        if to_automation and key not in self.results['automation_keys']:
            self.results['automation_keys'].append(key)
    