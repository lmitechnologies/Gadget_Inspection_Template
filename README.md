# Gadget Inspection Template

The gadget is made up of several docker containers. To run it you will need to have docker and docker-compose installed on your machine.

The containers definition and configuration is done in a docker-compose yaml file, by default named inspection.docker-compose.yaml. In that file you'll find all the containers that make up the gadget. For organization sake they are put into three categories. Platform services make up the underlying components of the gadget that are consistent though out applications. Inspection services are configurable for a specific application and do the work of actually implementing the inspection. GoFactory services allow connection to the a GoFactory instance either running in the cloud or on prem.

- Platform
  - Postgres Database
    - Used to store configs and allow communication between other services
  - Database Api
    - Rest base API that allows services to communicate with the database
  - API Gateway
    - Nginx web server that allows access to the database api
  - GadgetApp Backend
    - Back end service for the GadgetApp. A browser based HMI
  - GadgetApp Frontend 
    - Front end service for the GadgetApp. A browser based HMI. Reachable at port 80
  - Data Manager
    - Maintains the state of the system through file archival, file pruning, and database pruning
  - Data Broker
    - ZMQ message broker allows fast communication between services
  - Model Manager
    - Manages state of models in GoFactory and locally. Allows users to pull pt files and convert them to engines 
- Inspection
  - Sensor
    - Retrieves images from a sensor and passes it along to the model pipeline. The gadget supports docker images for the Gocator, Dalsa, and AVT sensors.
  - Model Pipeline
    - Custom container that implements model for the inspection. See pipeline/README.md for more information.
  - Automation
    - Custom container that implements any connection to the outside world needed for an application. See automation/README.md for more information
- GoFactory
  - MQTT Bridge
    - Main connection between the gadget and GoFactory
  - Vault Client
    - Connects to secret manager
  - S3 Integrator
    - Moves files from the Gadget to GoFactory
  - Log Collector
    - Aggregates system logs to send to GoFactory

## Communication

Information is passed between containers in three ways.

### ZMQ

For the most important messages the gadget uses ZeroMQ. A asychronous Pub/Sub messaging protocol. This is for messages between the inspection services:
> Sensor -> Model Pipeline -> Automation

as well as for the data manager.

This functionality is implemented in Data Broker.

By default Gadget services expect the data broker to use the host **data-broker** and the ports **5001** for inbound messages and **5000** for outbound. This is fine as long as the data broker is defined in the docker-compose file similar to this:

    data-broker:
        container_name: gadget-data-broker
        image: ${DOCKER_REPO}/${DOCKER_PLATFORM}/gadget/zmq_broker:${PACKAGE_VER}
        restart: unless-stopped
        ports:
        - 5000:5000
        - 5001:5001

It is not recommended but if you need to change the hostname or ports you can do that by giving the updated values to the other containers through the env variables **DATA_BROKER_HOST**, **DATA_BROKER_SUB_PORT**, and **DATA_BROKER_PUB_PORT**.

### Inspection Messages

For non inspection critical messages, the gadget uses *inspection messages*. These go through the database api and are stored in the postgres database. This is how the Gadget App and GoFactory communicate with the system.

This is implemented by the Database API and API-Gateway.

By default the Gadget services expect the it the use the host **api-gateway** and the port **8000**. The database api expects the database to be available at the host **DB** This is fine as long as the database api and api-gateway are defined in the docker-compose file similar to this:

    db:
        container_name: gadget-db
        image: ${DOCKER_REPO}/${DOCKER_PLATFORM}/gadget/postgres:${PACKAGE_VER}
        restart: unless-stopped

    database-api:
        container_name: gadget-database-api
        image: ${DOCKER_REPO}/${DOCKER_PLATFORM}/gadget/database_api:${PACKAGE_VER}
        restart: unless-stopped
            
    api-gateway:
        container_name: gadget-api-gateway
        image: ${DOCKER_REPO}/${DOCKER_PLATFORM}/gadget/nginx:${PACKAGE_VER}
        restart: unless-stopped
        ports:
            - 8080:8080
 The service names for the database and database api must be **db** and **database-api** or this will not work. If you change the name of the api gateway you will need to update the other services with the env variable **DATABASE_API_HOST**.

### Image Transfer

Along with messages, it is important that images can get communicated between services. The sensor needs to be able to send the image it receives to the pipeline, the data, the Gadget App needs access to the annotated pipeline result, the data manager needs access to all images so it can clean up old files and the GoFactory services need access to all images so it can send them to GoFactory.

