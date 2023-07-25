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
from common.modelpipeline import ModelPipeline as ModelPipelineBase
from gadget_utils.pipeline_utils import load_pipeline_def


class ModelPipeline(ModelPipelineBase):
    """
    Any customization goes here.
    overwrite the predict method or any other methods if needed.
    """
    pass


if __name__ == '__main__':
    import argparse
    
    parser = argparse.ArgumentParser()
    parser.add_argument("--pipeline_configs_file", default="./pipeline_def.json", help="pipeline configs.json path")
    parser.add_argument("--output_data_path", default="../out", help="output data path")
    args=parser.parse_args()

    kwargs = load_pipeline_def(args.pipeline_configs_file)
    pipe=ModelPipeline(**kwargs)

    pipe.load()
    pipe.warm_up()
    
    # Inference testing goes here.