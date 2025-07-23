# Automated AD Config

Model roles that are included in automated ad should be defined in a json file. 


The file must be mounted into the model manager container. The default mount location is `/app/automated_ad_config.json` but that can be changed using the environment variable `AUTOMATED_AD_CONFIGURATION`.

The config file must be a list of objects. The objects must include `model_role`, `sources`, and `configs`.

- **model_role**: Model role as defined in GoFactory. If the model role doesn't exist in GoFactory it won't do anything.

- **sources**: Which images to use during training. Value must be a list of objects. The objects must include a `topic` and `output_file`. The topic is a zmq topic and output_file is the is the name of the file to use.

- **configs**: An object that includes all the configuration for the automated ad training. Config options are:
    - **min_dataset_size**: Number of images needed to start first training iteration
    - **dataset_increment**: Number of additional images needed before starting the next training iterations
    - **max_iterations**: Maximum number of training iterations allowed
    - **divergence_threshold**: Threshold used to determine when to stop training. (0-1)

## Example

```

[
    {
        "model_role": "role_one",
        "sources": [
            {
                "topic": "sensor/profiler",
                "output_file": "image"
            }
        ],
        "configs": {
            "min_dataset_size": 50,
            "dataset_increment": 20,
            "max_iterations": 10,
            "divergence_threshold": 0.9
        }
    },
    {
        "model_role": "role_two",
        "sources": [
            {
                "topic": "pipeline/pipeline",
                "output_file": "foreground"
            }
        ],
        "configs": {
            "min_dataset_size": 100,
            "dataset_increment": 50,
            "max_iterations": 5,
            "divergence_threshold": 0.75
        }
    }
]
```