# Static Models

A static model is a model that permanently lives on the Gadget host. It did not come from GoFactory and it can't be deleted by the model manager. 

This directory must contain a `manifest.json` file that contains the definitions for each static model and all the model artifacts. 

## Attaching to containers

The static models directory must be mounted to the model manager and all pipelines. The default mount location for the model manager is `/app/models/static`. That can be updated using the `STATIC_MODEL_ROOT` environment variable.

For the pipelines, it must be mounted to a location that is relative to where the models volume is mounted. It needs to be mounted at `${MODELS_VOLUME}/static`. The default models volume location `/app/models`, so the static models directory should be mounted at `/app/models/static` by default.

## Manifest

The static models manifest must be defined in a file called `manifest.json`. The manifest must be a list of objects. There must be an object defined for each static model. The object must include **model_role**, **model_type**, **model_name**, **model_version**, **artifacts**, and **details**. The value of model_role, model_type, model_name, and model_version must be strings.  

**artifacts** is a dict containing the definition of the model artifacts. It should include a top level identifier, pt or trt, and then **model_path** and **image_size**. Model_path is the path to the model artifact relative to the base of the static models directory. Image_size is an array [height, width]. If any of those fields are missing that static model will not be available. 

It's recommended that other information is added to the details object so that the model can work with the helper functions in the LMI AIS repo. Some examples of helpful additional information are `training_package`, `training_algorithm`, `threshold_min`, `threshold_max`, `confidence_threshold`, `object_class`, `iou`, `object_size`, and `global_preprocessing`. These values should match the equivalent values in the GoFactory model manifest and if they do not the model may fail to load. 

Od Example:

```
{
    "model_role": "foreground-od",
    "model_type": "ObjectDetection",
    "model_name": "Default",
    "model_version": "Default",
    "artifacts": {
        "pt": {
            "model_path": "./model.pt",
            "image_size": [
                384,
                384
            ]
        }
    }
    "details": {
        "training_package": "Ultralytics8",
        "training_algorithm": "Yolo",
        "confidence_threshold": 0.67,
        "object_class": ["object_one", "object_two"],
        "iou": 0.45,
        "object_size": 5,
        "global_preprocessing": []
    }
}
```
Ad example:
```
{
    "model_role": "ad",
    "model_type": "AnomalyDetection",
    "model_name": "Default",
    "model_version": "Default",
    "format": "pt",
    "artifacts": {
        "pt": {
            "model_path": "./model.pt",
            "image_size": [
                224,
                224
            ]
        }
    },
    "details": {
        "training_package": "Anomalib1",
        "training_algorithm": "patchcore",
        "anomaly_size": 5,
        "threshold_max": 25,
        "threshold_min": 20
    }
}
```

Keypoints examples
```
    {
        "model_role": "keypoints",
        "model_type": "KeyPointDetection",
        "model_name": "Default",
        "model_version": "Default",
        "format": "pt",
        "artifacts": {
            "pt": {
                "model_path": "./model.pt",
                "image_size": [
                    480,
                    480
                ]
            }
        },
        "details": {
            "training_package": "Ultralytics",
            "training_algorithm": "Yolo",
            "confidence_threshold": 0.5,
            "object_class": ["object1"],
            "iou": 0.45,
            "object_size": 80,
            "global_preprocessing": []
        }
    }

**global_preprocessing** current supports 

**resize**
```
{
    "type": "resize",
    "configuration": {
        "width": int,
        "height": int,
        "preserveAspect": true/false
    }
}
```
**tile**
```
{
    "type": "tile",
    "configuration": {
        "width": int,
        "height": int,
        "xStride": int,
        "yStride": int
    }
}
```
<!-- **crop-to-label**
```
{
    "type": "crop-to-label",
    "configuration": {
        "label": "ObjectClass"
    }
}
``` -->
## Default models

If a static model has the model_name and model_version `Default` it will be treated as the default model for that model role. If no model has been selected for a pipeline on startup it will default to loading that model. If there are more than one default models defined for the same model role the behavior is undetermined.

## Loading models
Models are loaded based on the pipeline_base in the AIS repo. Model path and image size are read from the artifacts, model type is read directyl from model_type at the top level and the algorithm and package are read from the details. Configs and details are read directly into the metadata under 'configs' and 'details'. In the model manager (gadget/model_manager/gadget_model_manager/model/gadget_model.py) the generate_pipeline_config function converts the configs into a more useable form for the pipeline. The new format looks like:

"models:{
    "objectDetector1":{
        "format":"",
        "configs":{
            "iou":,
            "size":{},
            "to-fail":{},
            "confidence":{}
        },
        "details":{
            "object_size":,
            "object_class":[],
            "training_package":"",
            "training_algorithm":"",
            "confidence_threshold":,
            "global_preprocessing":[]
        },
        "artifacts":{
            "format":{
                "image_size":[],
                "model_path":""
            }
        },
        "model_name":"",
        "model_role":"",
        "model_type":"",
        "model_version":""
    }

    "anomalyDetector1":{
      "format":"pt",
      "configs":{
         "anomaly_size":,
         "threshold_max":,
         "threshold_min":
      },
      "details":{
         "training_package":"",
         "training_algorithm":""
      },
      "artifacts":{
         "format":{
            "image_size":[],
            "model_path":""
         }
      },
      "model_name":"",
      "model_role":"",
      "model_type":"",
      "model_version":""
   }
}
