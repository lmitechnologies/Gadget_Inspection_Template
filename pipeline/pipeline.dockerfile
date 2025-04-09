FROM nvcr.io/nvidia/pytorch:23.04-py3

ARG PACKAGE_VER
ARG PYPI_SERVER

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install libgl1 -y
RUN pip install --upgrade pip setuptools wheel
RUN pip install pycuda
RUN pip install opencv-python==4.6.0.66 --user 
RUN pip install ultralytics==8.3.22
RUN pip install openvino-dev==2023.0.0 openvino-telemetry==2022.3.0 nncf==2.4.0
RUN pip install nvidia-pyindex onnx-graphsurgeon

WORKDIR /home/gadget/workspace
RUN git clone -b ais https://github.com/lmitechnologies/LMI_AI_Solutions.git && cd LMI_AI_Solutions/anomaly_detectors && git submodule update --init submodules/anomalib
RUN cd LMI_AI_Solutions/anomaly_detectors/submodules/anomalib && pip install -e .
RUN pip install scikit-guess

RUN pip install scikit-learn

RUN pip install gadget_pipeline_adapter==$PACKAGE_VER --extra-index-url $PYPI_SERVER

# Suppress interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive 
RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
# Update and install required dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.8 python3.8-venv python3.8-distutils \
    python3.12 python3.12-venv \
    curl git libgl1 software-properties-common && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12

RUN python3.12 -m pip install --no-cache-dir --upgrade pip setuptools wheel

ARG CACHEBUST=1

RUN python3.12 -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER

CMD ["python3.12", "-m", "gadget_pipeline_server"]