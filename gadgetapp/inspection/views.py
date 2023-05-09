from datetime import datetime
import pytz
import os
import logging
import numpy as np
import cv2
import time
import glob
import random
import string
from pathlib import Path

from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from django.core import serializers
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from gadget_core.data.gadget_image import GadgetImage

#import models
from inspection.models import ConfigUI, UserSensorSelector, UserSensorConfig, UserPipelineSelector, UserPipelineConfig, UserAutomationConfig, SystemState
from inspection.models import AVAILABLE_DECISIONS, INSPECTION_RESULT_KEYS, CHART_KEYS

from configs.models import AutomationConfig, PipelineConfig, SensorConfig
from inspection_events.models import PipelineInspectionEventLatest, InspectionEvent
from runtime.models import RuntimeStatusLatest

#import forms
from .forms import ChangeAutomationForm, ChoosePipelineForm, ChangePipelineForm, ChooseSensorForm, ChangeSensorForm

RUNTIME_MEDIA_PATH='/gadgetapp/staticfiles/inspection/media/runtime'
NGINX_MEDIA_PATH='../../static/inspection/media/runtime'
GADGET_APP_IMAGE_ARCHIVE_PATH='/gadgetapp/image_archive'
MEDIA_BUFFER=20

CANVAS_WIDTH=871
CANVAS_HEIGHT=703        

for index in range(len(INSPECTION_RESULT_KEYS)):
    keys=list(INSPECTION_RESULT_KEYS[index].values())
    keys=[str(x) for x in keys]
    path_i="/".join(keys)
    path_i=os.path.join(RUNTIME_MEDIA_PATH,path_i)
    if not os.path.isdir(path_i):
        logging.info(f'Creating media/runtime directory: {path_i}')
        os.makedirs(path_i)
    path_i=os.path.join(RUNTIME_MEDIA_PATH,INSPECTION_RESULT_KEYS[index]['sensor_topic'])
    if not os.path.isdir(path_i):
        logging.info(f'Creating media/runtime directory: {path_i}')
        os.makedirs(path_i)
        
# import abstract syntax trees to parse kwargs database fields
import ast

# import json to read log file
import json

logging.basicConfig(level=logging.INFO)

t0=datetime.min
t0=t0.replace(tzinfo=pytz.UTC)
persistent_timestamp=[t0 for i in range(len(INSPECTION_RESULT_KEYS))]
new_data_counter=[0 for i in range(len(INSPECTION_RESULT_KEYS))]

def get_category(current_decision):
    # classes_available=defect_list.split(",")
    try: 
        # convert decision to same type as AVAILABLE_DECISIONS
        current_decision = type(AVAILABLE_DECISIONS[1])(current_decision)
        decision_ID=AVAILABLE_DECISIONS.index(current_decision)
        logging.info(f'Decision: {current_decision} maps to ID: {decision_ID}')
    except:
        logging.warning(f'Decision: {current_decision} not being tracked. Setting to 0.')
        decision_ID=0
    plot_y=[0]*( len(AVAILABLE_DECISIONS) -1 )
    if decision_ID==0:
        return plot_y
    else:
        plot_i_y=plot_y
        plot_i_y[decision_ID-1]=1
        return plot_i_y

def query_inspection_events_table(index):
    # query InspectionEvent table by instance name, instance, and sensor topic
    # keep last row in the query
    event_try=INSPECTION_RESULT_KEYS[index]
    lastevent=InspectionEvent.objects.filter(
        instance_name=event_try['instance_name'],
        instance=event_try['instance'],
        sensor_topic=event_try['sensor_topic']).last()
    if not lastevent:
        lastevent=None
        logging.warning(f'No pipeline event found for: {event_try}')
    else:
        logging.info(f"Pipeline event found for sensor topic: {lastevent.sensor_topic}")  
    return lastevent

