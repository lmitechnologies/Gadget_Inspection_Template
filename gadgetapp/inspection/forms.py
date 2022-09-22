# Use forms for user inputs
from tkinter import Widget
from django import forms

from inspection.models import UserSensorSelector, UserSensorConfig, UserAutomationConfig, UserPipelineSelector, UserPipelineConfig

class ChoosePipelineForm(forms.ModelForm):
    # Meta tells Django what database elements/fields to reference
    class Meta:
        # database element
        model = UserPipelineSelector
        # exposed fields
        fields=('current_pipeline',)
        labels={'current_pipeline':'Available Pipelines'}
        widgets = {'current_pipeline': forms.Select(attrs={'class': 'config-input_field'}),}

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

class ChooseSensorForm(forms.ModelForm):
    # Meta tells Django what database elements/fields to reference
    class Meta:
        # database element
        model = UserSensorSelector
        # exposed fields
        fields=('current_sensor',)
        labels={'current_sensor':'Available Sensors'}
        widgets = {'current_sensor': forms.Select(attrs={'class': 'config-input_field'}),}

class ChangeSensorForm(forms.ModelForm):
    class Meta:
        model = UserSensorConfig
        fields = ('sensor_param_1','sensor_param_2','sensor_param_3')
        labels = {'sensor_param_1': 'Sensor Param 1','sensor_param_2': 'Sensor Param 2','sensor_param_3': 'Sensor Param 3',}
        CHOICES = [(True, 'For True'), (False, 'For False')]
        widgets = {
            'sensor_param_1': forms.TextInput(attrs={'class': 'config-input_field'}),
            'sensor_param_2': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'sensor_param_3': forms.RadioSelect(choices=CHOICES),
        }
  
class ChangeAutomationForm(forms.ModelForm):
    class Meta:
        model = UserAutomationConfig
        fields = ('automation_param_1','automation_param_2','automation_param_3')
        labels = {'automation_param_1': 'Pipeline Param 1','automation_param_2': 'Pipeline Param 2','automation_param_3': 'Pipeline Param 3',}
        CHOICES = [(True, 'For True'), (False, 'For False')]
        widgets = {
            'automation_param_1': forms.TextInput(attrs={'class': 'config-input_field'}),
            'automation_param_2': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'automation_param_3': forms.RadioSelect(choices=CHOICES),
        }