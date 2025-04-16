# CHANGE PARENT IMAGE TO MEET MODEL NEEDS
FROM python:3.12.10-bullseye

# Argument definition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

WORKDIR /home/gadget

# install dependecies
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt

RUN python3 -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER
