# Gadget Pipeline
This is a pipeline template for AI models deployment on LMI runtime platform named Gadget.

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
    └── README.md  

## Contents
models: a folder contains the models  
test: a folder contains the testing scripts  
pipeline_def.json: it saves the pipeline configurations. It must has a list named `configs_def`. Each additional configuration item is a key-value pair, where it must have two keys: `name` and `default_value`. Here is an example:
```json
{
    "configs_def":
    [
        {
            "name": "model_1_path",
            "default_value": "PATH_TO_THE_TRAINED_MODEL"
        },
        {
            "name": "confidence_defect",
            "default_value": 0.5
        }
    ]
}

```
pipeline_class.py: the 


## Pipeline API
The gadget pipeline is the class to load the configurations (confidence levels, trained AI models paths, class map, etc.), load and warm up the models, make predictions, and clean up the models. 
To complete these taks, there are several required methods to be implemented:
1. **def \_\_init\_\_(self, \*\*kwargs) -> None:**  
    This is the function to load and initialize the configurations.
2. **def load(self) -> None:**  
    This function loads the models.
3. **def warm_up(self) -> None:**  
    This function run the models the first time.
4. **def predict(self, input_image: str, configs: dict, results_storage_path: str) -> dict:**  
    This function loads the `input_image` and `configs`, make predictions, make annotations to the `input_image`, save the annotated image to the `results_storage_path`.
5. **def clean_up(self):**  
    This function deletes the models from memory.

