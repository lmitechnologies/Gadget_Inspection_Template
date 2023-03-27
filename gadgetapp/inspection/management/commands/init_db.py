import datetime


from django.core.management.base import BaseCommand, CommandError
from django.db import connection, transaction

from inspection.models import UserSensorSelector, UserSensorConfig, UserPipelineSelector, UserPipelineConfig, UserAutomationSelector, UserAutomationConfig, ConfigUI, SystemState, AvailableModels

from configs.models import AutomationConfig, SensorConfig, PipelineConfig
from inspection_events.models import InspectionEvent
from runtime.models import RuntimeStatusLatest

from inspection.models import AVAILABLE_DECISIONS

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
        
        available_model_0 = AvailableModels(pipeline="pipeline/pipeline/0", model_type="annomoly", model_name="2023-02-05", model_path="${PIPELINE_SERVER_SETTINGS_MODELS_ROOT}")
        available_model_0.save()
        available_model_1 = AvailableModels(pipeline="pipeline/pipeline/1", model_type="annomoly", model_name="2023-02-05", model_path="${PIPELINE_SERVER_SETTINGS_MODELS_ROOT}")
        available_model_1.save()
        available_model_2 = AvailableModels(pipeline="pipeline/pipeline/2", model_type="annomoly", model_name="2023-02-05", model_path="${PIPELINE_SERVER_SETTINGS_MODELS_ROOT}")
        available_model_2.save()
        available_model_3 = AvailableModels(pipeline="pipeline/pipeline/3", model_type="annomoly", model_name="2023-02-05", model_path="${PIPELINE_SERVER_SETTINGS_MODELS_ROOT}")
        available_model_3.save()
        available_model_4 = AvailableModels(pipeline="pipeline/pipeline/4", model_type="annomoly", model_name="2023-02-05", model_path="${PIPELINE_SERVER_SETTINGS_MODELS_ROOT}")
        available_model_4.save()


        sensor0_config = SensorConfig(instance_name= "gadget-sensor-gocator",instance= 0)
        sensor0_config.save()
        sensor1_config = SensorConfig(instance_name= "gadget-sensor-gocator",instance= 1)
        sensor1_config.save()
        sensor2_config = SensorConfig(instance_name= "gadget-sensor-avt",instance= 0)
        user_sensor2 = UserSensorConfig(instance_name= "gadget-sensor-avt",instance= 0)
        self.create_custom(sensor2_config, user_sensor2)
        user_sensor2.save()
        sensor2_config.save()
        
        sensor3_config = SensorConfig(instance_name = "gadget-sensor-avt",instance = 1)
        user_sensor3 = UserSensorConfig(instance_name= "gadget-sensor-avt",instance= 1)
        self.create_custom(sensor3_config, user_sensor3)
        user_sensor3.save()
        sensor3_config.save()
        sensor4_config = SensorConfig(instance_name = "gadget-sensor-avt",instance = 2)
        user_sensor4 = UserSensorConfig(instance_name= "gadget-sensor-avt",instance= 2)
        self.create_custom(sensor4_config, user_sensor2)
        user_sensor4.save()
        sensor4_config.save()

        pipeline0_config = PipelineConfig(instance_name = "pipeline",instance = 0)
        user_pipeline0_config=UserPipelineConfig(instance_name= "pipeline",instance = 0)
        self.create_custom(pipeline0_config,user_pipeline0_config)
        pipeline0_config.save()
        user_pipeline0_config.save()

        pipeline1_config = PipelineConfig(instance_name = "pipeline",instance = 1)
        user_pipeline1_config=UserPipelineConfig(instance_name = "pipeline",instance = 1)
        self.create_custom(pipeline1_config,user_pipeline1_config)
        pipeline1_config.save()
        user_pipeline1_config.save()
        
        pipeline2_config = PipelineConfig(instance_name = "pipeline",instance = 2)
        user_pipeline2_config=UserPipelineConfig(instance_name = "pipeline",instance = 2)
        self.create_custom(pipeline2_config,user_pipeline2_config)
        pipeline2_config.save()
        user_pipeline2_config.save()

        pipeline3_config = PipelineConfig(instance_name = "pipeline",instance = 3)
        user_pipeline3_config=UserPipelineConfig(instance_name = "pipeline",instance = 3)
        self.create_custom(pipeline3_config,user_pipeline3_config)
        pipeline3_config.save()
        user_pipeline3_config.save()

        pipeline4_config = PipelineConfig(instance_name = "pipeline",instance = 4)
        user_pipeline4_config=UserPipelineConfig(instance_name = "pipeline",instance = 4)
        self.create_custom(pipeline4_config,user_pipeline3_config)
        pipeline4_config.save()
        user_pipeline4_config.save()
        
        automation_config=AutomationConfig(instance_name="automation",instance=0)
        user_automation_config=UserAutomationConfig()
        self.create_custom(automation_config,user_automation_config)
        automation_config.save()
        user_automation_config.save()

        ui_config=ConfigUI(
            title='Huhtumaki | Pilot System | Egg Carton Inspection', \
            info_display_2_label='Total Defect Count:',\
            media_type=0, \
            plot_0=1, plot_0_yinit=0, plot_0_xinit=0, plot_0_xlabel='Acquistion Event', plot_0_ylabel='Defect Event', \
            plot_1=1, plot_1_yinit=0, plot_1_xinit=0, plot_1_xlabel='Acquistion Event', plot_1_ylabel='Defect Event', \
            plot_2=1, plot_2_yinit=0, plot_2_xinit=0, plot_2_xlabel='Acquistion Event', plot_2_ylabel='Defect Event', \
            plot_3=1, plot_3_yinit=0, plot_3_xinit=0, plot_3_xlabel='Acquistion Event', plot_3_ylabel='Defect Event', \
            plot_4=1, plot_4_yinit=0, plot_4_xinit=0, plot_4_xlabel='Acquistion Event', plot_4_ylabel='Defect Event', \
            gocator_0_url='http://192.168.1.10', gocator_1_url='http://192.168.1.11')
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

        runtimestatuslatest_sensor1=RuntimeStatusLatest(
            service_type='sensor',
            instance_name="gadget-sensor-gocator",
            instance=1,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_sensor1.save()


        runtimestatuslatest_sensor2=RuntimeStatusLatest(
        service_type='sensor',
            instance_name="gadget-sensor-gocator",
            instance=2,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_sensor2.save()

        runtimestatuslatest_sensor3=RuntimeStatusLatest(
            service_type='sensor',
            instance_name="gadget-sensor-gocator",
            instance=3,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_sensor3.save()

        runtimestatuslatest_sensor4=RuntimeStatusLatest(
            service_type='sensor',
            instance_name="gadget-sensor-gocator",
            instance=4,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_sensor4.save()

        runtimestatuslatest_pipeline0=RuntimeStatusLatest(
            service_type='pipeline',
            instance_name="pipeline",
            instance=0,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_pipeline0.save()

        runtimestatuslatest_pipeline1=RuntimeStatusLatest(
            service_type='pipeline',
            instance_name="pipeline",
            instance=1,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_pipeline1.save()

        runtimestatuslatest_pipeline2=RuntimeStatusLatest(
            service_type='pipeline',
            instance_name="pipeline",
            instance=2,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_pipeline2.save()

        runtimestatuslatest_pipeline3=RuntimeStatusLatest(
            service_type='pipeline',
            instance_name="pipeline",
            instance=3,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_pipeline3.save()

        runtimestatuslatest_pipeline4=RuntimeStatusLatest(
            service_type='pipeline',
            instance_name="pipeline",
            instance=4,
            report_time=datetime.datetime.utcnow(),
            state='STOPPED',
            diagnostics={}
        )
        runtimestatuslatest_pipeline4.save()

        runtimestatuslatest_automation=RuntimeStatusLatest(
            service_type='automation',
            instance_name="automation",
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
