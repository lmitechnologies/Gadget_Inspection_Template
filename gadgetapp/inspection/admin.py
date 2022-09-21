from django.contrib import admin

# Register your models here.
from inspection.models import ConfigUI, UserSensorSelector, UserSensorConfig, UserAutomationSelector, UserAutomationConfig, UserPipelineSelector, UserPipelineConfig, SystemState

# django imports
# from django.db import models

# third party imports
# from jsoneditor.forms import JSONEditor as JSONEditorWidget

# Register your models here.
# from runtime.models import RuntimeStatus, RuntimeStatusLatest
# from inspection_events.models import InspectionEvent, PipelineInspectionEventLatest
# from configs.models import PlatformConfig, SensorConfig, PipelineConfig, AutomationConfig

admin.site.register(UserSensorSelector)
admin.site.register(UserSensorConfig)
admin.site.register(UserPipelineSelector)
admin.site.register(UserPipelineConfig)
admin.site.register(UserAutomationSelector)
admin.site.register(UserAutomationConfig)
admin.site.register(ConfigUI)
admin.site.register(SystemState)


# *******************************************************************
# ----------------------- <edit below> ------------------------------
# Register any custom models as needed. Remmber to import them from 
# models.py as well
# ----------------------- <edit above> ------------------------------
# *******************************************************************

# @admin.register(RuntimeStatus)
# class RuntimeStatusConfigAdmin(admin.ModelAdmin):
#     readonly_fields = (
#         '_id', 'service_type', 'instance_name', 
#         'instance', 'state', 'report_time'
#     )
#     formfield_overrides = {
#         models.JSONField: {'widget': JSONEditorWidget()},
#     }


# @admin.register(RuntimeStatusLatest)
# class RuntimeStatusLatestConfigAdmin(admin.ModelAdmin):
#     readonly_fields = (
#         '_id', 'service_type', 'instance_name', 
#         'instance', 'state', 'new_data', 'report_time'
#     )
#     formfield_overrides = {
#         models.JSONField: {'widget': JSONEditorWidget()},
#     }

# @admin.register(InspectionEvent)
# class InspectionEventConfigAdmin(admin.ModelAdmin):
#     readonly_fields = (
#         '_id', 'service_type', 'instance_name', 
#         'instance', 'event_id', 'event_time', 
#         'filename'
#     )
#     formfield_overrides = {
#         models.JSONField: {'widget': JSONEditorWidget()},
#     }


# @admin.register(PipelineInspectionEventLatest)
# class PipelineInspectionEventLatestConfigAdmin(admin.ModelAdmin):
#     readonly_fields = (
#         '_id', 'service_type', 'instance_name', 
#         'instance', 'event_id', 'event_time', 
#         'filename', 'new_data', 'sensor_topic'
#     )
#     formfield_overrides = {
#         models.JSONField: {'widget': JSONEditorWidget()},
#     }


# class GenericConfigAdmin(admin.ModelAdmin):
#     readonly_fields = ('_id', 'service_type', 'instance_name', 'instance', 'create_time', 'update_time')
#     formfield_overrides = {
#         models.JSONField: {'widget': JSONEditorWidget()},
#     }

# @admin.register(PlatformConfig)
# class PlatformConfigAdmin(GenericConfigAdmin):
#     pass

# @admin.register(SensorConfig)
# class SensorConfigAdmin(GenericConfigAdmin):
#     pass

# @admin.register(PipelineConfig)
# class PipelineConfigAdmin(GenericConfigAdmin):

#     readonly_fields = (
#         '_id', 'service_type', 'instance_name', 
#         'instance', 'create_time', 'update_time',
#     )
#     pass

# @admin.register(AutomationConfig)
# class AutomationConfigAdmin(GenericConfigAdmin):
#     pass