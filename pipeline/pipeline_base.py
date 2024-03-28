import cv2
import time
import collections
import functools
import sys
import logging
from abc import ABCMeta, abstractmethod


# decorator to track exceptions
def track_exception(logger=logging.getLogger(__name__)):
    def deco(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            try:
                return func(*args, **kwargs)
            except Exception:
                logger.exception(f'failed to run funtion: {func.__name__}')
                return None
        return wrapper
    return deco



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
        
        
    def init_results(self):
        """
        init the output results
        """
        self.results = {
            "outputs": {
                "annotated": None,
            },
            "automation_keys": [],
            "factory_keys": [],
            "tags": [],
            "should_archive": True,
            "decision": None,
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
        
        
    def update_results(self, result_key:str, value, sub_key=None):
        """ 
        modify the self.results with the following rules:
        1: If the result_key is not in the self.results, create the key-value pair.
        2: If the self.results[result_key] is a list, append the value to the list.
        3: If the self.results[result_key] is a dictionary and sub_key is not None, update the value of the sub_key.
        4: Otherwise, update the value of the result_key.

        Args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
        """
        if result_key not in self.results:
            if sub_key is not None:
                self.results[result_key] = {sub_key:value}
            else:
                self.results[result_key] = value
        elif isinstance(self.results[result_key], list):
            self.results[result_key].append(value)
        elif isinstance(self.results[result_key], dict) and sub_key is not None:
            self.results[result_key][sub_key] = value
        else:
            self.results[result_key] = value
            
            
    def add_to_factory(self, result_key:str):
        """add result_key to the GoFactory

        Args:
            result_key (str): the key to be added to the factory_keys list
        """
        if result_key not in self.results['factory_keys']:
            self.results['factory_keys'].append(result_key)
            
            
    def add_to_automation(self, result_key:str):
        """add result_key to the Automation service

        Args:
            result_key (str): the key to be added to the automation_keys list
        """
        if result_key not in self.results['automation_keys']:
            self.results['automation_keys'].append(result_key)
            
            
    def update_factory(self, result_key:str, value, sub_key=None):
        """
        update key-value pair to the self.results and also upload the key to GoFactory.
        
        args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
        
        """
        self.update_results(result_key, value, sub_key)
        self.add_to_factory(result_key)
        
        
    def update_automation(self, result_key:str, value, sub_key=None):
        """
        update key-value pair to the self.results and also upload the key to Automation service
        
        args:
            result_key (str): the key of the self.results
            value (obj): the value of the key to be updated
            sub_key (str, optional): the key of sub dictionary to be updated. Defaults to None.
        """
        self.update_results(result_key, value, sub_key)
        self.add_to_automation(result_key)
    