def check_inspection_event_time(lastevent,index):
    # check to see if the event time is greater than time threshold (=last valid event time)
    # NOTE: initial time set to datetime.min()
    # if so, reset time threshold to event time
    last_event_time=lastevent.event_time
    if last_event_time>persistent_timestamp[index]:
        persistent_timestamp[index]=last_event_time
        new_data=True
        logging.info(f'New inspection event at: {last_event_time}')
    else:
        new_data=False
    return new_data,last_event_time

def clean_media_dir():
    files=glob.glob(os.path.join(RUNTIME_MEDIA_PATH,'*.png'))
    nfiles=len(files)
    if nfiles > MEDIA_BUFFER:
        logging.info(f'Cleaning last {MEDIA_BUFFER} from media directory.')
        files.sort(reverse=True)
        for file in files[MEDIA_BUFFER:]:
            os.remove(os.path.join(RUNTIME_MEDIA_PATH,file))

def convert_2_png(raw_media_path):
    image_path=os.path.join(GADGET_APP_IMAGE_ARCHIVE_PATH,raw_media_path)
    fname=raw_media_path.replace('.gadget2d.pickle','.png')
    # create random file name
    # frandom=''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))+'.png'
    fpath_gadget=os.path.join(RUNTIME_MEDIA_PATH,fname)
    # get all files in media/runtime
    files=glob.glob(os.path.join(os.path.split(fpath_gadget)[0],'*.png'))
    convert_file=False if (fpath_gadget in files) else True
    # write the file if it doesn't exist
    if convert_file:
        t0=time.time() 
        path = Path(image_path)
        gimage = GadgetImage.load(path)
        image = gimage.visualize((CANVAS_WIDTH, CANVAS_HEIGHT))
        image.save(fpath_gadget)
        tf=time.time()
        for file in files:
            os.remove(file)
   
    fpath_nginx=os.path.join(NGINX_MEDIA_PATH,fname)
    return fpath_nginx      


def set_xy(chart_type,update_option,decision,index,err_dist=None):
    ''' 
    DESCRIPTION:
        Format data for chart update.  Line chart:(x,y), Bar chart: list with dummy variable 1 for inclusion, 0 otherwise
        y=0 for defects not existing in the list of AVAILABLE_DECISIONS
    ARGS:
        chart_type: 1-line, 2-bar
        update_option: 0-current value, 1-accumulate
        decision: single decision string
        index: sensor topic ID
    '''
    # split the decision string to get each defect
    # TODO: handle multiple defect, currently only captures first
    if type(decision)==list:
        decision = ",".join(decision)
    logging.info(f'Current decision list: {decision}')
    if type(decision)==str:
        try:
            # get first defect in the string
            decision=decision.split(',')[0]
            logging.info(f'Choosing {decision} from current decision list.')
        except:
            # if doesn't exist, then return default defect=none
            decision=AVAILABLE_DECISIONS[0]
            logging.warning(f'Empty decision list, choosing default decision: {decision}.')

    if chart_type==1:
        if update_option==0:
            x=new_data_counter[index]
            try:
                logging.info(f"Available decisions: {AVAILABLE_DECISIONS}")
                logging.info(f"Decision: {decision}, Type: {type(decision)}")
                y=AVAILABLE_DECISIONS.index(decision)
            except:
                if isinstance(decision, float) or isinstance(decision, int):
                    y=round(decision, 2)
                else:
                    logging.warning(f'Decision: {decision} not being tracked. Setting to 0.')
                    y=0
        elif update_option==1:
            x,y=None,None
            raise Exception(f'Charting Option {chart_type},{update_option} not supported.')
    elif chart_type==2:
        if update_option==0:
            x,y=None,None
            raise Exception(f'Charting Option {chart_type},{update_option} not supported.')
        elif update_option==1:
            x=None
            y=get_category(decision)
    elif chart_type==3:
        if update_option==0:
            if err_dist is not None:
                hist=np.histogram(err_dist,bins=100)
                bins=hist[1][:-1]
                vals = hist[0]
                x=bins.tolist()
                y=vals.tolist()
            else:
                raise Exception('Variable err_dist must exist to create a histogram.')       
        elif update_option==1:
            x,y=None,None
            raise Exception(f'Charting Option {chart_type},{update_option} not supported.')
    return x,y

