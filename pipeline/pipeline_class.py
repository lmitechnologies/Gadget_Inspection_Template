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
import random
from pipeline_base import PipelineBase, track_exception


class ModelPipeline(PipelineBase):

    logger = logging.getLogger(__name__)

    @track_exception(logger)
    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs
        """
        super().__init__()
        pass
        
        
    @track_exception(logger)
    def load(self):
        """
        create model instances with weight files
        if loading files fail, then don't create model instances
        """
        pass


    @track_exception(logger)
    def warm_up(self):
        """
        warm up all the models in the pipeline
        """
        pass


    @track_exception(logger)
    def predict(self, configs: dict, inputs: dict) -> dict:
        """predict on the inputs

        Args:
            configs (dict): runtime configs
            inputs (dict): inputs data

        Returns:
            dict: Must return the self.results defined in the base class
        """
        
        return self.results



if __name__ == '__main__':
    pass