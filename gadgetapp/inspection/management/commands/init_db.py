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

            if SensorConfig.objects.filter(instance_name= "gadget-sensor-avt",instance= 0).exists():
                sensor_config = SensorConfig.objects.get(instance_name= "gadget-sensor-avt",instance= 0)
            else:
                sensor_config = SensorConfig(instance_name= "gadget-sensor-avt",instance= 0)
                sensor_config.save()  
            user_sensor_config=UserSensorConfig(instance_name= "gadget-sensor-avt",instance= 0)
            self.create_custom(sensor_config,user_sensor_config)
            user_sensor_config.save()

        if not UserPipelineConfig.objects.exists():

            if PipelineConfig.objects.filter(instance_name= "gadget-pipeline-top",instance= 0).exists():
                pipeline_config = PipelineConfig.objects.get(instance_name= "gadget-pipeline",instance= 0)
            else:
                pipeline_config = PipelineConfig(instance_name= "gadget-pipeline",instance= 0)
                pipeline_config.save() 
            user_pipeline_config=UserPipelineConfig(instance_name= "gadget-pipeline",instance= 0)
            user_pipeline_config.save()
            self.create_custom(pipeline_config,user_pipeline_config)

            if PipelineConfig.objects.filter(instance_name= "gadget-pipeline",instance= 1).exists():
                pipeline_config = PipelineConfig.objects.get(instance_name= "gadget-pipeline",instance= 1)
            else:
                pipeline_config = PipelineConfig(instance_name= "gadget-pipeline",instance= 1)
                pipeline_config.save() 
            user_pipeline_config=UserPipelineConfig(instance_name= "gadget-pipeline",instance= 1)
            user_pipeline_config.save()
            self.create_custom(pipeline_config,user_pipeline_config)

            if PipelineConfig.objects.filter(instance_name= "gadget-pipeline",instance= 2).exists():
                pipeline_config = PipelineConfig.objects.get(instance_name= "gadget-pipeline",instance= 2)
            else:
                pipeline_config = PipelineConfig(instance_name= "gadget-pipeline",instance= 2)
                pipeline_config.save() 
            user_pipeline_config=UserPipelineConfig(instance_name= "gadget-pipeline",instance= 2)
            user_pipeline_config.save()
            self.create_custom(pipeline_config,user_pipeline_config)

            if PipelineConfig.objects.filter(instance_name= "gadget-pipeline",instance= 3).exists():
                pipeline_config = PipelineConfig.objects.get(instance_name= "gadget-pipeline",instance= 3)
            else:
                pipeline_config = PipelineConfig(instance_name= "gadget-pipeline",instance= 3)
                pipeline_config.save() 
            user_pipeline_config=UserPipelineConfig(instance_name= "gadget-pipeline",instance= 3)
            user_pipeline_config.save()
            self.create_custom(pipeline_config,user_pipeline_config)


        if not UserAutomationConfig.objects.exists():
            
            if AutomationConfig.objects.filter(instance_name="automation",instance=0).exists():
                automation_config = AutomationConfig.objects.get(instance_name="automation",instance=0)
            else:
                automation_config=AutomationConfig(instance_name="automation",instance=0)
                automation_config.save()
            user_automation_config=UserAutomationConfig()
            user_automation_config.save()
            self.create_custom(automation_config,user_automation_config)

        
        if not ConfigUI.objects.exists():

            ui_config=ConfigUI(
                title='New | Gadget | Template', \
                info_display_2_label='Total Reject Count:', \
                media_type=0, \
                plot_0=1, plot_0_yinit=0, plot_0_xinit=0, plot_0_xlabel='Acquistion Event', plot_0_ylabel='Defect Event', \
                plot_1=1, plot_1_yinit=0, plot_1_xinit=0, plot_1_xlabel='Acquistion Event', plot_1_ylabel='Defect Event', \
                plot_2=1, plot_2_yinit=0, plot_2_xinit=0, plot_2_xlabel='Acquistion Event', plot_2_ylabel='Defect Event', \
                plot_3=1, plot_3_yinit=0, plot_3_xinit=0, plot_3_xlabel='Acquistion Event', plot_3_ylabel='Defect Event', \
                gocator_0_url='http://192.168.1.10', gocator_1_url='http://192.168.1.11', gocator_2_url='http://192.168.1.12')
                
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
