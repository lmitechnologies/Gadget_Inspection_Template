# jetpack 4.5
ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} python:3.6.12-buster

# Argument defition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

WORKDIR /home/gadget/workspace

# install dependecies
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt


RUN python3 -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER
