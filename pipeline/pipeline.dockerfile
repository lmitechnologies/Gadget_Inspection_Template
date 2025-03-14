FROM python:3.12.9

# Argument defition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

RUN apt-get update
WORKDIR /home/gadget/workspace

ARG CACHEBUST=1

RUN python3 -m pip install gadget_pipeline_server==$PACKAGE_VER   --extra-index-url $PYPI_SERVER

CMD gadget_pipeline_server