@csrf_exempt
def ui_update(request):
    '''
    DESCRIPTION:
        Updates Gadget App HMI each time it is called by update_ui.js.  
        Key features:
        - 
    
    '''    
    if request.method == 'GET':
        # get ui data
        config_ui = get_object_or_404(ConfigUI, pk=1)
        # initialize dictionary used for each sensor event
        # new_data: integer that determines if HMI needs update for a particular sensor service
        # decision: model decision from pipeline
        # path: path to annotated image
        # charts: 
        # chart type: 0-line, 1-bar
        # plot update: 0-current, 1-accumulated
        # plot_x/_y: plot values
        inspection_dict_entry={'new_data':None,'decision':None,'path':None,'charts':None,'chart_type':None,'plot_update':None,'plot_x':None,'plot_y':None}
        inspection_dict={}

        # Step through list of available sensors... one or many inspection from ea sensor can occur during a Gadget App update period
        for index in range(len(INSPECTION_RESULT_KEYS)):
            # query inspection event table getting last row matching instance name, instance, and sensor topic
            current_inspection=query_inspection_events_table(index)
            if current_inspection is None:
                logging.warning('Gadet App inspection event query failed.')
                query_success=False
            else:
                query_success=True
            # check to see if the inspection query corresponds to new inspection data
            if query_success:
                new_data,last_event_time=check_inspection_event_time(current_inspection,index)
                if new_data:
                    new_data_counter[index]=new_data_counter[index]+1
            
            # initialize return dictionary
            inspection_dict[str(index)]=inspection_dict_entry.copy()
            # update new_data control variable (passed to ui_update.js for update control)
            inspection_dict[str(index)]['new_data']=new_data_counter[index]

            # set values in inspection dict
            if (query_success):
                # get the decision from the json field, if decision field is supported
                try:
                    # current_decision_try=current_inspection.context['results']['obj_det_classes']
                    current_decision_try=(current_inspection.context[CHART_KEYS[index]['plot_y_key'][0]], current_inspection.context[CHART_KEYS[index]['plot_y_key'][1]])
                except:
                    logging.warning(f'Key error for decision JSON field: {index} {CHART_KEYS[index]}. Assigned default decision: {AVAILABLE_DECISIONS[0]}')
                    current_decision_try=(AVAILABLE_DECISIONS[0], 0)

                # split the decision string to get each defect
                # TODO: handle multiple defect, currently only captures first

                try:
                    current_err_dist_try=current_inspection.context['results']['err_dist']
                except:
                    current_err_dist_try=np.zeros(100)
                    logging.warning(f'Error distribution not found.  Set to 0.')
                current_decision=current_decision_try
                current_err_dist=current_err_dist_try
                # get path to annotated image, modify to reference gadget app image archive volume
                raw_media_path=current_inspection.filename
                media_path=convert_2_png(raw_media_path)

                # set data structure passed back to AJAX for Gadget App updates
                inspection_dict[str(index)]['decision']=current_decision
                inspection_dict[str(index)]['path']=media_path
                inspection_dict[str(index)]['charts']=CHART_KEYS[index]['charts']
                inspection_dict[str(index)]['chart_type']=CHART_KEYS[index]['chart_type']
                inspection_dict[str(index)]['plot_update']=CHART_KEYS[index]['plot_update']
                plot_x=[]
                plot_y=[]
                # format data for chart updates
                for cnt,val in enumerate(CHART_KEYS[index]['chart_type']):
                    x,y=set_xy(val,CHART_KEYS[index]['plot_update'][cnt],current_decision[cnt],index,err_dist=current_err_dist)
                    plot_x.append(x)
                    plot_y.append(y)
                inspection_dict[str(index)]['plot_x']=plot_x
                inspection_dict[str(index)]['plot_y']=plot_y
                # update event count
                if (new_data and current_decision in AVAILABLE_DECISIONS[1:]): 
                    config_ui.count=config_ui.count+1
                    config_ui.save()

        # get status data     
        status_updates=RuntimeStatusLatest.objects.all()
        status_service_type=[]
        status_instance_name=[]
        status_instance=[]
        status_state=[]
        # build lists for each running service
        for current_status in status_updates:
            #current_status=get_object_or_404(RuntimeStatusLatest,pk=index+1)
            status_service_type.append(current_status.service_type)
            status_instance_name.append(current_status.instance_name)
            status_instance.append(current_status.instance)
            status_state.append(current_status.state)
        
        # parse for sensor
        status_service_type=np.array(status_service_type)
        status_instance_name=np.array(status_instance_name)
        status_instance=np.array(status_instance)
        status_state=np.array(status_state)
        sensor_instance=status_instance[status_service_type=='sensor']
        sensor_state=status_state[status_service_type=='sensor']
        # sort sensor from 0 to n
        sorted_sensor_state=[x for _,x in sorted(zip(sensor_instance,sensor_state))]
        
        # repeat for pipeline, automation, mqtt_bridge(cloud) - currently assumes 1 pipeline, 1 automation, 1 cloud
        sorted_pipeline_state= status_state[status_service_type=='pipeline']
        sorted_automation_state=status_state[status_service_type=='automation']
        sorted_cloud_state=status_state[status_instance_name=="mqtt_bridge"]

        state_dict={
            'sensor_state':sorted_sensor_state,
            'pipeline_state':sorted_pipeline_state.tolist(),
            'automation_state':sorted_automation_state.tolist(),
            'cloud_state':sorted_cloud_state.tolist(),
            }

        logging.info(f'State dictionary: {state_dict}')

        # media type (image or point cloud)
        media_type = config_ui.media_type
        # system state: running or stopped
        systemstate=get_object_or_404(SystemState,pk=1)
        is_running=systemstate.running

        d = {
                'state_dict':state_dict,
                'inspection_dict':inspection_dict,
                'media_type': media_type,
                'is_running':is_running,
                'info_display_0_value': None,
                'info_display_1_value': None,
                'info_display_2_value': str(config_ui.count),
            }

        # data_json = json.dumps(d)
        # return HttpResponse(data_json)

        return JsonResponse(d,status=200)


