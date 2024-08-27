FROM nvcr.io/nvidia/pytorch:23.04-py3

# Argument defition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

RUN apt-get update
RUN apt-get install python3 python3-pip -y
RUN apt-get install git libgl1 -y
WORKDIR /home/gadget/workspace

RUN pip install pycuda
RUN pip install opencv-python -U --user 

RUN pip install openvino-dev==2023.0.0 openvino-telemetry==2022.3.0 nncf==2.4.0
RUN pip install nvidia-pyindex onnx-graphsurgeon
RUN pip install tabulate
RUN pip install albumentations

# Installing from anomalib src requires latest pip 
RUN python3 -m pip install --upgrade pip


RUN git clone -b ais https://github.com/lmitechnologies/LMI_AI_Solutions.git && cd LMI_AI_Solutions/anomaly_detectors && git submodule update --init submodules/anomalib
RUN cd LMI_AI_Solutions/anomaly_detectors/submodules/anomalib && pip install -e .

RUN cd LMI_AI_Solutions/object_detectors && \
    git submodule update --init submodules/yolov5

RUN cd LMI_AI_Solutions && git pull
RUN pip install numpy==1.23.1
ARG CACHEBUST=1

RUN python3 -m pip install gadget_pipeline_server==$PACKAGE_VER   --extra-index-url $PYPI_SERVER

CMD gadget_pipeline_server
