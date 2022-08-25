ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} python:3.8.12-buster

# Argument defition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

RUN python3 -m pip install --upgrade pip setuptools

# create the necessary directories
RUN mkdir /mnt/ramdisk

# update the user's path
#ENV PATH="/home/gadget/.local/bin:${PATH}"

COPY ./automation_requirements.txt /data/requirements.txt
WORKDIR /data
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

WORKDIR /home/gadget

RUN mkdir /home/gadget/automation

RUN python3 -m pip install gadget_automation_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER
