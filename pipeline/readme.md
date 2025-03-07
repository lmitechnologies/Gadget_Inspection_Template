# Gadget Pipeline

This pipeline template is designed for deploying AI models on the LMI runtime platform - **Gadget**. It also provides a step-by-step guide to help developers get started.

## Getting Started

1. Read this document thoroughly.
2. Learn the pipeline examples in the **example** folder.
3. Define the **Dockerfile** for your pipeline.
4. Populate the **pipeline_def.json** with the necessary configurations.
5. Implement the required functions in the **pipeline_class.py** file.
6. Add a unit test in the `main` function within **pipeline_class.py**.
7. Run and validate the unit test.

## Top-level Folder Strcuture

The pipeline folder consists of the following:  

```plaintext
.  
├── example  
├── test  
├── trt-engines  
├── trt-generation  
├── __init__.py  
├── pipeline_base.py  
├── pipeline_class.py  
├── pipeline_def.json  
├── pipeline.dockerfile  
├── README.md  
└── requirements.txt  
```

## Folder Contents

**example**: a folder of examples that illustrate the implementation of pipeline classes for performing inspection tasks using varying AI models including object detection, instance segmentation, classification and anomaly detection.  
**test**: a folder containing the testing scripts (optional).  
**trt-engines**: a folder containing the generated TensorRT engines, created from the models in the **trt-generation** folder. These engines are intended for deployment to production edge devices, such as GoMax.  
**trt-generation**: a folder containing model weights and additional files required for generating TensorRT engines.  
**pipeline_base.py**: the pipeline base class, which typically does **not** require modification.  
**pipeline_class.py**: the implementation of the pipeline class. Several required functions must be implemented.  
**pipeline_def.json**: this file defines the pipeline configurations, such as paths to trained models or confidence thresholds for classes. It must include a `configs_def` key, whose value is a list. Each element in this list is a dictionary containing two required keys: `name` and `default_value`. The value of `default_value` must be of a JSON-serializable type. Here is an example:

```json
{
    "configs_def":
    [
        {
            "name": "od_model",
            "default_value": {
                "path": "/home/gadget/pipeline/trt-engines/model.pt",
                "hw": [640,640],
                "objects": {
                    "car": {
                        "confidence":0.5,
                    },
                    "bus": {
                        "confidence": 0.6,
                    }
                }
            }
        }
    ]
}
```

**pipeline.dockerfile**: the Dockerfile that defines the pipeline container.  
**requirements.txt**: this file specifies the Python libraries to be installed in the Docker container.  

## Pipeline Class API

