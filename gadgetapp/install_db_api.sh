source venv/bin/activate
source ../.env

pip install gadget_api_configs==$PACKAGE_VER --extra-index-url $PYPI_SERVER
pip install gadget_api_inspection_events==$PACKAGE_VER --extra-index-url $PYPI_SERVER 
pip install gadget_api_runtime==$PACKAGE_VER --extra-index-url $PYPI_SERVER