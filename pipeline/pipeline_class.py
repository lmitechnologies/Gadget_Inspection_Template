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

    status = True
    def predict(self, configs: dict, inputs: dict) -> dict:
        self.logger.info(f"Predicting: {self.status}")
        self.status = not self.status
        return {
            "outputs": {
                "annotated": inputs["image"]
            },
            "automation_keys": ["decision"],
            "factory_keys": [],
            "tags": None,
            "should_archive": True,
            "decision": random.randint(0, 4)
        }



if __name__ == '__main__':
    pass