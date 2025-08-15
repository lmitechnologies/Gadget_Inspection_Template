# How to Modify the Gadget AI Pipeline
This guide provides a detailed walkthrough for developers on how to implement the `pipeline_class.py` file. This script is the core of your custom AI logic within the Gadget platform.

# Overview
The `pipeline_class.py` file is where you define your pipeline's behavior. It is responsible for:

1. Loading AI models and other necessary assets.
2. Warming up the models to ensure low latency on the first inference.
3. Executing inference on input data.
4. Formatting the results for use by other services like GoFactory and automation controllers.

Your custom class, `ModelPipeline`, will inherit from a `PipelineBase` class, which provides a robust set of helper functions to simplify development.

# Understanding the Core Components
Before writing code, you must understand these key components:

- `PipelineBase` Class: The parent class for your pipeline, located in `pipeline_base.py`. It provides essential tools like model loaders, result formatters, and exception tracking. You should not modify this base class in most cases.  
- `pipeline_def.json`: Your pipeline's main configuration file. The contents of this file are passed as the `configs` dictionary to your pipeline's methods. This allows you to define model paths, confidence thresholds, and other parameters without changing the code.  
- Model Roles: A concept for associating a specific model with a step in the inspection process (e.g., 'anomaly_model', 'detection_model'). These are defined in `pipeline_def.json` and used by the base class to load the correct model.  
- `self.models`: An ordered dictionary initialized in the base class. Your `load()` function will populate this dictionary with your model instances, for example: 
`
self.models['pose_model'] = your_model_object.  
`  
- `self.results`: A dictionary that holds the output of pipeline prediction. Your `predict()` function must populate this dictionary using helper methods and return it.

# The Pipeline Class API
You must implement the following four methods in your `ModelPipeline` class. It is highly recommended to decorate each one with the `@Base.track_exception(logger)` decorator to ensure errors are caught and logged correctly.

1. `__init__(self, **kwargs)`: The class constructor. Its primary job is to call the parent `super().__init__(**kwargs)`.  
2. `load(self, model_roles, configs)`: Loads your AI models and any other required assets into the `self.models` dictionary.  
3. `warm_up(self, configs)`: Performs a "dry run" of your models to avoid latency on the first real prediction.  
4. `predict(self, configs, inputs)`: The core inference method. It takes input data (e.g., an image), runs the model(s), and produces a result dictionary.


# Step-by-Step Implementation Guide
This section will guide you through implementing each required method, using the provided examples as a reference.

## Step 1: Configure the `pipeline_def.json`
Before writing any Python code, you must first define your pipeline's entire configuration. This file acts as the blueprint for your pipeline, specifying which models to use and what parameters to apply at runtime. Your `pipeline_class.py` code will read from this structure.

The file has two main sections:

- `model_roles`: A list of strings that assign a unique role name to each model in your pipeline. These roles are used to display the available models in the GadetAPP (e.g., `"detector_model"`, `"classifier_model"`).

- `configs_def`: A list of configuration objects. Each object in this list represents a set of parameters that your pipeline will use.

    - `name`: A string that must match a role from `model_roles`. This is how your Python code will access this specific configuration block.
    - `default_value`: An object containing all the parameters for this model. This typically includes:
        - `use_factory`: use the model trained using the GoFactory.
        - `metadata`: model initialization related metadata.
        - Runtime Parameters: Custom values you need for inference, such as iou thresholds, confidence scores for different classes, or other hyperparameters.

Here is an example configuration for a pipeline that uses a single pose model:
```json
{
    "model_roles":[
        "pose_model"
    ],
    "configs_def":[
        {
            "name": "pose_model",
            "default_value": {
                "use_factory": false,
                "metadata":{
                    "version": "v1",
                    "model_name": "yolov11",
                    "model_type": "pose",
                    "framework": "ultralytics",
                    "image_size": [640, 640],
                    "model_path": "/home/gadget/pipeline/trt-engines/yolo11n-pose.pt"
                },
                "iou": 0.45,
                "object_configs": {
                    "person": {"confidence": 0.5}
                }
            }
        }
    ]
}
```

