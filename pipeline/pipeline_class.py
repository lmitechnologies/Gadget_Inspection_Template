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


class ModelPipeline(Base):

    logger = logging.getLogger(__name__)

    @Base.track_exception(logger)
    def __init__(self, **kwargs):
        """
        init the pipeline with kwargs.
        """
        super().__init__(**kwargs)
        
        
    @Base.track_exception(logger)
    def load(self, model_roles: dict, configs: dict):
        """
        create model instances with weight files
        if loading files fail, then don't create model instances
        """
        pass


    @Base.track_exception(logger)
    def warm_up(self, configs: dict):
        """
        warm up all the models in the pipeline
        """
        pass


    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs: dict) -> dict:
        """predict on the inputs

        Args:
            configs (dict): runtime configs
            inputs (dict): inputs data

        Returns:
            dict: should return self.results defined in the pipeline base class
        """
        pass



if __name__ == '__main__':
    pass