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



class ModelPipeline:

    logger = logging.getLogger()

    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs
        """
        self.configs = {}
        self.configs['engine_path'] = os.path.realpath(os.path.expandvars(kwargs.get('engine_file',"")))
        self.configs['class_map'] = {int(k):v for k,v in kwargs.get('class_map', {}).items()}
        pass # add your code here ...
        
        
    def load(self):
        """
        create model instances with weight files
        if loading files fail, then don't create model instances
        """
        pass
        

    def clean_up(self):
        """
        clean up the pipeline in REVERSED order, i.e., the last models get destroyed first
        """
        pass


    def warm_up(self):
        """
        warm up all the models in the pipeline
        """
        pass

    def predict(self, input_image: str, configs: dict, results_storage_path: str) -> dict:
        pass



if __name__ == '__main__':
    pass