## Step 2: Boilerplate and Initialization
With your configuration set, you can now start writing the Python code. Import necessary libraries, define your class inheriting from `Base`, and implement `__init__`. Some helpful utility functions are imported from the LMI AI Solutions (AIS) repository: https://github.com/lmitechnologies/LMI_AI_Solutions. 

```python
import logging
import torch
from pipeline_base import PipelineBase as Base
# utility functions from LMI AI Solutions repository
import gadget_utils.pipeline_utils as pipeline_utils

# It's good practice to get a logger instance for your pipeline
logger = logging.getLogger(__name__)

class ModelPipeline(Base):
    
    @Base.track_exception(logger)
    def __init__(self, **kwargs) -> None:
        """
        Initialize the pipeline. Always call the parent constructor first.
        """
        super().__init__(**kwargs)
        # You can add other pipeline-specific initializations here if needed.

```

## Step 3: Implementing `load()`
The goal of `load()` is to populate the `self.models` dictionary. The easiest way is to use the `self.load_models()` helper method from the base class. It uses the `filter` argument to select which model configurations to load from `pipeline_def.json`. This works by matching the `filter` string against the `"name"` field of each configuration. For example, a `filter` of `"-model"` would match configurations named both `"pose-model"` and `"detection-model"`.

### 3.1 Basic Example (from YOLO Pose Pipeline)
This call finds the configuration named `"pose_model"` in `pipeline_def.json` and loads the corresponding model into `self.models['pose_model']`.

```python
    @Base.track_exception(logger)
    def load(self, model_roles, configs):
        """Load the pose model."""
        # '_model' is the filter that matches the "name" in `pipeline_def.json`
        self.load_models(model_roles, configs, '_model')
        self.logger.info('Models are loaded')
```

### 3.2 Advanced Example (from Detectron2 Pipeline)
You can also perform custom setup and pass additional keyword arguments to your model's constructor through `load_models`. Here, a `class_map` is created from the configs and passed along to the model during its initialization.

```python
    @Base.track_exception(logger)
    def load(self, model_roles, configs):
        """Load the object detection model and pass it a custom class_map."""
        # 1. Perform custom setup, like creating a class mapping.
        self.class_map = {v['index']:k for k,v in configs['od_model']['object_configs'].items()}
        
        # 2. Pass the map as a keyword argument to the underlying model constructor.
        self.load_models(model_roles, configs, 'od_model', class_map=self.class_map)
        self.logger.info('Models are loaded')
```

## Step 4: Implementing `warm_up()`
Here, you access each model you loaded into `self.models` and call its `warmup()` method. The dictionary key (e.g., 'pose_model') must match the one used during the load step.

```python
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """Warm up the model(s)."""
        # Access the model from the self.models dictionary and call its warmup method
        self.models['pose_model'].warmup()
        self.logger.info('Warm up complete')
```

## Step 5: Implementing `predict()`
This is the most involved method. It follows a clear sequence: initialize, get data, predict, and format results.

### 5.1. Initialize and Get Inputs
Always start by calling `self.init_results()` to get a clean result dictionary for the current run. Then, extract your image data from the `inputs` dictionary.

```python
    @torch.inference_mode()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs: dict) -> dict:
        # ALWAYS start with this to clear previous results.
        self.init_results()
        
        # Extract image data from the standard input structure.
        image = inputs['image']['pixels']
```

### 5.2. Get Runtime Configurations
Extract any necessary parameters (like thresholds or IoU values) from the `configs` dictionary. The keys you use will match those in your `pipeline_def.json`.

```python
        # Get runtime parameters from the configs dictionary.
        # 'pose_model' is the name of the configuration from `pipeline_def.json`.
        iou_threshold = configs['pose_model']['iou']
        class_configs = configs['pose_model']['object_configs']
        confidence_thresholds = {k:v['confidence'] for k,v in class_configs.items()}
```

### 5.3. Run Inference
This part is specific to your model. Call the `predict` method of your model object, which you access from `self.models`.

```python
        # This is just an example; your model's predict method may have different arguments.
        model_results = self.models['pose_model'].predict(image, confidence_thresholds, iou=iou_threshold)
```

### 5.4. Format and Return Results
Use the `update_results()` and `add_prediction()` helper methods to correctly populate the `self.results` dictionary.

