# last version running on ubuntu 20.04, require CUDA 12.1 
FROM nvcr.io/nvidia/pytorch:23.04-py3
ARG DEBIAN_FRONTEND=noninteractive

WORKDIR /home/gadget/workspace

# Install dependencies
RUN apt-get update && apt-get install libgl1 -y
RUN pip install --upgrade pip setuptools wheel
RUN pip install --user opencv-python
RUN pip install ultralytics -U

# clone LMI AI Solutions repository
RUN git clone https://github.com/lmitechnologies/LMI_AI_Solutions.git
