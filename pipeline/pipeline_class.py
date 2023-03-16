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

import numpy as np
import logging



class ModelPipeline:

    logger = logging.getLogger()

    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs
        """
        pass
        
        
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

    def predict(self, configs: dict, image: np.ndarray, profile: np.ndarray = None,  **kwargs) -> dict:
        pass



if __name__ == '__main__':
    pass