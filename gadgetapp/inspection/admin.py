from django.contrib import admin

# Register your models here.
from inspection.models import ConfigUI, UserSensorSelector, UserSensorConfig, UserAutomationSelector, UserAutomationConfig, UserPipelineSelector, UserPipelineConfig, SystemState

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