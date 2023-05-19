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

class ChangePipelineFormTop(forms.ModelForm):
    class Meta:
        model = UserPipelineConfig
        fields = ('od_confidence_board','od_confidence_defect','od_confidence_water','ad_error_threshold','ad_error_size',)
        labels = {'od_confidence_board': 'OD Board Confidence',
            'od_confidence_defect': 'OD Defect Confidence',
            'od_confidence_water': 'OD Water Confidence',
            'ad_error_threshold': 'AD Error Threshold',
            'ad_error_size':"AD Error Size",}

        widgets = {
            'od_confidence_board': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'od_confidence_defect': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'od_confidence_water': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'ad_error_threshold': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'ad_error_size': forms.NumberInput(attrs={'class': 'config-input_field'}),
        }

class ChangePipelineFormBottom(forms.ModelForm):
    class Meta:
        model = UserPipelineConfig
        fields = ('ad_error_threshold','ad_error_size',)
        labels = {'ad_error_threshold': 'AD Error Threshold', 'ad_error_size':"AD Error Size",}

        widgets = {
            'ad_error_threshold': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'ad_error_size': forms.NumberInput(attrs={'class': 'config-input_field'}),
        }


class ChangePipelineFormSide(forms.ModelForm):
    class Meta:
        model = UserPipelineConfig
        fields = ('ad_error_threshold','ad_error_size',)
        labels = {'ad_error_threshold': 'AD Error Threshold', 'ad_error_size':"AD Error Size",}

        widgets = {
            'ad_error_threshold': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'ad_error_size': forms.NumberInput(attrs={'class': 'config-input_field'}),
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
        fields = ('exposure_time','gain','timed_trigger_mode',)
        labels = {'exposure_time': 'Exposure','gain': 'Gain','timed_trigger_mode': 'Trigger Mode',}
        CHOICES = [(True, 'External Trigger'), (False, 'Time Trigger')]
        widgets = {
            'exposure_time': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'gain': forms.NumberInput(attrs={'class': 'config-input_field'}),
            'timed_trigger_mode': forms.RadioSelect(choices=CHOICES),
        }
  
class ChangeAutomationForm(forms.ModelForm):
    class Meta:
        model = UserAutomationConfig
        fields = ('mark_defect', "external_start")
        labels = {'mark_defect': 'Mark Defect', "external_start": "External Start"}
        CHOICES = [(True, 'True '), (False, 'False')]
        widgets = {
            'mark_defect': forms.RadioSelect(choices=CHOICES),
            'external_start': forms.RadioSelect(choices=CHOICES),
        }