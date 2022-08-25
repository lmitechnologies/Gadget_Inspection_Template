ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} python:3.8.12-buster
ARG DOCKER_PLATFORM
ARG PACKAGE_VER
ARG PYPI_SERVER
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBUG=0
WORKDIR /gadgetapp
COPY requirements.txt /gadgetapp/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# modify package ver and pypi server to use the env var (1.0.54 and pypi server ip address)
RUN pip install gadget_api_configs==$PACKAGE_VER --extra-index-url $PYPI_SERVER
RUN pip install gadget_api_inspection_events==$PACKAGE_VER --extra-index-url $PYPI_SERVER 
RUN pip install gadget_api_runtime==$PACKAGE_VER --extra-index-url $PYPI_SERVER 

COPY . /gadgetapp/