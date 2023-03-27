import os
import json
from django.db import models

from configs.models import AutomationConfig, SensorConfig, PipelineConfig

available_decisions=['0','1','2', '3', '4', '5', '6', '7', '8', '9', '10']
available_decisions.insert(0,'none')
AVAILABLE_DECISIONS=available_decisions

# Inspection events that the Gadget App uses to update display
INSPECTION_RESULT_KEYS={   
    0:{'service_type':'pipeline','instance_name':'pipeline','instance':0,'sensor_topic':'sensor/gadget-sensor-gocator/0'},
    1:{'service_type':'pipeline','instance_name':'pipeline','instance':1,'sensor_topic':'sensor/gadget-sensor-gocator/1'},
    2:{'service_type':'pipeline','instance_name':'pipeline','instance':2,'sensor_topic':'sensor/gadget-sensor-gocator/2'},
    3:{'service_type':'pipeline','instance_name':'pipeline','instance':3,'sensor_topic':'sensor/gadget-sensor-gocator/3'},
    4:{'service_type':'pipeline','instance_name':'pipeline','instance':4,'sensor_topic':'sensor/gadget-sensor-gocator/4'}
}

# Mapping of inspection events to Charts
CHART_KEYS={
    0:{'charts':[0],'chart_type':[1],'plot_update':[0]},
    1:{'charts':[1],'chart_type':[1],'plot_update':[0]},
    2:{'charts':[2],'chart_type':[1],'plot_update':[0]},
    3:{'charts':[3],'chart_type':[1],'plot_update':[0]},
    4:{'charts':[4],'chart_type':[1],'plot_update':[0]},
    }

class ConfigUI(models.Model):
    """
    DESCRIPTION:
        - UI Configurations
    """
    name = models.TextField(default="UI Configs",)
    title=models.CharField(max_length=100,)
    media_path_0=models.TextField(default='',)
    media_path_1=models.TextField(default='',)
    media_path_2=models.TextField(default='',)
    media_path_3=models.TextField(default='',)
    media_path_4=models.TextField(default='',)
    count = models.IntegerField(blank=True, default=0)

    media_choices=[(0,'Image'),(1,'Point Cloud')]
    media_type=models.IntegerField(choices=media_choices,default=0,)
    
    info_display_0_label=models.TextField(default='Class: ',)
    info_display_0_value=models.TextField(default='--',)
    info_display_1_label=models.TextField(default='Score: ',)
    info_display_1_value=models.TextField(default='--',)
    info_display_2_label=models.TextField(default='Event: ',)
    info_display_2_value=models.IntegerField(default=0,)
    
    plot_options=[(0,'none'),(1,'line'),(2,'bar'),(3,'hist')]
    update_options=[(0,'absolute'),(1,'relative')]
    
    plot_0=models.IntegerField(choices=plot_options,default=0,)
    plot_0_update=models.IntegerField(choices=update_options,default=0,)
    plot_0_buffer=models.IntegerField(default=25,)
    plot_0_xinit=models.CharField(max_length=3,default='nan',)
    plot_0_yinit=models.CharField(max_length=3,default='nan',)
    plot_0_xlabel=models.CharField(max_length=128,default='x',)
    plot_0_ylabel=models.CharField(max_length=128,default='y',)
    plot_0_misc=models.TextField(blank=True, default='',)

    plot_1=models.IntegerField(choices=plot_options,default=0,)
    plot_1_update=models.IntegerField(choices=update_options,default=0,)
    plot_1_buffer=models.IntegerField(default=25,)
    plot_1_xinit=models.CharField(max_length=3,default='nan',)
    plot_1_yinit=models.CharField(max_length=3,default='nan',)
    plot_1_xlabel=models.CharField(max_length=128,default='x',)
    plot_1_ylabel=models.CharField(max_length=128,default='y',)
    plot_1_misc=models.TextField(blank=True, default='',)

    plot_2=models.IntegerField(choices=plot_options,default=0,)
    plot_2_update=models.IntegerField(choices=update_options,default=0,)
    plot_2_buffer=models.IntegerField(default=25,)
    plot_2_xinit=models.CharField(max_length=3,default='nan',)
    plot_2_yinit=models.CharField(max_length=3,default='nan',)
    plot_2_xlabel=models.CharField(max_length=128,default='x',)
    plot_2_ylabel=models.CharField(max_length=128,default='y',)
    plot_2_misc=models.TextField(blank=True, default='',)

    plot_3=models.IntegerField(choices=plot_options,default=0,)
    plot_3_update=models.IntegerField(choices=update_options,default=0,)
    plot_3_buffer=models.IntegerField(default=25,)
    plot_3_xinit=models.CharField(max_length=3,default='nan',)
    plot_3_yinit=models.CharField(max_length=3,default='nan',)
    plot_3_xlabel=models.CharField(max_length=128,default='x',)
    plot_3_ylabel=models.CharField(max_length=128,default='y',)
    plot_3_misc=models.TextField(blank=True, default='',)

    plot_4=models.IntegerField(choices=plot_options,default=0,)
    plot_4_update=models.IntegerField(choices=update_options,default=0,)
    plot_4_buffer=models.IntegerField(default=25,)
    plot_4_xinit=models.CharField(max_length=3,default='nan',)
    plot_4_yinit=models.CharField(max_length=3,default='nan',)
    plot_4_xlabel=models.CharField(max_length=128,default='x',)
    plot_4_ylabel=models.CharField(max_length=128,default='y',)
    plot_4_misc=models.TextField(blank=True, default='',)

    gocator_0_url=models.TextField(blank=True, default='')
    gocator_1_url=models.TextField(blank=True, default='')

    def __str__(self):
        return self.name

