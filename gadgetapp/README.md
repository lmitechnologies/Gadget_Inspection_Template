# Gadget App

The Gadget App is a browser based HMI that allows for nearly real time monitoring and control of the system. It's built using Django and a base level understanding of the technology and model-view-control design paradigm is useful.

The Gadget App is connected to the rest of the system through the postgres database. When an inspection event occurs, the services in the inspection pipeline insert a row into the inspection events table. The Gadget App is consistently polling that table for a new event. When it sees a new event, it take the information the from the model pipeline and uses that to update the display. It is also monitoring the state of the other services and will update the display if that changes.

Out of the box, the Gadget App comes configured for a single sensor, single pipeline system. It has one canvas and two charts. To connect it to a Gadget some changes will have to be made to these files:

- models.py
- views.py
- forms.py
- init_db.py

Most of the the changes will be done in models.py. As mentioned previously, the Gadget App polls the inspection events table to for new events. To do that it need to know what service, or services, inspection events it needs to look for. That is specified using the **INSPECTION_RESULT_KEYS**, which can be found at the top of models.py. By default it looks like this:

    INSPECTION_RESULT_KEYS={   
        0:{'service_type':'pipeline','instance_name':'gadget-pipeline','instance':0,'sensor_topic':'sensor/gadget-sensor-gocator/0'}
    }

With this, the Gadget App knows that it's looking for inspection events from the model pipeline service *gadget-pipeline* instance 0 that came from the sensor topic *sensor/gadget-sensor-gocator/0*. If any of those things have changed it will need to be updated here.

The inspection event has two things the Gadget App cares about. The path to an annotated image and a dictionary of key value pairs. The image path it uses to display the annotated image on the canvas and the values in the dictionary it uses to update the charts.

## Charts

There are three types of charts: line, bar, and histogram. They can be used to chart decisions or values that come out of the pipeline. By default the Gadget App comes with a line graph and a bar chart that both display the pipeline decision. That is defined near the top of models.py

    available_decisions=['decision_1','decision_2','decision_3']
    available_decisions.insert(0,'none')
    AVAILABLE_DECISIONS=available_decisions

    # Mapping of inspection events to Charts
    CHART_KEYS={
        0:{'charts':[0,1],'chart_type':[1,2],'plot_update':[0,1],'plot_y_key':['decision', 'decision']}}

**available_decisions** is a list of all expected decisions from the pipeline. The Gadget App uses this to translate a decision to a numeric value it can display in a chart. It is possible to use the charts to display numeric results directly from the pipeline, in that case those *decisions* don't need to be listed in **available_decisions*

 The **CHART_KEYS** dictionary is where the charts are defined. In this example, there is only one set of charts so there is only one key value pair at the top level. Inside the value the two charts of defined.

    'charts':[0,1]

This defines that there are two charts with ids 0 and 1.

    'chart_type':[1,2]

This is where it defines the type of chart. 1 for line, 2 for bar, and 3 for histogram.

    'plot_update':[0,1]

Here the update option is defined. 0 for absolute and 1 for relative. (Keep in mind not all chart types support all update options)

    'plot_y_key':['decision', 'decision']

This value is used so the Gadget App knows what key value pair in the pipeline inspection event to use to update the chart.

## Configs

The Gadget App is also used to expose system configs to the end user. This is done through the configs panel on the left side of the screen. There are three panels one for sensor, pipeline, and automation that the user can chose using the buttons at the bottom of the panel. Out of the box the Gadget App comes with place holder configs that will need to be updated to correspond with real configs actually used by the system. Updating the configs means making changes to models.py and forms.py. Models.py is where data structure is defined and forms.py is where the user interface is defined.

For example:

The pipeline configs by default look like this:

models.py:

    class UserPipelineConfig(models.Model):
        trigger_type_choices = [(False, 'For False'), (True, 'For True')]
        pipeline_param_1 = models.CharField(max_length=256,default="pipeline param 1 value")
        pipeline_param_2=models.IntegerField(default=0.0)
        pipeline_param_3=models.BooleanField(choices=trigger_type_choices, default=False)

forms.py:

    class ChangePipelineForm(forms.ModelForm):
        class Meta:
            model = UserPipelineConfig
            fields = ('pipeline_param_1','pipeline_param_2','pipeline_param_3')
            labels = {'pipeline_param_1': 'Pipeline Param 1','pipeline_param_2': 'Pipeline Param 2','pipeline_param_3': 'Pipeline Param 3',}
            CHOICES = [(True, 'For True'), (False, 'For False')]
            widgets = {
                'pipeline_param_1': forms.TextInput(attrs={'class': 'config-input_field'}),
                'pipeline_param_2': forms.NumberInput(attrs={'class': 'config-input_field'}),
                'pipeline_param_3': forms.RadioSelect(choices=CHOICES),
            }

For this example, lets update pipeline configs to expose confidence level. To do that, the models.py would be updated to this:

    class UserPipelineConfig(models.Model):
        confidence = models.FloatField(default=0.5)

It's important that config name here matches the config name in the pipeline configs. If they match, any update to the config on the Gadget App will automatically be sent to the pipeline.

Now the data structure has been updated, all that's left is to update the UI. The updated forms.py looks like this:

    class ChangePipelineForm(forms.ModelForm):
        class Meta:
            model = UserPipelineConfig
            fields = ('confidence')
            labels = {'confidence': 'Confidence'}
            widgets = {
                'confidence': forms.NumberInput(attrs={'class': 'config-input_field'}),
            }

It's still referencing the same model so that doesn't change. The fields attribute needs to be updated to match the new config name. Labels, which gives the field a display name, needs to updated as well. Widgets is where the type of UI is defined. For this case the config is a float value so we choose NumberInput from the forms class.

## Make Migrations

Updating models.py won't have any effect unless the changes to the models are sent to the database. Django does this using migration files. At start up, the Gadget App runs *migrations* which goes through the migration files and makes sure the database schema is up to date. To add a new migration, run *makemigrations*. This can be done manually using the django manage functionality or the gadget app includes a docker-compose file that will take care of it. Simply run the command:

    docker-compose -f docker-compose.makemigrations.yaml --env-file ../.env up

## Initialize the Database

The Gadget App relies on information from in the database from the other services in the Gadget. If that information isn't there the Gadget App will run init_db.py to initialize the database. It will need to create instances of sensor, pipeline, and automation configs for each instance of each of those services in the system. The instance names must also match the instance names of the services. It wil also need create instances of runtime status for each of the services. By default, it is setup to initialize a single sensor/pipeline gadget. Using a Gocator and with the pipeline and automation service name set to *gadget-pipeline* and *gadget-automation*. If those names change, or there are more sensors/pipelines added, it will have to be updated.

## Runtime Status

In addition to inspection events and configs, the Gadget App can also be used to monitor the state of the system. At the bottom of the page is a number of lights that display the runtime status of the service they correspond to. Green for RUNNING, yellow for INITIALIZING and red for STOPPED. This does not need to be updated unless more sensors or pipelines are added to the system.
