# Automation

The Gadget's automation service is a custom container that allows the Gadget to communicate with the outside world. It interprets decisions from the model pipeline and sends the needed messages out. Because each inspection application has different requirements the implementation of the automation class is custom. The automation server is the base which the service is build on. The automation server takes as inputs two files, an automation class python file and an automation configs json file. It takes both those files, adds the configs to the database and uses the custom code in the automation class to send messages to an automation machine. The automation server is given these files through env variables **AUTOMATION_PATH** (the absolute path to the folder inside the container that holds the files), **AUTOMATION_CLASS** (the file and class name the automation server uses to import the automation class), and **AUTOMATION_DEFINITION_JSON** (the name of the JSON file).

## Automation Class

The automation server API is a list of methods that the automation class must implement. Those methods include:

- def connect(self) -> None:
  - Establishes connection the automation machine. Doesn't take any arguments and returns nothing. It is the automation class's responsibility to store any connection obj needed.
- def disconnect(self) -> None:
  - Disconnects from the automation machine. Doesn't take any arguments and returns nothing. It is the automation class's responsibility to clean up everything
- def is_connected -> bool:
  - Checks if connection is still active. Doesn't take any arguments returns a bool. True if connection is still good, false otherwise.
- def decision_mapping(self, mgs: str) -> Tuple[str, List[str]]
  - Translates the model pipeline result to an automation *action*. Takes as an argument a string representation of gadget_core pipeline message. Returns a tuple, a string representing the *action* and a list of strings representing any metadata associated with the action.
- def send_action(self, action: str, aux_info: List[str]) -> bool:
  - Sends the action to the automation machine. It takes the result of decision_mapping as its arguments, a string representing the action and a list of strings representing any metadata. It returns a bool. True if the action was sent, False otherwise

## Configs JSON File

In addition to custom code, the automation server expects a JSON file the defines any configs to be stored in the database. The JSON file must include at least the keys *configs_def* and *configs_with_handlers* which both go to a list of objects.

    {
        "configs_def": [
        
        ],
        "configs_with_handlers": [
        
        ]
    }

To define a config, add to the configs_def list an object with two key value pairs, *name* and *default_value* as the keys. As an example:

    "configs_def": [
         {
            "name": "ip_address",
            "default_value": "10.10.11.110"
        }
    ],

To define a config with a handler, add to the configs_with_handlers list an object with three key value pairs, *name*, *default_value* and *handler* as the keys. As an example:

    "configs_with_handlers": [
            {
                "name": "line_speed",
                "default_value": 5,
                "handler": "line_speed_handler"
            }
    }

The value associated with the key *handler* must be a method defined in the automation class. The method must take the config value as an argument and not return anything. The automation server will call that handler whenever the config is updated in the database. The complete JSON file from the examples would look like:

    {
        "configs_def": [
            {   
                "name": "ip_address",
                "default_value": "10.10.11.110"
            }
         ],
        "configs_with_handlers": [
            {
                "name": "line_speed",
                "default_value": 5,
                "handler": "line_speed_handler"
            }
        }
    }

## Dockerfile

Because this is a custom container, a custom dockerfile must be created too. By default the automation service definition inside the inspection.docker-compose.yaml looks for a file named automation.dockerfile. If the file name is changed, the docker-compose must be updated.

The dockerfile that comes standard with the template shouldn't need to be updated much. It extends a python base image, sets up the environment, installs all the gadget code, and installs all the python packages listed in automation_requirements.txt. If the automation class needs a python package, pymodbus for example, include it in the automation_requirements.txt file and it will be installed when the image is build.

## Mounting Folders

As mentioned before, the automation server is given the path to a folder that contains the automation class and JSON file. For this to work, those files must exist inside the container. By default in the automation service definition in inspection.docker-compose.yaml, the automation folder is mounted into the container

    volumes:
      - ./automation:/home/gadget/automation

When the container starts, inside /home/gadget/automation are all the files in the automation folder on the host machine, including the automation class automation_class.py and the JSON file automation_class_def.json. If the container is given the env variable values **AUTOMATION_PATH**=/home/gadget/automation, **AUTOMATION_CLASS**=automation_class.AutomationClass, and **AUTOMATION_DEFINITION_JSON**=automation_class_def.json, the automation server will be able to start working.
