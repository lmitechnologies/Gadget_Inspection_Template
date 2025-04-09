"""
Description:
pipeline class

Requirements:
this pipeline class, needs to have the following methods:
    load
    warm_up
    predict
"""

import logging
from pipeline_base import PipelineBase as Base
import random

class ModelPipeline(Base):

    logger = logging.getLogger(__name__)

    @Base.track_exception(logger)
    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs. To initialize self.results, call super().__init__()
        """
        self.logger.info("INIT")
        super().__init__()
        
        
    @Base.track_exception(logger)
    def load(self, model_roles, configs):
        """
        create model instances with weight files
        if loading files fail, then don't create model instances
        """
        self.logger.info(f"CONFIGS {configs}")


    @Base.track_exception(logger)
    def warm_up(self, configs):
        """
        warm up all the models in the pipeline
        """
        self.logger.info(f"WARMUP")


    index = 0
    arr = ["Blister", "Crack", "Wane", "FishEye"]
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs: dict) -> dict:
        """predict on the inputs

        Args:
            configs (dict): runtime configs
            inputs (dict): inputs data

        Returns:
            dict: should return self.results defined in the pipeline base class
        """
        self.index += 1
        return {
            "outputs": {
                "foreground": inputs['image'],
            },
            "automation_keys": [],
            "factory_keys":  [],
            "tags": ["foreground"], 
            "should_archive": False,

        } 



if __name__ == '__main__':
    pass