def event_reset(request):
    if request.method == "POST":
        uiconfigs = get_object_or_404(ConfigUI, pk=1)
        uiconfigs.count = 0
        uiconfigs.save()

    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))


def error_refresh_view(request, exception):
    logging.warning(exception)
    logging.warning(f"Django error, taking to redirect page...")
    return render(request, "403_csrf.html")  # standard error redirect page


def error_500_refresh_view(request):
    logging.warning("FringeAI Django error, taking to redirect page...")
    return render(request, "403_csrf.html")  # standard error redirect page


def views_automation_config(request):
    # get UIdata
    ui = get_object_or_404(ConfigUI, pk=1)
    title = ui.title
    # check request.method to see if user is posting new data
    if request.method == "POST":
        if request.POST.get("form_type") == "Change Automation Parameters":
            # get current automation configs
            user_automation_configs=get_object_or_404(UserAutomationConfig,pk=1)
            # modify configs
            form = ChangeAutomationForm(request.POST,instance=user_automation_configs)
            if form.is_valid():
                # commit changes
                user_automation_configs = form.save(commit=False)
                user_automation_configs.save()
                automation_configs=get_object_or_404(AutomationConfig)
                custom=automation_configs.custom
                field_names=[f.name for f in user_automation_configs._meta.get_fields()]
                for field in field_names[1:]:
                    custom[field]=getattr(user_automation_configs,field)
                # commit new system configs
                automation_configs.custom=custom
                automation_configs.save()
        if request.POST.get("form_type") == "":
            pass

    # get current automation
    automation_configs=get_object_or_404(AutomationConfig)
    user_automation_configs=get_object_or_404(UserAutomationConfig,pk=1)
    field_names=[f.name for f in user_automation_configs._meta.get_fields()]
    jsonfields=automation_configs.custom
    for field in field_names[1:]:
        try:
            setattr(user_automation_configs,field,jsonfields[field])
        except:
            logging.warning(f'Config {field} not supported by automation service.')
    user_automation_configs.save()
    # initialize forms with database settings
    form_change_automation = ChangeAutomationForm(instance=user_automation_configs)

    # get current UI configs
    ui = get_object_or_404(ConfigUI, pk=1)

    systemstate=get_object_or_404(SystemState)
    is_running=systemstate.running

    # pass forms/data to html
    context = {'title': title, 'form_change_automation':form_change_automation,
               'ui': ui, 'is_running': is_running}

    return render(request, 'inspection/automation_config.html', context)


