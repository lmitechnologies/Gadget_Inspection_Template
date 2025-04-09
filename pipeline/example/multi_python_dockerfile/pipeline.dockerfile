ARG DOCKER_PLATFORM=${DOCKER_PLATFORM}
FROM --platform=${DOCKER_PLATFORM} ubuntu:20.04

# Arguments for package version and PyPI server
ARG PACKAGE_VER
ARG PYPI_SERVER

# Suppress interactive prompts during installation
ENV DEBIAN_FRONTEND=noninteractive 

RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa

# Update and install required dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3.12 python3.12-venv \
    python3.10 python3.10-venv python3.10-distutils \
    curl git libgl1 software-properties-common && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install pip manually for Python 3.10
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

# Install pip manually for Python 3.12
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12

# Upgrade setuptools and wheel for Python 3.10
RUN python3.10 -m pip install --no-cache-dir --upgrade pip setuptools wheel

# Upgrade setuptools and wheel for Python 3.12
RUN python3.12 -m pip install --no-cache-dir --upgrade pip setuptools wheel

# Set working directory
WORKDIR /home/gadget/workspace

# Install gadget_pipeline_adapter in Python 3.10
RUN python3.10 -m pip install gadget_pipeline_adapter==$PACKAGE_VER --extra-index-url $PYPI_SERVER

# Install gadget_pipeline_server in Python 3.12
RUN python3.12 -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER

# Set the default Python to 3.12 and ensure gadget_pipeline_server is used as the entry point
CMD ["python3.12", "-m", "gadget_pipeline_server"]
