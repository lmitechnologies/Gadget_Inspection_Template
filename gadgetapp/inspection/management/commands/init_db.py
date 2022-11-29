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

        if not UserSensorConfig.objects.exists():
            if not SensorConfig.objects.exists():
                sensor_config = SensorConfig(instance_name= "gadget-sensor-gocator",instance= 0)
                sensor_config.save()
            else:
                sensor_config = SensorConfig.objects.get(instance=0)
            user_sensor_config=UserSensorConfig()
            user_sensor_config.save()
            UserSensorSelector(current_sensor=sensor_config).save()
        
        if not UserPipelineConfig.objects.exists():
            if not PipelineConfig.objects.exists():
                pipeline_config = PipelineConfig(instance_name= "gadget-pipeline",instance= 0)
                pipeline_config.save() 
            else:
                pipeline_config = PipelineConfig.objects.get(instance=0)
            user_pipeline_config=UserPipelineConfig()
            user_pipeline_config.save()
            self.create_custom(pipeline_config,user_pipeline_config)
            UserPipelineSelector(current_pipeline=pipeline_config).save()

        if not UserAutomationConfig.objects.exists():
            if not AutomationConfig.objects.exists():
                automation_config=AutomationConfig(instance_name="gadget-automation-server",instance=0)
                automation_config.save()
            else:
                automation_config=AutomationConfig.objects.get(instance=0)
            user_automation_config=UserAutomationConfig()
            user_automation_config.save()
            self.create_custom(automation_config,user_automation_config)
        
        if not ConfigUI.objects.exists():
            ui_config=ConfigUI(
                title='New Gadget Application', \
                info_display_2_label='Total Inspection Count:', \
                media_type=0, \
                plot_0=CHART_KEYS[0]['chart_type'][0], plot_0_yinit=0, plot_0_update=CHART_KEYS[0]['plot_update'][0], plot_0_xinit=0, plot_0_xlabel='Acquistion Event', plot_0_ylabel='Inspection Event', \
                plot_1=CHART_KEYS[0]['chart_type'][1], plot_1_yinit=0, plot_1_update=CHART_KEYS[0]['plot_update'][1], plot_1_xlabel=','.join(AVAILABLE_DECISIONS[1:]), plot_1_ylabel='Total Inspection Events')
            ui_config.save()

        if not SystemState.objects.exists():
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
