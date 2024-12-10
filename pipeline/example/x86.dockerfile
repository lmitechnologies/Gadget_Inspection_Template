FROM nvcr.io/nvidia/pytorch:24.04-py3
ARG DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install libgl1 -y
RUN pip install --upgrade pip setuptools wheel
RUN pip install --user opencv-python
RUN pip install ultralytics -U

WORKDIR /home/gadget

# clone LMI AI Solutions repository
RUN git clone https://github.com/lmitechnologies/LMI_AI_Solutions.git