def views_pipeline_config(request):
    # get UIdata
    ui = get_object_or_404(ConfigUI, pk=1)
    title = ui.title
    # check request.method to see if user is posting new data
    if request.method == "POST":
        if request.POST.get("form_type") == "Choose Pipeline":
            # get current sensor
            pipeline_selector = get_object_or_404(UserPipelineSelector, pk=1)
            # choose new pipeline
            form = ChoosePipelineForm(request.POST, instance=pipeline_selector)
            if form.is_valid():
                # commit new pipeline selection
                pipeline_selector = form.save(commit=False)
                pipeline_selector.save()
        if request.POST.get("form_type") == "Change Pipeline Parameters":
            # get current pipeline configs
            user_pipeline_configs=get_object_or_404(UserPipelineConfig,pk=1)
            # modify configs
            form = ChangePipelineForm(request.POST,instance=user_pipeline_configs)
            if form.is_valid():
                # commit changes
                user_pipeline_configs = form.save(commit=False)
                user_pipeline_configs.save()
                # get system config data and map new configs from user data
                pipeline_selector = get_object_or_404(UserPipelineSelector, pk=1)
                pipeline_configs = pipeline_selector.current_pipeline
                custom=pipeline_configs.custom
                field_names=[f.name for f in user_pipeline_configs._meta.get_fields()]
                for field in field_names[1:]:
                    custom[field]=getattr(user_pipeline_configs,field)
                # commit new system configs
                pipeline_configs.custom=custom
                pipeline_configs.save()
        if request.POST.get("form_type") == "":
            pass

    # get current pipeline
    pipeline_selector = get_object_or_404(UserPipelineSelector, pk=1)
    pipeline_configs = pipeline_selector.current_pipeline
    # get user pipeline configs
    user_pipeline_configs=get_object_or_404(UserPipelineConfig,pk=1)
    field_names=[f.name for f in user_pipeline_configs._meta.get_fields()]
    jsonfields=pipeline_configs.custom
    for field in field_names[1:]:
        try:
            setattr(user_pipeline_configs,field,jsonfields[field])
        except:
            logging.warning(f'Config {field} not supported by pipeline service.')
    user_pipeline_configs.save()
    # initialize forms with database settings
    form_choose_pipeline = ChoosePipelineForm(instance=pipeline_selector)
    form_change_pipeline = ChangePipelineForm(instance=user_pipeline_configs)

    # get current UI configs
    ui = get_object_or_404(ConfigUI, pk=1)
    systemstate=get_object_or_404(SystemState)
    is_running=systemstate.running

    # pass forms/data to html
    context = {'title': title, 'form_choose_pipeline': form_choose_pipeline,'form_change_pipeline':form_change_pipeline,
               'ui': ui, 'is_running': is_running}

    return render(request, 'inspection/pipeline_config.html', context)