# Form definitions
class UserSensorSelector(models.Model):
    current_sensor = models.ForeignKey(SensorConfig, default=None, blank=False, null=False, on_delete=models.PROTECT,)

class UserSensorConfig(models.Model):
    instance_name = models.CharField(max_length=256,default="gadget-sensor-avt")
    instance = models.IntegerField(default=0)
    trigger_type_choices = [(False, 'External'), (True, 'Time Based')]
    timed_trigger_mode = models.BooleanField(choices=trigger_type_choices, default=False)
    trigger_delay=models.IntegerField(default=0.0)
    exposure_time=models.FloatField(default=2.0)
    gain=models.FloatField(default=1.0)

#--

class AvailableModels(models.Model):
    pipeline=models.CharField(max_length=256,default="pipeline/huhtumaki-pipeline/0")
    model_type=models.CharField(max_length=256,blank=False)
    model_name=models.CharField(max_length=256,blank=False)
    model_path=models.CharField(max_length=256,blank=False)

class UserPipelineSelector(models.Model):
    current_pipeline = models.ForeignKey(PipelineConfig, default=None, blank=False, null=False, on_delete=models.PROTECT,)

class UserPipelineConfig(models.Model):
    instance_name = models.CharField(max_length=256,default="huhtumaki-pipeline")
    instance = models.IntegerField(default=0)
    ad_error_threshold=models.FloatField(default=20)
    ad_error_size=models.FloatField(default=20)
    od_confidence_foreground=models.FloatField(default=20)
#--
class UserAutomationSelector(models.Model):
    current_automation = models.ForeignKey(AutomationConfig, default=None, blank=True, null=True, on_delete=models.SET_NULL,)

class UserAutomationConfig(models.Model):
    user_ID=models.CharField(max_length=256,default="Anomymous User")
    batch_ID=models.CharField(max_length=256,default="Unspecified Batch")
    eject_defect=models.BooleanField(blank=False, default=False)

class UserConfigJob(models.Model):
    job_name=models.CharField(max_length=256,unique=True,blank=False)

class SystemState(models.Model):
    running=models.BooleanField(default=False)
