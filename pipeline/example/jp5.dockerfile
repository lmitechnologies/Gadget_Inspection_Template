# Define base image once
ARG BASE_IMAGE=nvcr.io/nvidia/l4t-ml:r35.2.1-py3

# --- Stage 1: Build Python 3.12 ---
FROM ${BASE_IMAGE} AS python-builder
ARG DEBIAN_FRONTEND=noninteractive

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev wget curl \
    && rm -rf /var/lib/apt/lists/*

# Download and build Python 3.12
RUN wget https://www.python.org/ftp/python/3.12.3/Python-3.12.3.tgz && tar -xf Python-3.12.3.tgz && \
    cd Python-3.12.3 && ./configure --enable-optimizations --prefix=/opt/python3.12 && \
    make -j$(nproc) && make install && cd .. && rm -rf Python-3.12.3 Python-3.12.3.tgz

# --- Stage 2: Final Image ---
FROM ${BASE_IMAGE}
ARG DEBIAN_FRONTEND=noninteractive
ARG PACKAGE_VER
ARG PYPI_SERVER

WORKDIR /home/gadget/workspace

# Copy Python 3.12 from builder stage
COPY --from=python-builder /opt/python3.12 /opt/python3.12

# Create symlinks for Python 3.12
RUN ln -sf /opt/python3.12/bin/python3.12 /usr/local/bin/python3.12 && \
    ln -sf /opt/python3.12/bin/pip3.12 /usr/local/bin/pip3.12

# Set environment for Python 3.8 (scikit-learn fix)
ENV LD_PRELOAD=/usr/local/lib/python3.8/dist-packages/sklearn/__check_build/../../scikit_learn.libs/libgomp-d22c30c5.so.1.0.0

# ============================================
# Python 3.8 Setup (AI/ML Dependencies)
# ============================================

# Upgrade pip
RUN pip3 install --no-cache-dir --upgrade pip

# Download and install PyTorch wheels for Jetpack 5
RUN wget -q https://github.com/lmitechnologies/lmi-ais-assets/releases/download/jp5/torch-2.2.0-cp38-cp38-linux_aarch64.whl && \
    wget -q https://github.com/lmitechnologies/lmi-ais-assets/releases/download/jp5/torchvision-0.17.2+c1d70fe-cp38-cp38-linux_aarch64.whl && \
    pip3 install --no-cache-dir torch-2.2.0-cp38-cp38-linux_aarch64.whl torchvision-0.17.2+c1d70fe-cp38-cp38-linux_aarch64.whl && \
    rm -f *.whl

# Install core AI/ML packages (install PyYAML first with --ignore-installed to avoid conflicts)
RUN pip3 install --no-cache-dir --ignore-installed "PyYAML>=5.3.1" && \
    pip3 install --no-cache-dir ultralytics scikit-guess scipy pycocotools

# Clone and install LMI AI Solutions
RUN git clone -b v1.5.1 https://github.com/lmitechnologies/LMI_AI_Solutions.git && \
    cd LMI_AI_Solutions/anomaly_detectors && git submodule update --init submodules/anomalib && \
    cd submodules/anomalib && pip3 install --no-cache-dir -e . && \
    cd /home/gadget/workspace/LMI_AI_Solutions && \
    pip3 install --no-cache-dir -e lmi_utils -e object_detectors -e anomaly_detectors -e classifiers

# Install OpenCV with --user flag to override system/other installations
RUN pip3 install --user opencv-python==4.6.0.66

# Install gadget packages for Python 3.8
RUN pip3 install --no-cache-dir gadget_pipeline_adapter==$PACKAGE_VER gadget_conversion_utils==$PACKAGE_VER \
    --extra-index-url $PYPI_SERVER

# Fix numpy version conflicts
RUN pip3 install --no-cache-dir numpy==1.23.5

# ============================================
# Python 3.12 Setup (Pipeline Server)
# ============================================

# Install pip for Python 3.12
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.12

# Add Python 3.12 to PATH
ENV PATH="/opt/python3.12/bin:${PATH}"

# Install gadget pipeline server for Python 3.12
RUN python3.12 -m pip install --no-cache-dir gadget_pipeline_server==$PACKAGE_VER --extra-index-url $PYPI_SERVER

# ============================================
# Runtime Configuration
# ============================================

# Default to Python 3.8 for the "python" command (for legacy scripts)
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.8 1

# Run the server with Python 3.12
CMD ["gadget_pipeline_server"]