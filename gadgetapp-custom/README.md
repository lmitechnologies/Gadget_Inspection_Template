# Customize GadgetApp

GadgetApp customization is done primarily in the config.json file. To overwrite the defaults create a config.json file and mount it to

    /usr/share/nginx/html/config.json

The config file must contain the top level keys **version**, **appName**, **configForms**, and **body**. The most basic version of this would look like this

    {
        "version": 1,
        "appName": "New Gadget App",
        "configForms": {},
        "body": []
    }

## Version

This field tells the GadgetApp which version of the schema it is expecting. 1 is the latest version.

## App name

This is the title that is displayed in the header.

## Config Forms

This defines the values that will be included in the service config forms. This should be a dict with a the very least the top level keys **sensor**, **pipeline**, and **automation** whose corresponding value is a dict that contain's the key **configs**. Like this

    {
        "sensor": {
            "configs": []
        },
        "pipeline": {
            "configs": []
        },
        "automation": {
            "configs": []
        }
    }

The **configs** value should be a list of config values you want to expose. If the list is empty that service will not be included in the form.

It is also possible to be more specific and define forms down to the service type or service_name

    "sensor": {
        "gocator-sensor": {
            "configs": []
        },
        "configs": ["exposure_time"]
    }

When creating the forms it tries to be as specific as possible. If it is defined down to the service type or service name level it will use those configs otherwise it will take the configs from the next up. In this example gocator sensors won't have any configs exposed but all other sensors will expose exposure_time

## Body

This defines the contents of the main body of the page. The body is divided into columns that contain one or more components. The body field expects a list of dicts defining the size of each column and the components it contains. An example column definition looks like this

    {
        "columnSize": 12,
        "components": [
            {
                "componentName": "ImageCanvas",
                "topic": "pipeline/gadget-pipeline/0"
            }
        ]
    }

**columnSize** defines how much of the page width to take up. It is important that the sum of column sizes of all the columns is equal to 12. **components** is a list of component definitions. Each component takes different input properties but all include **componentName**, which component to render, and **topic**, the zmq topic it should subscribe to.

### Currently supported components are

#### ImageCanvas

Displays an image. Usually the annotated output of the model.

It takes no additional properties

#### Metric

Displays a numeric or string value

- **metricName**: the name of the metric to be displayed

#### LineChart

A line chart with a single line. Used to chart a numeric value over time.

- **decisionKey**: the name of the value to be charted (it expects the value to be a number)
- **historyLen**: the number of inspection events to track before over writing them. Default 10

#### MultiLineChart

A line chart with multiple lines. Used to chart the number of times something occurs during an inspection event.

- **decisionKey**: the name of the value to be charted.

#### BarChart

A bar chart that creates a new bar for each unique value it receives

- **decisionKey**: the name of the value to be charted.

#### Histogram

A bar chart with a predefined list of labels.

- **decisionKey**: the name of the value to be charted.
- **labelList**: an ordered list of all the values to chart. If it receives a value that is not in the list it will be ignored.

#### PieChart

A pie chart

- **decisionKey**: the name of the value to be charted. The value must be a list of lists with the following format: [[value, label, (optional) color], ...]
