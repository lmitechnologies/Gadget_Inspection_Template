#%%
from ast import In
from hashlib import new
from multiprocessing import context
import os
from sre_constants import IN
import django
import glob
import collections
import time
import random
import shutil
from datetime import datetime
import pytz

os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 'gadgetapp.settings'
)

django.setup()


#%% 
from inspection.models import SystemState, AVAILABLE_DECISIONS, INSPECTION_RESULT_KEYS
from configs.models import AutomationConfig, SensorConfig, PipelineConfig
from inspection_events.models import PipelineInspectionEventLatest, InspectionEvent
from runtime.models import RuntimeStatusLatest

dsts=[
    '/app/image_archive/pipeline/huhtumaki-pipeline/0/sensor/gadget-sensor-gocator/0',
    '/app/image_archive/pipeline/huhtumaki-pipeline/0/sensor/gadget-sensor-avt/0',
    '/app/image_archive/pipeline/huhtumaki-pipeline/1/sensor/gadget-sensor-avt/1',
    '/app/image_archive/pipeline/huhtumaki-pipeline/2/sensor/gadget-sensor-avt/2']

test_image_dirs=[
    './test_images/sensor_0',
    './test_images/sensor_1',
    './test_images/sensor_2',
    './test_images/sensor_3']

dirs=zip(dsts,test_image_dirs)

for dst,tid in dirs:
    if not os.path.exists(dst):
        os.makedirs(dst)
    images=glob.glob(os.path.join(tid,'*.npy'))
    for image in images:
        shutil.copy2(image,dst)


def update_ready_indicators(component, value):
    q=RuntimeStatusLatest.objects.get(pk=component)
    q.state=value
    q.save()

def update_inspection_event(topicKey,decision,path):
    # q=PipelineInspectionEventLatest.objects.get(pk=topicID+1)
    newinspection=InspectionEvent()
    event_time=datetime.now().replace(tzinfo=pytz.UTC)
    newinspection.event_time=event_time
    newinspection.service_type=INSPECTION_RESULT_KEYS[topicKey]['service_type']
    newinspection.instance_name=INSPECTION_RESULT_KEYS[topicKey]['instance_name']
    newinspection.instance=INSPECTION_RESULT_KEYS[topicKey]['instance']
    newinspection.sensor_topic=INSPECTION_RESULT_KEYS[topicKey]['sensor_topic']

    context=newinspection.context
    
    if (context is None):
        context={}

    context['decision']=decision
    newinspection.context=context

    fname=os.path.split(path)[1]
    fname=os.path.splitext(fname)[0]+'.npy'
    localpath=os.path.join(
        INSPECTION_RESULT_KEYS[topicKey]['service_type'],
        INSPECTION_RESULT_KEYS[topicKey]['instance_name'],
        str(INSPECTION_RESULT_KEYS[topicKey]['instance']),
        INSPECTION_RESULT_KEYS[topicKey]['sensor_topic'],
        fname
    )
    print(f'[INFO] Local path: {localpath}')
    newinspection.filename=localpath
    newinspection.save()

# %%
if __name__ == '__main__':
    # variable overhead
    module_list=[1,2,3,4,5,6,7,8,9,10]
    defect_list=AVAILABLE_DECISIONS
    sensor_topic_list=[0,1,2,3]
    state_list=['RUNNING','INITIALIZING','STOPPED']
    sensor_topic_deq=collections.deque(sensor_topic_list)
    module_deq=collections.deque(module_list)
    state_deq=collections.deque(state_list)
    count0, count1=1,1

    all_images=[]
    for path in test_image_dirs:
        all_images.append(glob.glob(path+'/*.npy'))

    while True:
        #---
        topic=sensor_topic_deq[0]
        module=module_deq[0]
        state=state_deq[0]
        time.sleep(1)
        #---
        update_ready_indicators(module,state)
        images=all_images[topic]
        defect=random.choice(defect_list)
        path=random.choice(images)
        update_inspection_event(topic,defect,path)
        print(f'Count={count0}')
        
        if count0%len(module_list)==0:
            print(('[INFO] Change service state.'))
            module_deq.rotate(-1)
            if count1%len(module_list)==0:
                state_deq.rotate(-1)
            count1+=1

        sensor_topic_deq.rotate(-1)
        count0+=1
