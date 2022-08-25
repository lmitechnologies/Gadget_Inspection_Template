# jetpack 4.5
FROM --platform=linux/arm64/v8 nvcr.io/nvidia/l4t-ml:r32.5.0-py3

# Argument defition corresponding to Docker Compose
ARG PACKAGE_VER
ARG PYPI_SERVER

# create the necessary directories
RUN mkdir /mnt/ramdisk

# update the user's path
#ENV PATH="/home/gadget/.local/bin:${PATH}"

# install tensorflow 2.5
RUN apt-get update
RUN apt-get install libhdf5-serial-dev hdf5-tools libhdf5-dev zlib1g-dev zip libjpeg8-dev liblapack-dev libblas-dev gfortran -y
RUN apt-get install python3-pip -y
RUN pip3 install -U pip testresources setuptools==49.6.0 
RUN pip3 install -U --no-deps numpy==1.19.4 future==0.18.2 mock==3.0.5 keras_preprocessing==1.1.2 keras_applications==1.0.8 gast==0.4.0 protobuf pybind11 cython pkgconfig packaging 
RUN pip3 install -U h5py==2.10.0
RUN pip3 install --pre --extra-index-url https://developer.download.nvidia.com/compute/redist/jp/v45 tensorflow==2.5.0

WORKDIR /home/gadget/pipeline

# install tensorflow-addon
COPY ./pipeline/tensorflow_addons-0.14.0-cp36-cp36m-linux_aarch64.whl .
RUN pip3 install tensorflow_addons-0.14.0-cp36-cp36m-linux_aarch64.whl

# install dependecies
COPY ./pipeline/requirements.txt .
RUN pip3 install -r requirements.txt


#RUN python3 -m pip install gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER
