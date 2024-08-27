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
        init the pipeline with kwargs. To initialize self.results, call super().__init__()
        """
        pass
        
        
    @Base.track_exception(logger)
    def load(self, configs):
        """
        create model instances with weight files
        if loading files fail, then don't create model instances
        """
        pass


    @Base.track_exception(logger)
    def warm_up(self, configs):
        """
        warm up all the models in the pipeline
        """
        pass


    index = 0
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
        self.logger.info(f"Index: {self.index} returns: {10 if self.index % 60 == 0 else 1}")
        return {
            "outputs": {
                "annotated": inputs['image'],
            },
            "automation_keys": [ "decision"],
            "factory_keys":  ["tags", "decision"],
            "tags": ["round", "square"], 
            "should_archive": False,

            "decision": 10 if self.index % 60 == 0 else 1,
        } 



if __name__ == '__main__':
    pass