- `update_results()`: Use this for updating results.  
    - To add the annotated image for display: `self.update_results('outputs', annotated_image, sub_key='annotated')`
    - To set the pass/fail decision for automation, such as PLCs: `self.update_results('decision', 'PASS', to_automation=True)`
    - To add a filterable tag for GoFactory: `self.update_results('tags', 'PASS', to_factory=True)`
    - To add custom metrics for GoFactory dashboards: `self.update_results('total_proc_time', 100.5, to_factory=True)`
- `add_prediction()`: Use this specifically to add prediction data (boxes, polygons, masks, keypoints) for upload to [Label Studio](https://labelstud.io).

```python
        # Populate the results dictionary using base class helpers.
        
        # Add the annotated image to the 'outputs' dictionary for display in Gadget.
        annotated_image = self.models['pose_model'].annotate_image(model_results, image)
        self.update_results('outputs', annotated_image, sub_key='annotated')
        
        # Add structured predictions for Label Studio.
        h, w = image.shape[:2]
        for i, object_name in enumerate(model_results['classes']):
            box = model_results['boxes'][i]
            score = model_results['scores'][i]
            self.add_prediction('boxes', box, score, object_name, h, w)
            
            # You can add multiple prediction types (e.g., keypoints)
            keypoints = model_results['points'][i]
            for pt in keypoints:
                self.add_prediction('keypoints', pt, score, object_name, h, w)

        # Set the final decision and tags for automation (PLC) and GoFactory.
        decision = 'PASS' if len(model_results['classes']) > 0 else 'FAIL'
        self.update_results('decision', decision, to_automation=True)
        self.update_results('tags', decision, to_factory=True) 
        
        # ALWAYS return the populated results dictionary.
        return self.results
```

# How to Write a Unit Test

Implementing a unit test in the if `__name__ == '__main__'`: block is mandatory for validating your pipeline locally before deployment.

Your test should follow this structure:

1. Setup: Define paths and configure logging.
2. Load Configs: Load the `pipeline_def.json` file using the provided utility.
3. Instantiate Pipeline: Create an instance of your `ModelPipeline`.
4. Load & Warmup: Call `pipeline.load()` and `pipeline.warm_up()`. Note: For local testing, pass an empty dictionary {} for the `model_roles` argument.
5. Run Prediction: Loop through test images, prepare the inputs dictionary in the correct format, and call `pipeline.predict()`.
6. Validate & Save: Use `pipeline.check_return_types()` to ensure the result is correctly formatted. Save the annotated image to visually inspect the output.
7. Cleanup: Call `pipeline.clean_up()` to release resources.

## Unit Test Example
```python
if __name__ == '__main__':
    # 1. Setup
    logging.basicConfig(level=logging.INFO)
    pipeline_def_file = './`pipeline_def.json`'
    image_dir = './data'
    output_dir = './outputs'
    os.makedirs(output_dir, exist_ok=True)

    # 2. Load configs
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)
    
    # 3. Instantiate pipeline
    pipeline = ModelPipeline(**kwargs)
    
    # 4. Load & Warmup (use an empty dict {} for model_roles during local testing)
    logger.info('Loading models...')
    pipeline.load({}, kwargs)
    pipeline.warm_up(kwargs)
    logger.info('Load and warm-up complete.')

    # 5. Run prediction on each test image
    image_paths = [os.path.join(image_dir, f) for f in os.listdir(image_dir)]
    for image_path in image_paths:
        logger.info(f'Processing {image_path}...')
        
        image = cv2.imread(image_path)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Create the standard 'inputs' dictionary structure
        inputs = {'image': {'pixels': image_rgb}}
        
        results = pipeline.predict(kwargs, inputs)
        
        # 6. Validate results and save annotated image
        assert pipeline.check_return_types(), 'Invalid return types in result dictionary'
        
        annotated_image = results['outputs']['annotated']
        if annotated_image is not None:
            output_path = os.path.join(output_dir, os.path.basename(image_path))
            cv2.imwrite(output_path, cv2.cvtColor(annotated_image, cv2.COLOR_RGB_BGR))
            logger.info(f'Saved annotated image to {output_path}')

    # 7. Cleanup
    pipeline.clean_up()
    logger.info('Pipeline finished.')
```