This communication is done using docker volumes. Specifically two volumes **inline-storage** and **offline-storage**. These volumes are mounted to the relevant containers. **inline-storage** is used for image communication between the sensor, pipeline, and gadget app. **inline-storage** is intended to be kept small, the images inside don't exist for very long. **offline-storage** is where images are archived. It is the data manager's responsibility to move images from **inline-storage** to **offline-storage**. GoFactory services are only interested in archived images so they need the **offline-storage** volume mounted.

The volumes need to be mounted to a specific location inside the container for the service to have access to them. By default this location is **/app/data** (with one exception). This is fine as long as the container definition include something like this:

    volumes:
        - inline-storage:/app/data

or

    volumes:
      - offline-storage:/app/data

Again, it is not recommended but if the volume is mounted to a different location the service can be given the updated path using the env variable DATA_STORAGE_ROOT.

The exception to this is the Data Manager, because it needs access to both volumes they are mounted to different locations. By default **inline-storage**'s location is **/app/data/inline** and **offline-storage**'s location is**/app/data/offline**. This is fine as long as the Data Manger container definition includes:

    volumes:
      - inline-storage:/app/data/inline
      - offline-storage:/app/data/offline

If they are mounted to a different location the data manger will need to be given the new paths using the env variables **INLINE_DATA_PATH** and **OFFLINE_DATA_PATH**

### Accessing Host Network

Sometimes the sensor and automation services need access to the host network to communicate with the outside world. To give them access include this in their container definition:

    network_mode: "host"

This removes the container from the internal docker-compose network and means these containers cannot communicate with the rest of the Gadget using the default host names or port settings.

Update the Database API and Data Broker host to **127.0.0.1** using the env variables **DATABASE_API_HOST** and **DATA_BROKER_HOST**.

To expose the container internal port to the host network include this as part of the Data Broker's container definition:

    ports:
      - 5000:5000
      - 5001:5001

and this to the API Gateway's container definition:

    ports:
      - 8080:8080

This maps the external port on the host network to the internal port inside the docker-compose network.

If the ports 8080, 5000, or 5001 are already used on the machine you can update the external port to something like

    - 8090:8080

Inside the container, it will still listen on port 8080 but everything outside the container can communicate to it using port 8090.

Update the Database API and Data Broker ports for relevant services using the env variables **DATABASE_API_PORT**, **DATA_BROKER_SUB_PORT**, and **DATA_BROKER_PUB_PORT**.

## Volumes

The volumes used by the Gadget are defined at the bottom of the docker-compose file.

    volumes:
      data-manager-storage:
      offline-storage:     
      inline-storage:
        driver: local
        driver_opts:
          o: bind
          type: none
          device: /mnt/gadget-inline
      model-storage:
        driver: local
        driver_opts:
          o: bind
          type: none
          device: ./models
      transfer-storage:
      postgres-db:
      static-volume:
      vault-storage:
      user-volume:

It is recommended that the inline-storage volume be bound to a tmpfs folder. Run the following command to create the folder:

    sudo mkdir -p /mnt/gadget-inline && \
    echo "gadget-inline /mnt/gadget-inline tmpfs rw,nodev,nosuid 0 0" | sudo tee -a /etc/fstab && \
    sudo mount -a

Otherwise remove the lines from the inline-storage volume definition so it matches offline-storage.

Which services use **offline-storage** and **inline-storage** have already been explained earlier in this document.

**data-manager-storage** is only used by the Data Manager for it's internal book keeping. It should be mounted like this

    volumes:
      - data-manager-storage:/app/data/internal
If it is mounted to a different location that will need to be updated using the env variable **INTERNAL_DATA_PATH**

**postgres-db** is only used by the database. It needs to be mounted like this:

    volumes:
      - postgres-db:/var/lib/postgresql/data
otherwise the postgres data will not be preserved when the Gadget gets stopped.

**static-volume** is used the the front and backend of the GadgetApp. It needs to be mounted to the backend like this:

    volumes:
      - static-volume:/app/static

and to the front end like this:
 hare/nginx/html/static

If it is not mounted to that specific location the Gadget App will not work.

**model-storage** is where models are stored on the machine. It needs to be mounted to the s3 integrator, model manager, and all pipelines.

It needs to be mounted to the s3 integrator here:

    volumes:
      - model-storage:/app/data/transfer/models

Model manager needs it to be mounted to the model root. It defaults to /app/models but can be changed using the env variable MODEL_ROOT

    volumes:
      - model-storage:/app/data/models

Pipelines needs it to be mounted to the model root. It defaults to /app/models but can be changed using the env variable MODEL_ROOT.

    volumes:
      - model-storage:/app/models

## Static Models

Static models are models that:

- Do **not** originate from GoFactory  
- Are **not** downloaded by the Model Manager  
- Are typically default models or models trained offline  

