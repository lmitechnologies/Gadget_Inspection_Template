# Use forms for user inputs
from tkinter import Widget
from django import forms

from inspection.models import UserSensorSelector, UserSensorConfig, UserAutomationConfig, UserPipelineSelector, UserPipelineConfig, UserConfigJob

class ChoosePipelineForm(forms.ModelForm):
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
        fields = ('ad_error_threshold','ad_error_size','od_confidence_foreground',)
        labels = {  'ad_error_threshold': 'Anomaly Threshold',
                    'ad_error_size': "Anomally Error Size",
                    'od_confidence_foreground':'Object Detection Confidence'
                }
        widgets = {
            'ad_error_threshold': forms.TextInput(attrs={'class': 'config-input_field'}),
            'ad_error_size': forms.TextInput(attrs={'class': 'config-input_field'}),
            'od_confidence_foreground': forms.TextInput(attrs={'class': 'config-input_field'}),
            }

class ChoosePipelineModel(forms.Form):

    def __init__(self, current_annomoly: str, current_obj: str, models:list = [], *args, **kwargs):
        super(ChoosePipelineModel, self).__init__(*args, **kwargs)
        annomly_choices = [(current_annomoly, current_annomoly)]
        object_choices = [(current_obj, current_obj)]
        for model in models:
            if model[0] == 'annomoly':
                annomly_choices.append((model[1], model[1]))
            elif model[0] == 'object':
                object_choices.append((model[1], model[1]))

        self.fields['annomoly_model'] = forms.CharField(label='Annomoly Model', widget=forms.Select(choices=annomly_choices))   
        self.fields['object_model'] = forms.CharField(label='Object Detection Model', widget=forms.Select(choices=object_choices))

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
        trigger_type_choices = [(False, 'External'), (True, 'Time Based')]
        model=UserSensorConfig
        fields=('timed_trigger_mode','gain','exposure_time',)
        labels={'timed_trigger_mode':'Trigger Mode','gain':'Gain','exposure_time':'Exposure Time'}
        widgets={
            'timed_trigger_mode': forms.Select(choices=trigger_type_choices, attrs={'class': 'config-input_field'}),
            'gain': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'exposure': forms.NumberInput(attrs={'class': 'config-input_field'}),
            }
  
class ChangeAutomationForm(forms.ModelForm):
    class Meta:
        model = UserAutomationConfig
        fields = ('user_ID','batch_ID','eject_defect')
        labels = {
            'user_ID':'User ID',
            'batch_ID':'Batch ID',
            'eject_defect':'Eject Defect',
        }
        CHOICES = [(True, 'YES'), (False, 'NO')]
        widgets = {
            'user_ID': forms.TextInput(attrs={'class': 'config-input_field'}),
            'batch_ID': forms.TextInput(attrs={'class': 'config-input_field'}),
            'eject_defect': forms.RadioSelect(choices=CHOICES),
        }

class ChooseConfigJobForm(forms.Form):

    def __init__(self, config_job_names:list = [], *args, **kwargs):
        super(ChooseConfigJobForm, self).__init__(*args, **kwargs)
        choices = [('none', 'None')]
        for name in config_job_names:
            choices.append((name, name))

        self.fields['choose_job'] = forms.CharField(label='Choose Job', widget=forms.Select(choices=choices))

# TODO
class NewConfigForm(forms.ModelForm):
    class Meta:
        model=UserConfigJob
        fields=('job_name',)
        labels={'job_name':'Job Name'}
        widgets={
            'job_name': forms.TextInput(attrs={'class': 'config-job-input'})
        }
  