FROM nvcr.io/nvidia/tensorrt:25.04-py3
ARG DEBIAN_FRONTEND=noninteractive
ARG PACKAGE_VER
ARG PYPI_SERVER

# Install dependencies
RUN apt-get update && apt-get install libgl1 -y
RUN pip install torch==2.9.0 torchvision==0.24.0 --index-url https://download.pytorch.org/whl/cu129

WORKDIR /home/gadget

# Install detectron2
RUN git clone https://github.com/facebookresearch/detectron2 detectron2
RUN pip install --no-build-isolation -e detectron2
RUN pip install scikit-learn tensorboard numba cuda-python==12.9.0

# Install fixed version of numpy
RUN pip install 'numpy<2' 'ultralytics<8.4' albumentations onnx

# Installing from anomalib src
RUN pip install anomalib==1.1.1 && anomalib install --option core

# clone LMI AI Solutions repository
RUN git clone -b v1.5.2 https://github.com/lmitechnologies/LMI_AI_Solutions.git
RUN cd LMI_AI_Solutions && git submodule update --init object_detectors/submodules/yolov5
RUN cd LMI_AI_Solutions && pip3 install -e object_detectors && pip3 install -e anomaly_detectors && \
    pip3 install -e lmi_utils && pip3 install -e classifiers

RUN python -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER
CMD ["python", "-m", "gadget_pipeline_server"]
