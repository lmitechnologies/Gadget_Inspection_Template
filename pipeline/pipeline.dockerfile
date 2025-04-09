# CHANGE PARENT IMAGE TO MEET MODEL NEEDS
ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} python:3.8.12-buster

# Argument definition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

WORKDIR /home/gadget

# install dependecies
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt
RUN pip install torch


RUN python3 -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER
