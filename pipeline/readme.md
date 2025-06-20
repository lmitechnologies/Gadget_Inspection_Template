# Gadget Pipeline

This pipeline template is designed for deploying AI models on the LMI runtime platform - **Gadget**. It also provides a step-by-step guide to help developers get started.

## Getting Started

1. Read this document.
2. Learn the pipeline examples in the **example** folder.
3. Define the **Dockerfile** for your pipeline.
4. Populate the **pipeline_def.json** with the necessary configurations.
5. Follow the [how-to tutorial](https://github.com/lmitechnologies/Gadget_Inspection_Template/blob/main/pipeline/how-to.md) to implement the required functions for the pipeline class and implement a unit test in the `main` function within **pipeline_class.py**.
7. Run and validate the unit test.

## Top-level Folder Strcuture

The pipeline folder consists of the following:  

```plaintext
.  
├── how_to_guide.md  
├── example  
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

**how_to_guide.md**: a guide showing how to populate the **pipeline_class.py** from scratch.  
**example**: a folder of examples that illustrate the implementation of pipeline classes for performing inspection tasks using varying AI models including object detection, instance segmentation, keypoint detection, classification and anomaly detection.  
**trt-engines**: a folder containing the generated TensorRT engines, created from the models in the **trt-generation** folder. These engines are intended for deployment to production edge devices, such as GoMax.  
**trt-generation**: a folder containing model weights and additional files required for generating TensorRT engines.  
**pipeline_base.py**: the pipeline base class, which typically does **not** require modification.  
**pipeline_class.py**: the implementation of the pipeline class. Several required functions must be implemented.  
**pipeline_def.json**: this file defines the pipeline configurations, such as paths to trained models or confidence thresholds for classes. It must include a `configs_def` and `model_roles` keys. `model_roles` is a list of model role strings. Check more details in the [model role](#model-roles) section. `configs_def` is a list where each element is a dictionary containing two required keys: `name` and `default_value`. The value of `default_value` must be of a JSON-serializable type. Check one example at the [how-to tutorial](https://github.com/lmitechnologies/Gadget_Inspection_Template/blob/main/pipeline/how-to.md).  
**pipeline.dockerfile**: the Dockerfile that defines the pipeline container.  
**requirements.txt**: this file specifies the Python libraries to be installed in the Docker container.  

## Pipeline Class API

The Gadget pipeline class, to be implemented in the **pipeline_class.py**, is responsible for loading configurations (e.g., confidence thresholds, paths to trained AI models, model hyperparameters, etc.), loading and warming up models, making predictions, and cleaning up models. The pipeline class inherits from the base class defined in the **pipeline_base.py** to simplify implementation.   
To complete these tasks listed above, the following functions must be implemented in the pipeline class:

1. **def \_\_init\_\_(self, `**kwargs`) -> None:**  
    This function initializes the pipeline class. The `kwargs` argument contains the key-value pairs defined in the **pipeline_def.json**.
2. **def load(self, `model_roles`: dict, `configs`: dict) -> None:**  
    This function loads the models and stores them in the `self.models` variable defined in the base class. The `configs` argument contains runtime key-value pairs, where the keys match those in the **pipeline_def.json** and the values may differ. 
3. **def warm_up(self, `model_roles`: dict, `configs`: dict) -> None:**  
    This function receives the `configs` and runs the models for the first time using dummy inputs.
4. **def predict(self, `configs`: dict, `inputs`: dict) -> dict:**  
    This function receives the `inputs` and `configs`, makes predictions, adds annotations to the image, and returns the annotated image along with the model results. Refer to the [Pipeline Inputs](#pipeline-inputs) section for the details of `inputs`. This function must return a `self.results` dictionary defined in the base class.  

This required function has implemented in the base class:

- **def clean_up(self, `configs`: dict):**  
This function receives `configs` and deletes the models from memory.

Additionally, it is recommended that developers define a unit test in the main function within the pipeline class. Refer to the main function of **pipeline_class.py** in the **example** folder for guidance.

## Model Roles
A model role is a part of the inspection process that is associated with a AI model. A single inspection might consist of multiple model roles: an anomaly detector and an object detector. Model roles are defined in GoFactory and are associated with a pipeline in the pipeline_def.json using the **model_roles** key. The key's value must be a list of strings. 

The model_roles dictionary that is passed to the load and warm_up methods is generated using the models selected using the GadgetApp's Model Manager page and the model roles defined for the pipeline. The dictionary is structured like this:

```python
{
    'model_role':{
        "model_type": str,
        "model_path": str,
        "package": str,
        "algorithm": str,
        "image_size": [int, int], # Hight x Width
    }
}

```

The LMI_AI_Solutions repo provides wrappers for several of the most popular model architectures. Those wrappers are designed to consume the model_role dictionary when initialized. 

## Upload Predictions to Label Studio

The Gadget supports uploading model prediction results to [Label Studio](https://labelstud.io) for human labeling enabling dataset expansion and model performance improvement. 

Use the **add_prediction** function defined in the pipeline base class to add prediction data to Label Studio. Here is the example:

```python
# assume that a model returns the following:
box = [100,150,450,400] 
polygon = [[10,3],[11,4],[14,6],[20,9]]
score = 0.95
name = 'people'
h,w = 1024,1204 # height and width of the input image

# add both to label studio
self.add_prediction('boxes',box,score,name,h,w)
self.add_prediction('polygons',polygon,score,name,h,w)
```


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

## Pipeline Outputs - Result Dictionary

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

## Configuring a dockerfile

The pipeline class is run by the **Pipeline Server** which is a python project made of up two whls. 

- gadget_pipeline_server
- gadget_pipeline_adapter

**gadget_pipeline_server** can only run in Python 3.12 but **gadget_pipeline_adapter** can run in any Python 3 version. For standard single python version pipelines the Pipeline Adapter is installed along side the Pipeline Server so there is no noticeable difference to the dockerfile setup. To support multiple versions of python, use python deadsnakes to install the python versions and install the Pipeline Adapter into the new version.

To tell the pipeline server to use a separate python version it must be specified using the ADAPTER_PYTHON_PROCESS env variable. Give it the path to the desired python interpreter. 

````
ADAPTER_PYTHON_PROCESS=/usr/bin/python3.10
````
If left blank it will default to use the same python instance the Pipeline Server is running in.

### Model conversion

To run model conversion **gadget_conversion_utils** must be installed in the same python version as **gadget_pipeline_adapter**. 

To configure the pipeline server to handle conversion requests use the env variable

```
MODEL_CONVERTER=true
```
It defaults to false