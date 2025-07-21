FROM nvcr.io/nvidia/pytorch:24.04-py3
ARG DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install libgl1 -y
RUN pip install --upgrade pip
RUN pip install --user opencv-python
RUN pip install ultralytics

WORKDIR /home/gadget

# Install detectron2
RUN pip install --user 'git+https://github.com/facebookresearch/fvcore'
RUN git clone https://github.com/facebookresearch/detectron2 detectron2
RUN pip install --user -e detectron2 
RUN pip install tensorboard
RUN pip install numba
RUN pip install albumentations

# Installing from anomalib src
RUN git clone -b v1.1.1 https://github.com/openvinotoolkit/anomalib.git && cd anomalib && pip install -e .
RUN anomalib install --option core

# clone LMI AI Solutions repository
RUN git clone -b faie-2041 https://github.com/lmitechnologies/LMI_AI_Solutions.git
RUN cd LMI_AI_Solutions && git submodule update --init object_detectors/submodules/yolov5
RUN cd LMI_AI_Solutions && git pull
RUN cd LMI_AI_Solutions && pip3 install -e object_detectors && pip3 install -e anomaly_detectors && pip3 install -e lmi_utils
