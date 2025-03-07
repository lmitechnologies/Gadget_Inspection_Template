# Examples

This folder contains pipeline examples using different types of AI models for varying tasks including object detection, instance segmentation, key point detection, anomaly detection, and classification.

## Top Level Folder Structure

```plaintext
.  
├── anomaly_detection  
├── classification
├── object_detection 
└── x86.dockerfile  
```

## Folder Content

**anomaly_detection:** contain examples of using anomaly detection models in the pipeline.  
**classification:** contain examples of using classification models in the pipeline.  
**object_detection:** contain examples of using object detection models, including object detection, instance segmentation and key point detection in the pipeline.  
**x86.dockerfile:** the example Dockerfile that defines the necessary dependencies for the environment.

## Run Example Pipelines

We provide docker-compose.yaml files for runing example pipelines in each of the **anomaly_detection**, **classification** and **object_detection** folders.

Here is an example:

```yaml
services:
  example_pipeline_anomlib:
    build: 
      context: .
      dockerfile: ../../x86.dockerfile
    volumes:
      - PATH_TO_DATA:/home/gadget/data/
      - PATH_TO_MODEL:/home/gadget/pipeline/trt-engines/
      - ./outputs:/home/gadget/outputs/
      - ./pipeline_class.py:/home/gadget/pipeline/pipeline_class.py
      - ./pipeline_def.json:/home/gadget/pipeline/pipeline_def.json
      - ../../../pipeline_base.py:/home/gadget/pipeline/pipeline_base.py
    ipc: host
    runtime: nvidia # https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
    command: python3 pipeline/pipeline_class.py
```

Ensure that `PATH_TO_DATA` and `PATH_TO_MODEL` point to the correct paths for the data folder containing test images, and the model weights file respectively.  
Run this command:

```bash
docker compose build --no-cache
docker compose up
```

## LMI AI Solutions Repository

All examples utilize model definitions and utility functions from the [LMI AI Solutions Repository](https://github.com/lmitechnologies/LMI_AI_Solutions).