def views_sensor_config(request):
    # get UIdata
    ui = get_object_or_404(ConfigUI, pk=1)
    title = ui.title
    # check request.method to see if user is posting new data
    if request.method == "POST":
        if request.POST.get("form_type") == "Choose Sensor":
            # get current sensor
            sensor_selector = get_object_or_404(UserSensorSelector, pk=1)
            # choose new sensor
            form = ChooseSensorForm(request.POST, instance=sensor_selector)
            if form.is_valid():
                # commit new sensor selection
                sensor_selector = form.save(commit=False)
                sensor_selector.save()
        if request.POST.get("form_type") == "Change Sensor Parameters":
            # get current sensor configs
            user_sensor_configs=get_object_or_404(UserSensorConfig,pk=1)
            # modify configs
            form = ChangeSensorForm(request.POST,instance=user_sensor_configs)
            if form.is_valid():
                # commit changes
                user_sensor_configs = form.save(commit=False)
                user_sensor_configs.save()
                # get system config data and map new configs from user data
                sensor_selector = get_object_or_404(UserSensorSelector, pk=1)
                sensor_configs = sensor_selector.current_sensor
                custom=sensor_configs.custom
                field_names=[f.name for f in user_sensor_configs._meta.get_fields()]
                for field in field_names[1:]:
                    custom[field]=getattr(user_sensor_configs,field)
                # commit new system configs
                sensor_configs.custom=custom
                sensor_configs.save()
        if request.POST.get("form_type") == "":
            pass

    # get current sensor
    sensor_selector = get_object_or_404(UserSensorSelector, pk=1)
    sensor_configs = sensor_selector.current_sensor
    # get user sensor configs
    user_sensor_configs=get_object_or_404(UserSensorConfig,pk=1)
    field_names=[f.name for f in user_sensor_configs._meta.get_fields()]
    jsonfields=sensor_configs.custom
    for field in field_names[1:]:
        try:
            setattr(user_sensor_configs,field,jsonfields[field])
        except:
            logging.warning(f'Config {field} not supported by sensor service.')
    user_sensor_configs.save()
    # initialize forms with database settings
    form_choose_sensor = ChooseSensorForm(instance=sensor_selector)
    form_change_sensor = ChangeSensorForm(instance=user_sensor_configs)

    # get current UI configs
    ui = get_object_or_404(ConfigUI, pk=1)
    systemstate=get_object_or_404(SystemState)
    is_running=systemstate.running

    # pass forms/data to html
    context = {'title': title, 'form_choose_sensor': form_choose_sensor,'form_change_sensor':form_change_sensor,
               'ui': ui, 'is_running': is_running}

    return render(request, 'inspection/sensor_config.html', context)


def toggle_start_stop(request):
    # dummy url pattern used to call a function in views.py that does NOT return a new URL
    logging.info('Start/Stop button pressed')
    
    systemstate=get_object_or_404(SystemState,pk=1)
    is_running=systemstate.running
    
    # function for resetting state 
    def reset_service(model,start_state):
        jsonfield=model.custom
        jsonfield['start']=start_state
        model.custom=jsonfield
        model.save()

    # any of the services are down, then start all
    if not is_running:
        logging.info('System is stopped.')
        for sensor in SensorConfig.objects.all():
            reset_service(sensor,True)
        for automation in AutomationConfig.objects.all():
            reset_service(automation,True)
        logging.info('Attempting to start all sensor and automation services.')
        systemstate.running=True
    else:
        logging.info('System is running.')
        for sensor in SensorConfig.objects.all():
            reset_service(sensor,False)
        for automation in AutomationConfig.objects.all():
            reset_service(automation,False)
        logging.info('Attempting to stop all sensor and automation services.')
        systemstate.running=False
    systemstate.save()

    return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))