The Gadget pipeline class, to be implemented in the **pipeline_class.py**, is responsible for loading configurations (e.g., confidence thresholds, paths to trained AI models, model hyperparameters, etc.), loading and warming up models, making predictions, and cleaning up models. The pipeline class inherits from the base class defined in the **pipeline_base.py** to simplify implementation. Refer to the [Pipeline Base Class](#pipeline-base-class) section for details.  
To complete these tasks listed above, the following functions must be implemented in the pipeline class:

1. **def \_\_init\_\_(self, `**kwargs`) -> None:**  
    This function initializes the pipeline class. The `kwargs` argument contains the key-value pairs defined in the **pipeline_def.json**.
2. **def load(self, `configs`: dict) -> None:**  
    This function loads the models and stores them in the `self.models` variable defined in the pipeline base class. The `configs` argument contains runtime key-value pairs, where the keys match those in the **pipeline_def.json** and the values may differ. The following functions use the same `configs` argument unless otherwise stated.
3. **def warm_up(self, `configs`: dict) -> None:**  
    This function receives the `configs` and runs the models for the first time using dummy inputs.
4. **def predict(self, `configs`: dict, `inputs`: dict) -> dict:**  
    This function receives the `inputs` and `configs`, makes predictions, adds annotations to the image, and returns the annotated image along with the model results. Refer to the [Pipeline Inputs](#pipeline-inputs) section for the details of `inputs`. This function must return a `self.results` dictionary defined in the pipeline base class.  

The following function is already implemented in the pipeline base class. While it is recommended to use the base class, developers who choose not to use it must implement this function themselves:

- **def clean_up(self, `configs`: dict):**  
This function receives `configs` and deletes the models from memory.

Additionally, it is recommended that developers define a unit test in the main function within the pipeline class. Refer to the main function in the **example/pipeline_class.py** for guidance.

## Upload Predictions to Label Studio

The Gadget supports uploading model prediction results to [Label Studo](https://labelstud.io) for human labeling enabling dataset expansion and model performance improvement. 

### Label Object

The label_obj is a dictionary that encapsulates the prediction results for an image. It contains metadata about the image and the detected objects in the form of bounding boxes (boxes) and polygons (polygons).

Structure:

```python
label_obj = {
    'type': 'object',
    'format': 'json',
    'extension': '.label.json',
    'content': {
        'image_width': int,
        'image_height': int,
        'boxes': list,
        'polygons': list
    }
}
```

Fields:

- `type`: Specifies the type of the object. Always set to 'object'.
- `format`: Specifies the format of the object. Always set to 'json'.
- `extension`: Specifies the file extension for the label file. Always set to '.label.json'.
- `content`:
  - Contains the actual prediction data for the image.
  - Subfields:
    - `image_width`: Width of the image in pixels.  
    - `image_height`: Height of the image in pixels.  
    - `boxes`: A list of bounding box objects.  
    - `polygons`: A list of polygon objects.  

### Bounding Box Object

The `box_obj` represents a detected object in the form of a bounding box. Each bounding box is defined by its top-left corner coordinates, width, height, and a confidence score.

Structure:

```python
box_obj = {
    'object': str,
    'x': float,
    'y': float,
    'width': float,
    'height': float,
    'score': float,
}
```

Fields:

- `object`: The class name of the detected object (e.g., "car", "person").  
- `x`: The x-coordinate of the top-left corner of the bounding box.
- `y`: The y-coordinate of the top-left corner of the bounding box.  
- `width`: The width of the bounding box.
- `height`: The height of the bounding box.  
- `score`: The model's confidence score for the prediction (range: 0 to 1).  

### Polygon Object

The `polygon_obj` represents a detected object in the form of a polygon. Each polygon is defined by a list of vertices (x and y coordinates) and a confidence score.

Structure:

```python
polygon_obj = {
    'object': str,
    'x': list,
    'y': list,
    'score': float,
}
```

Fields:

- `object`: The class name of the detected object (e.g., "car", "person").  
- `x`: A list of x-coordinates for the vertices of the polygon.
- `y`: A list of y-coordinates for the vertices of the polygon.  
- `score`: The model's confidence score for the prediction (range: 0 to 1).  

### Upload to Label Studio

Once `label_obj` is populated with the model's prediction results, use the **update_results** function defined in the pipeline base class to transfer prediction data to Label Studio. Here is the example:

```python

self.update_results('outputs', label_obj, sub_key='labels')

```

## Pipeline Base Class

The pipeline base class, defined in the **pipeline_base.py**, serves as a base class to help developers quickly implementing the required functions in the pipeline class. This base class typically does **not** require modification and includes the following major functions:

1. **def \_\_init\_\_(self, `**kwargs`) -> None:**  
This function initializes two class variables:
    - `self.models`: a dictionary containing model names as keys and their corresponding models as values.
    - `self.results`: a results dictionary to be returned by the **predict** function in the pipeline class.
2. **def init_results(self) -> None:**  
This function initializes a `self.results` variable and fulfills the requirements in the [Pipeline Result Dictionary](#pipeline-result-dictionary) section.
3. **def track_exception(cls, logger=logging.getLogger(\_\_name\_\_)):**  
This function is a decorator for tracking exceptions and sending error messages to GoFactory for debugging. It's recommended to apply this decorator for **every** required function in the pipeline class.
4. **def clean_up(self, configs: dict) -> None:**  
This function deletes the models from memory.
5. **def update_results(self, key:str, value, sub_key=None, to_factory=False, to_automation=False, overwrite=False):**  
This function updates the `self.results` variable based on predefined rules. For detailed information, refer to the function's docstring.

## Pipeline Inputs

The `inputs` argument of the required **predict** function is a dictionary. It includes an `image` key for data from a single 2D camera imaging system and a `surface` key for data from a single Gocator imaging system. Occasionally, it may also include a `measurement` key for Gocator tool outputs.  
Below is an example of inputs of a two-sensor imaging system (one 2D camera and one Gocator):

```python
inputs = {
    # 2D RGB image
    'image':{
        'pixels': numpy,
    },
    # Gocator 3D data
    'surface':{
        'profile': numpy,
        'resolution': list,
        'offset': list,
    },
    # Gocator tool outputs
    'measurement':{
        'data': dict,
    }
}
```

## Pipeline Result Dictionary

The pipeline's **predict** function returns a dictionary following this structure:

```python
{
    # Required 
    "outputs": {
        "annotated": numpy
    },
    "automation_keys": list,
    "factory_keys": list,
    "tags":list,
    "should_archive":bool,

    # Custom
    "key1": VALUE,
    "key2": VALUE,
    "key3": VALUE,
}

```

The key-value pairs in the dictionary must contain literals or lists. No other object types are allowed. The key-value pairs are grouped into two categories: **Required** and **Custom**.

For the **Required** key-value pairs,  

- The `outputs` value is a dictionary that must include an `annotated` key, with its corresponding value being a NumPy array or None. It may also contain additional key-value pairs.
- The `automation_keys` value is a list of strings, which are a subset of **Custom** keys. These keys are sent to the automation service to interact with automation devices, such as PLCs.
- The `factory_keys` value is a list of strings, which are a subset of **Custom** keys consumed by GoFactory. These keys should represent values that are genuinely useful in GoFactory and do not unnecessarily inflate the database size. The values in `factory_keys` populate Grafana dashboards and appear when hovering over a thumbnail on the inspections page.
- The `tags` value should be a list of strings. These tags appear at the top of an event column on the inspections page and can be used to filter results. Ensure `factory_keys` includes `tags` so that this information is also sent to GoFactory.
- The `should_archive` value is a boolean indicating whether to archive the current input. Archiving an image instructs the data manager to move the image from inline storage to offline storage, where it is retained for a longer period.

For the **Custom** key-value pairs, some keys will be used as values for the **Required** keys. The remaining pairs will be saved directly to the database.

Here is an example:  
The result dictionary is stored in a Postgres database:

```python

{
    "outputs": {
        "annotated": np_array,
        "ad_preprocessed": preprocessed_ad,
        "od_preprocessed": preprocessed_od
    },
    "automation_keys": [ "decision", "center_point"],
    "factory_keys":  ["tags", "decision", "score", "total_proc_time"],
    "tags": ["round", "square"], 
    "should_archive": False,

    "decision": ["round", "square"],
    "score": [.98, .95],
    "center_point": [12.5, 5.9],
    "model_proc_time": 85,
    "image_handling_time": 15,
    "total_proc_time": 100,
} 
```

What get sent to automation:

```python
{
    "decision": ["round", "square"],
    "center_point": [12.5, 5.9],
}
```

What get consumed by GoFactory:

```python
{
    "tags": ["round", "square"],
    "decision": ["round", "square"],
    "score": [.98, .95],
    "total_proc_time": 100,
}
```
