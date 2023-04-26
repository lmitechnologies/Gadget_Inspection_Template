import datetime


from django.core.management.base import BaseCommand, CommandError
from django.db import connection, transaction

from inspection.models import UserSensorSelector, UserSensorConfig, UserPipelineSelector, UserPipelineConfig, UserAutomationSelector, UserAutomationConfig, ConfigUI, SystemState

from configs.models import AutomationConfig, SensorConfig, PipelineConfig
from inspection_events.models import InspectionEvent
from runtime.models import RuntimeStatusLatest

from inspection.models import AVAILABLE_DECISIONS, CHART_KEYS

ALREADY_LOADED_ERRROR_MESSAGE = """
If you need to reinitialize data, first delete the db.sqlite3 file, then rerun 
'python3 manage.py migrate'."""

class Command(BaseCommand):
    help = "Initialize data categories."

    def create_custom(self,model,usermodel):
        custom=model.custom
        field_names=[f.name for f in usermodel._meta.get_fields()]
        for field in field_names[1:]:
            custom[field]=getattr(usermodel,field)
        # commit new system configs
        model.custom=custom

    @transaction.atomic
    def create_defaults(self, *args, **options):
        
        if UserSensorSelector.objects.exists() or UserSensorConfig.objects.exists() or UserPipelineSelector.objects.exists() or UserPipelineConfig.objects.exists() or \
            UserAutomationSelector.objects.exists() or UserAutomationConfig.objects.exists() or ConfigUI.objects.exists():
                print('Inspection data already initialized.  Exiting.')
                print(ALREADY_LOADED_ERRROR_MESSAGE)
                return


        sensor_config = SensorConfig(instance_name= "gadget-sensor-gocator",instance= 0)
        sensor_config.save()  
        user_sensor_config=UserSensorConfig()
        user_sensor_config.save()
        UserSensorSelector(current_sensor=sensor_config).save()
        
        pipeline_config = PipelineConfig(instance_name= "gadget-pipeline",instance= 0)
        pipeline_config.save() 
        user_pipeline_config=UserPipelineConfig()
        user_pipeline_config.save()
        self.create_custom(pipeline_config,user_pipeline_config)
        UserPipelineSelector(current_pipeline=pipeline_config).save()

        automation_config=AutomationConfig(instance_name="gadget-automation",instance=0)
        automation_config.save()
        user_automation_config=UserAutomationConfig()
        user_automation_config.save()
        self.create_custom(automation_config,user_automation_config)
        
        ui_config=ConfigUI(
            title='New Gadget Application', \
            info_display_2_label='Total Inspection Count:', \
            media_type=0, \
            plot_0=CHART_KEYS[0]['chart_type'][0], plot_0_yinit=0, plot_0_update=CHART_KEYS[0]['plot_update'][0], plot_0_xinit=0, plot_0_xlabel='Acquistion Event', plot_0_ylabel='Inspection Event', \
            plot_1=CHART_KEYS[0]['chart_type'][1], plot_1_yinit=0, plot_1_update=CHART_KEYS[0]['plot_update'][1], plot_1_xlabel=','.join(AVAILABLE_DECISIONS[1:]), plot_1_ylabel='Total Inspection Events')
        ui_config.save()

        runtimestatuslatest_sensor0=RuntimeStatusLatest(
            service_type='sensor',
            instance_name="gadget-sensor-gocator",
            instance=0,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_sensor0.save()

        runtimestatuslatest_pipeline=RuntimeStatusLatest(
            service_type='pipeline',
            instance_name="gadget-pipeline",
            instance=0,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_pipeline.save()

        runtimestatuslatest_automation=RuntimeStatusLatest(
            service_type='automation',
            instance_name="gadget-automation",
            instance=0,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_automation.save()

        runtimestatuslatest_cloud=RuntimeStatusLatest(
            service_type='platform',
            instance_name="mqtt_bridge",
            instance=0,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_cloud.save()

        systemstate=SystemState()
        systemstate.save()

    def handle(self, *args, **options):
        """
        Django command entry point. 
        First sets the sqlite the journal mode, then seeds
        the database with defaults.
        """
        # with connection.cursor() as sql:
        #     sql.execute('PRAGMA journal_mode=WAL;')
        self.create_defaults(*args, **options)
