import os
import json
from django.db import models

from configs.models import AutomationConfig, SensorConfig, PipelineConfig

available_decisions=['0','1','2', '3', '4', '5', '6', '7', '8', '9', '10']
available_decisions.insert(0,'none')
AVAILABLE_DECISIONS=available_decisions

# Inspection events that the Gadget App uses to update display
INSPECTION_RESULT_KEYS={   
    0:{'service_type':'pipeline','instance_name':'gadget-pipeline','instance':0,'sensor_topic':'sensor/gadget-sensor-gocator/0'}
}

# Mapping of inspection events to Charts
CHART_KEYS={
    0:{'charts':[0,1],'chart_type':[1,2],'plot_update':[0,1],'plot_y_key':['decision', 'decision']}    }


class ConfigUI(models.Model):
    """
    DESCRIPTION:
        - UI Configurations
    """
    name = models.TextField(default="UI Configs",)
    title=models.CharField(max_length=100,)
    media_path_0=models.TextField(default='',)
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


    def __str__(self):
        return self.name

# Form definitions
class UserSensorSelector(models.Model):
    current_sensor = models.ForeignKey(SensorConfig, default=None, blank=False, null=False, on_delete=models.PROTECT,)

class UserSensorConfig(models.Model):
    trigger_type_choices = [(False, 'For False'), (True, 'For True')]
    sensor_param_1 = models.CharField(max_length=256,default="sensor param 1 value")
    sensor_param_2=models.IntegerField(default=0.0)
    sensor_param_3=models.BooleanField(choices=trigger_type_choices, default=False)
#--
class UserPipelineSelector(models.Model):
    current_pipeline = models.ForeignKey(PipelineConfig, default=None, blank=False, null=False, on_delete=models.PROTECT,)

class UserPipelineConfig(models.Model):
    trigger_type_choices = [(False, 'For False'), (True, 'For True')]
    pipeline_param_1 = models.CharField(max_length=256,default="pipeline param 1 value")
    pipeline_param_2=models.IntegerField(default=0.0)
    pipeline_param_3=models.BooleanField(choices=trigger_type_choices, default=False)
#--
class UserAutomationSelector(models.Model):
    current_automation = models.ForeignKey(AutomationConfig, default=None, blank=True, null=True, on_delete=models.SET_NULL,)

class UserAutomationConfig(models.Model):
    trigger_type_choices = [(False, 'For False'), (True, 'For True')]
    automation_param_1 = models.CharField(max_length=256,default="automation param 1 value")
    automation_param_2=models.IntegerField(default=0.0)
    automation_param_3=models.BooleanField(choices=trigger_type_choices, default=False)
#--
class SystemState(models.Model):
    running=models.BooleanField(default=False)






