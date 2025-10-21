# How to Modify the Gadget AI Pipeline
This guide provides a detailed walkthrough for developers on how to implement `pipeline_class.py` file. This script is the core of your custom AI logic within the Gadget platform.

# Overview
The `pipeline_class.py` file is where you define your pipeline's behavior. It is responsible for:

1. Load AI models and other necessary assets.
2. Warm up the models to ensure low latency on the first inference.
3. Execute inference on input data.
4. Format the results for use by other services like GoFactory and automation controllers.

Your custom class, `ModelPipeline`, will inherit from [PipelineBase class](https://github.com/lmitechnologies/LMI_AI_Solutions/blob/trevor_dev/lmi_utils/pipeline_base/pipeline_base.py), which provides a robust set of helper functions to simplify development.  
In this guide, some helpful utility functions are imported from the [LMI AI Solutions (AIS) repository](https://github.com/lmitechnologies/LMI_AI_Solutions).

# Understanding the Core Components
Before writing code, you must understand these key components:

- PipelineBase Class: The base class for your pipeline. It provides essential tools like model loaders, result formatters, and exception tracking.    
- `pipeline_def.json`: Your pipeline's main configuration file. The contents of this file are passed as `configs` dictionary to your pipeline's methods. This allows you to define pipeline related configurations.  
- `../static_models/manifest.json`: A collection of static model configurations, such as model paths, model roles, model types, etc. We call it `manifest.json` unless mentioned otherwise.  
- Model Roles: A concept for associating a specific model with a step in the inspection process (e.g., 'anomaly_model', 'detection_model'). These are defined both in `pipeline_def.json` and `manifest.json`, and used by the base class to load correct model(s).  
- `self.models`: An ordered dictionary initialized in the base class. Your `load()` function must populate it using model instances.  
- `self.results`: A dictionary that holds the output of pipeline prediction. Your `predict()` function must populate and return it.


# Step-by-Step Implementation Guide
This section will walk you through implementing each required method.

## Step 1: Configure `pipeline_def.json`
Before writing any Python code, you must first define your pipeline's configuration. This file acts as the blueprint for your pipeline, specifying which models to use and what parameters to apply at runtime.

Here is an example configuration for a pipeline that uses a single model:
```json
{
    "model_roles":[
        "pose_model"
    ],
    "configs_def":[
        {
            "name": "skip_every_2_frames",
            "default_value": {
                true
            }
        }
    ]
}
```

## Step 2: Configure `../static_models/manifest.json`
You need to define the static model manifest file, which consists of a list of static model configurations. Below is an example of using a single model:
```json
[
    {
        "model_role": "pose_model",
        "model_type": "KeypointDetection",
        "model_name": "Default",
        "model_version": "Default",
        "format": "pt",
        "artifacts": {
            "pt": {
                "model_path": "./yolo11n-pose.pt",
                "image_size": [
                    640,
                    640
                ]
            }
        },
        "details": {
            "training_package": "Ultralytics",
            "training_algorithm": "Yolo",
            "base_model": "yolo11n-pose.pt",
            "confidence_threshold": 0.5,
            "iou": 0.45,
            "object_size": 1,
            "global_preprocessing": [],
            "object_class": ["person"]
        }
    }
]
```


## Step 3: Boilerplate and Initialization
With your configuration set, you can now start writing the Python code. Import necessary libraries, define your class inheriting from `Base`, and implement `__init__`.  

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

## Step 4: Implementing `load()`
The goal of `load()` is to populate `self.models` dictionary. The example below uses `self.load_models()` helper method from the base class. It uses `filter` argument to select which model(s) to load. For example, a `filter` of `"-model"` would match configurations named both `"pose-model"` and `"detection-model"`.

### 4.1 Basic Example
This call finds the configuration named `"pose_model"` from `manifest.json` and loads the corresponding model into `self.models['pose_model']`.

```python
    @Base.track_exception(logger)
    def load(self, models, configs):
        """Load the pose model."""
        # '_model' is the filter that matches the model_role in `manifest.json` and in `pipeline_def.json`
        self.load_models(models, configs, filter='_model')
        self.logger.info('Models are loaded')
```

### 4.2 Advanced Example
You can also perform custom setup and pass additional keyword arguments to your model's constructor through `load_models`. Here, an additional keyword `class_map` is passed along during its initialization.

```python
    @Base.track_exception(logger)
    def load(self, models, configs):
        """Load the object detection model and pass it a custom class_map."""
        # 1. Perform custom setup, like creating a class mapping.
        self.class_map = {v['index']:k for k,v in configs['od_model']['object_configs'].items()}
        
        # 2. Pass the map as a keyword argument to the underlying model constructor.
        self.load_models(models, configs, 'od_model', class_map=self.class_map)
        self.logger.info('Models are loaded')
```

## Step 5: Implementing `warm_up()`
Here, you access each model you loaded into `self.models` and call its `warmup()` method. The dictionary key (e.g., 'pose_model') must match the one used during the load step.

```python
    @Base.track_exception(logger)
    def warm_up(self, configs):
        """Warm up the model(s)."""
        # Access the model from the self.models dictionary and call its warmup method
        self.models['pose_model'].warmup()
        self.logger.info('Warm up complete')
```

## Step 6: Implementing `predict()`
This is the most involved method. It follows a clear sequence: initialize, get data, predict, and format results.

### 6.1. Initialize and Get Inputs
Always start by calling `self.init_results()` to get a clean result dictionary for the current run. Then, extract your image data from `inputs` dictionary.

```python
    @torch.inference_mode()
    @Base.track_exception(logger)
    def predict(self, configs: dict, inputs: dict) -> dict:
        # ALWAYS start with this to clear previous results.
        self.init_results()
        
        # Extract image data from the standard input structure.
        image = inputs['image']['pixels']
```

### 6.2. Get Runtime Configurations
Extract any necessary parameters (like confidence or IoU thresholds) from `configs['models']` dictionary, which has all the model related configurations.

```python
        # Get runtime parameters from configs dictionary.
        confs = configs['models']['pose_model']['configs']
        iou_threshold = confs['iou']
        confidence_thresholds = {k:v['confidence'] for k,v in model_configs.items() if isinstance(v, dict)}
```

### 6.3. Run Inference
This part is specific to your model. Call `predict` method of your model object.

```python
        model_results = self.models['pose_model'].predict(image, confidence_thresholds, iou=iou_threshold)
```

### 6.4. Format and Return Results
Use `update_results()` and `add_prediction()` helper methods to correctly populate `self.results`.

- `update_results()`: Use this for updating results.  
    - To add the annotated image for display: `self.update_results('outputs', annotated_image, sub_key='annotated')`
    - To set the pass/fail decision for automation, such as PLCs: `self.update_results('decision', 'PASS', to_automation=True)`
    - To add a filterable tag for GoFactory: `self.update_results('tags', 'PASS', to_factory=True)`
    - To add custom metrics for GoFactory dashboards: `self.update_results('total_proc_time', 100.5, to_factory=True)`
- `add_prediction()`: Use this specifically to add prediction data (boxes, polygons, masks, keypoints) for upload to [Label Studio](https://labelstud.io).

```python
        # Populate the results dictionary using base class helpers.
        
        # Add the annotated image to 'outputs' dictionary for display in Gadget.
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

Implementing a unit test in `if __name__ == '__main__':` block is mandatory for validating your pipeline locally before deployment.

Your test should follow this structure:

1. Setup: Define paths and configure logging.
2. Load Configs: Load `pipeline_def.json` file using the provided utility.
3. Load manifest for static models in `../static_models` folder.
4. Instantiate Pipeline: Create an instance of your `ModelPipeline`.
5. Load & Warmup: Call `pipeline.load()` and `pipeline.warm_up()`. Note: For local testing, pass an empty dictionary {} for `model_roles` argument.
6. Run Prediction: Loop through test images, prepare the inputs dictionary, and call `pipeline.predict()`.
7. Validate & Save: Use `pipeline.check_return_types()` to ensure the result is correctly formatted. Save the annotated image to visually inspect the output.
8. Cleanup: Call `pipeline.clean_up()` to release resources.

## Unit Test Example
```python
if __name__ == '__main__':
    # 1. Setup
    logging.basicConfig(level=logging.INFO)
    pipeline_def_file = './pipeline_def.json'
    static_manifest_file = '/app/models/static/manifest.json'
    image_dir = './data'
    output_dir = './outputs/pose'
    os.makedirs(output_dir, exist_ok=True)

    # 2. Load configs
    kwargs = pipeline_utils.load_pipeline_def(pipeline_def_file)

    # 3. Load manifest for static models
    manifest = pipeline_utils.get_models_from_static_manifest(static_manifest_file)
    kwargs['models'] = manifest
    
    # 4. Instantiate pipeline
    pipeline = ModelPipeline(**kwargs)
    
    # 5. Load & Warmup
    logger.info('Loading models...')
    pipeline.load(manifest, kwargs)
    pipeline.warm_up(kwargs)
    logger.info('Load and warm-up complete.')

    # 6. Run prediction on each test image
    image_paths = [os.path.join(image_dir, f) for f in os.listdir(image_dir)]
    for image_path in image_paths:
        logger.info(f'Processing {image_path}...')
        
        image = cv2.imread(image_path)
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Create the standard 'inputs' dictionary structure
        inputs = {'image': {'pixels': image_rgb}}
        
        results = pipeline.predict(kwargs, inputs)
        
        # 7. Validate results and save annotated image
        assert pipeline.check_return_types(), 'Invalid return types in result dictionary'
        
        annotated_image = results['outputs']['annotated']
        if annotated_image is not None:
            output_path = os.path.join(output_dir, os.path.basename(image_path))
            cv2.imwrite(output_path, cv2.cvtColor(annotated_image, cv2.COLOR_RGB_BGR))
            logger.info(f'Saved annotated image to {output_path}')

    # 8. Cleanup
    pipeline.clean_up()
    logger.info('Pipeline finished.')
```
