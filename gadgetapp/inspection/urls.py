from django.urls import path, re_path

#import views from views file
from . import views

#application specific url patterns: inspection
app_name = 'inspection'
urlpatterns = [
    path('',views.views_automation_config,name='automation_config'),  #IP address links to base index view
    path('sensor_config/',views.views_sensor_config,name='sensor_config'),
    path('pipeline_config/',views.views_pipeline_config,name='pipeline_config'),
    path('automation_config/',views.views_automation_config,name='automation_config'),
    path('start_stop/',views.toggle_start_stop,name='start_stop'),
    path('event_reset/',views.event_reset,name='event_reset'),
    path('ui_update/',views.ui_update,name='ui_update'),
]