# FROM postgres:latest
FROM python:3.8.12-buster
ARG PACKAGE_VER
ARG PYPI_SERVER
WORKDIR /app
COPY ./offline_test/requirements.txt /app/requirements.txt
COPY ./offline_test/offline_test_django.py /app/offline_test_django.py
COPY ./offline_test/test_images /app/test_images
COPY ./gadgetapp/settings.py /app/gadgetapp/settings.py
COPY ./inspection/models.py /app/inspection/models.py
COPY ./inspection/apps.py /app/inspection/apps.py
# RUN apt-get update && apt-get install -y python3 python3-pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install gadget_api_configs==$PACKAGE_VER --extra-index-url $PYPI_SERVER
RUN pip install gadget_api_inspection_events==$PACKAGE_VER --extra-index-url $PYPI_SERVER 
RUN pip install gadget_api_runtime==$PACKAGE_VER --extra-index-url $PYPI_SERVER 