## Folder Structure & Mounting Requirements

To use static models, a folder containing them must:

1. Be **mounted** to both the Model Manager and the Pipelines  
2. Contain a file named `manifest.json`, which defines the available static models  

### Model Manager Mount

- **Environment Variable:** The mount location can be customized via an environment variable  
- **Default Mount Path:** `/app/static_models`  

### Pipeline Mount

- Must be mounted **inside the model volume**  
- **Default Model Volume Mount Point:** `/app/models`  
- **Static Models Mount Point:** `/app/models/static_models`  


### `manifest.json`

The static models folder must contain a `manifest.json` file that defines all the static models.  
This file must be a list of dictionary objects, each following this pattern:

```json
{
    "model_role": "default",
    "model_type": "ObjectDetection",
    "model_name": "Default",
    "model_version": "Default",
    "info": {
        "model_path": "default/model.pt",
        "training_package": "",
        "training_algorithm": ""
    }
}
```

- The model_path must be relative to the location of the manifest.json file.

- Depending on the model type, additional fields may be included under info.

## Environment variables

Environment variables can be passed to a container in two ways. They can be defined directly in the docker-compose file like this:

    environment:
      - ENVIRONMENT_VARIABLE=value

or the container can be given the path to a .env file that where the variables are defined:

    env_file:
      - ./sensor/sensor.env

## Controlling the Gadget

To build all the custom containers, run the command:

    docker-compose -f inspection.docker-compose.yaml build

To Start the gadget, run the command:

    docker-compose -f inspection.docker-compose.yaml up -d

The -f specifies the docker-compose file name, and -d brings the containers up in detached mode and is optional.

Once it's running, to view all the containers, run the command:

    docker ps

To view the logs of the whole system, run:

    docker-compose -f inspection.docker-compose.yaml logs

To view the logs of a specific container, run:

    docker logs <container-name>
  
To stop the Gadget, run the command:

    docker-compose -f inspection.docker-compose.yaml down

Include the flag -v after down to also delete the volumes, including the database and image archive. Not usually recommended

# Line Config Yaml

`line_config.yaml` is used to store line specific environment variables. Required variables are are `FACTORY_CLIENT_ID`, `GADGET_DEVICE_ID`, `VAULT_CREDENTIAL`, and `GADGETAPP_TITLE`. `SUBFOLDER` indicates to location of the docker compose file. If left blank it will use `./default`.

# Makefile Documentation

## Variables
- **`LINE`**: Specifies the configuration line to use from `YAML_FILE`. Default: `default`.
- **`NO_CACHE`**: Specifies whether to use Docker's `--no-cache` during builds. Accepts `y` for no-cache, defaults to `n`.
- **`SERVICE`**: Optional variable for `restart` to specify a single service to restart.

## Targets

### 1. `init`
Generate the `ENV_FILE` for a specified `LINE` from `YAML_FILE`.

**Usage:**
```bash
make init LINE=<line_name>
```
If `LINE` is not provided or does not exist in `YAML_FILE`, an error will be displayed, along with available lines.

---

### 2. `check_file`
Validate the existence of `YAML_FILE`.

**Usage:**
```bash
make check_file
```
t
---

### 3. `build`
Build Docker images using the resolved Docker Compose file. Optionally, skip the build cache.

**Usage:**
```bash
make build
make build NO-CACHE=y
```

---

### 4. `pull`
Pull Docker images as defined in the resolved Docker Compose file.

**Usage:**
```bash
make pull
```

---

### 5. `up`
Start the services in the resolved Docker Compose file.

**Usage:**
```bash
make up
```

---

### 6. `down`
Stop and remove containers using the resolved Docker Compose file. Option to delete volumes as well.

**Usage:**
```bash
make down
make down VOLUMES=y
```

---

### 7. `restart`
Restart services defined in the resolved Docker Compose file. You can specify a `SERVICE` to restart only that service.

**Usage:**
- Restart all services:
  ```bash
  make restart
  ```
- Restart a specific service:
  ```bash
  make restart SERVICE=<service_name>
  ```

---

### 8. `help`
Display available targets and their descriptions.

**Usage:**
```bash
make help
```

---

## Environment and Compose File Resolution

The Makefile dynamically resolves the Docker Compose file using a `SUBFOLDER` value from `ENV_FILE`. If `SUBFOLDER` is not specified, it defaults to `./default/docker-compose.yaml`.

## Notes
- Ensure `line_config.yaml` exists before running `init`.
- Use `make help` to view a summary of available targets.
- The Makefile is designed to handle multiple configurations and is extensible for more targets.