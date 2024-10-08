# Gadget Pipeline
This is a pipeline template for AI models deployment on LMI runtime platform - **Gadget**.

## Top-level Folder Strcuture
The pipeline folder consists of the followings:  
    .  
    ├── models  
    ├── test  
    ├── pipeline_def.json  
    ├── pipeline_class.py  
    ├── pipeline.env  
    ├── pipeline.dockerfile  
    ├── requirements.txt  
    ├── sample_pipeline.py  
    ├── utils.py  
    ├── \_\_init\_\_.py  
    └── README.md  

## Folder Contents
**models**: a folder contains the trained models.  
**test**: a folder contains the testing scripts (optional).  
**pipeline_def.json**: it defines the pipeline configurations, such as the paths to the trained models or confidence thresholds of classes. It must has a list named `configs_def`. The elements are dictionaries of key-value pairs and each dictionary must has two keys: `name` and `default_value`. Here is an example:
```json
{
    "configs_def":
    [
        {
            "name": "model_path",
            "default_value": "PATH_TO_THE_TRAINED_MODEL"
        },
        {
            "name": "confidence_defect",
            "default_value": 0.5
        }
    ]
}

```
**pipeline_class.py**: the implementation of the pipeline class. There are several required functions to be implemented. Check the details in the section - [Pipeline API](#pipeline-api).  
**pipeline.env**: the environmental file used by the docker container. Below is the content of the environmental file. `PIPELINE_SERVER_INSTANCE_NUMBER` is the instance index of the pipeline (default to 0). `PIPELINE_SERVER_SETTINGS_GADGET_DATA_BROKER_SUB_TOPICS` is the subscriber topic. It currently subscribes to the gocator sensor. Modify it if other type of sensors is used. `PIPELINE_SERVER_SETTINGS_MODELS_ROOT` is the path to the trained models.

```bash
# these settings are usually changed according to your application
PIPELINE_SERVER_SERVICE_NAME=pipeline
PIPELINE_SERVER_SETTINGS_GADGET_DATA_BROKER_SUB_TOPICS=sensor/profiler
PIPELINE_SERVER_SETTINGS_MODELS_ROOT=/home/gadget/workspace/pipeline/models
# the following settings shouldn't be changed often
PIPELINE_SERVER_SERVICE_TYPE=pipeline
PIPELINE_SERVER_SETTINGS_DATA_STORAGE_ROOT=/app/data/inline
PIPELINE_SERVER_SETTINGS_GADGET_DATABASE_API_HOST=api-gateway
PIPELINE_SERVER_SETTINGS_GADGET_DATABASE_API_PORT=8080
PIPELINE_SERVER_SETTINGS_GADGET_DATA_BROKER_HOST=127.0.0.1
PIPELINE_SERVER_SETTINGS_PIPELINE_PATH=/home/gadget/workspace/pipeline
PIPELINE_SERVER_SETTINGS_PIPELINE_CLASS=pipeline_class.ModelPipeline
PIPELINE_SERVER_SETTINGS_PIPELINE_DEFINITION_JSON=pipeline_def.json
TZ=utc
```

**pipeline.dockerfile**: the dockerfile defines the pipeline container.
**requirements.txt**: it defines what python libraries will be installed in the docker container.  
**sample_pipeline.py**: the example pipeline class, where it loads two models, and makes prediction using all models.  
**utils.py**: it defines all the utility functions that will be used in the **pipeline_class.py**.  

## Pipeline API

The gadget pipeline is the class to load the configurations (confidence levels, trained AI models paths, class map, etc.), load and warm up the models, make predictions, and clean up the models. 
To complete these taks, below are the required methods to be implemented:

1. **def \_\_init\_\_(self, `**kwargs`) -> None:**  
    This is the function to load and initialize the pipeline class configurations, where `kwargs` are keyword arguments and it contains the key-value pairs that are defined in the **pipeline_def.json**.
2. **def load(self, `configs`: dict) -> None:**  
    This function receives `configs` and loads the models.
3. **def warm_up(self, `configs`: dict) -> None:**  
    This function receives `configs` and runs the models the first time.
4. **def predict(self, `configs`: dict, `inputs`: dict) -> dict:**  
    This function receives the `inputs` and `configs`, make predictions, add annotations to the image, and returns the annotated image with the model results. This function must return a dictionary. See the details in section - [Pipeline Result Dictionary](#pipeline-result-dictionary).  
    Besides, It would be helpful for developers to define a unit test in the main function. Refer to the main function in the **sample_pipeline.py**. 
5. **def clean_up(self, `configs`: dict):**  
    This function receives `configs` and deletes the models from memory.

## Pipeline Result Dictionary

The pipeline predict method will return a dictionary that follows this pattern:  

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
    "key-1": VALUE,
    "key-2": VALUE,
    "key-3": VALUE,
}

```

The key-value pairs in the dictionary must contain a literal or a list. No other object is allowed. The key-value pairs are grouped into two categories: **Required** and **Custom**.

For the **Required** key-value pairs, the value of `annotated_output` is a numpy array of the annotated image. The value of `automation_keys` is a list of strings that are a subset of **Custom** keys that will be sent to the automation service. They should be information that is specifically needed by the automation service. The value of `factory_keys` is a list of strings that are a subset of **Custom** keys that will be consumed by GoFactory. They should be values that are actually useful in GoFactory and will not overly inflate the size of the database. The values in factory_keys are what populate the Grafana dashboards and appear when you over over an thumbnail in the inspections page. The values in tags appear at the top of an event column in the inspections page. They can be used to filter what results get shown. The value of `tags` should be a list of strings. `factory_keys` should also include `tags` so that information is also sent to GoFactory.

![Alt text](./markdown_images/image.png "Optional title")

The value of `should_archive` is a boolean indicating whether to archive current input. Archiving an image means telling the data manager to move the image from inline storage to offline storage. Images in offline storage are kept around for much longer.

For the **Custom** key-value pairs, the keys of some pairs will be used as the values of the **Required** keys as mentioned in the previous paragraph. The rest of pairs will be saved to the database.  

Here is an example:  
Pipeline predict result and stored in Postgres database:

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
