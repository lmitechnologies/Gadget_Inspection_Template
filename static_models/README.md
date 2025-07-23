# Static Models

A static model is a model that permanently lives on the Gadget host. It did not come from GoFactory and it can't be deleted by the model manager. 

This directory must contain a `manifest.json` file that contains the definitions for each static model and all the model artifacts. 

## Attaching to containers

The static models directory must be mounted to the model manager and all pipelines. The default mount location for the model manager is `/app/models/static`. That can be updated using the `STATIC_MODEL_ROOT` environment variable.

For the pipelines, it must be mounted to a location that is relative to where the models volume is mounted. It needs to be mounted at `${MODELS_VOLUME}/static`. The default models volume location `/app/models`, so the static models directory should be mounted at `/app/models/static` by default.

## Manifest

The static models manifest must be defined in a file called `manifest.json`. The manifest must be a list of objects. There must be an object defined for each static model. The object must include **model_role**, **model_type**, **model_name**, **model_version**, and **details**. The value of model_role, model_type, model_name, and model_version must be strings.  The value of details must be an object that includes **model_path** and **image_size**. Model_path is the path to the model artifact relative to the base of the static models directory. Image_size is an array [height, width]. If any of those fields are missing that static model will not be available. 

It's recommended that other information is added to the details object so that the model can work with the helper functions in the LMI AIS repo. Some examples of helpful additional information are `trainingPackage`, `trainingAlgorithm`, `thresholdMin`, `thresholdMax`, and `confidenceThreshold`. 

Example:

```

{

    "model_role": "foreground-od",
    "model_type": "ObjectDetection",
    "model_name": "Default",
    "model_version": "Default",
    "details": {
        "model_path": "./model.pt",
        "imageSize": [
            384,
            384
        ],
        "trainingPackage": "Ultralytics8",
        "trainingAlgorithm": "Yolo",
        "confidenceThreshold": 0.67
    }
}

```


## Default models

If a static model has the model_name and model_version `Default` it will be treated as the default model for that model role. If no model has been selected for a pipeline on startup it will default to loading that model. If there are more than one default models defined for the same model role the behavior is undetermined.