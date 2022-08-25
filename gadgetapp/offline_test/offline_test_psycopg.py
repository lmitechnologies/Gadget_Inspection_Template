#!/usr/bin/python

import psycopg2
import time
import random
import glob
import collections
import shutil
import os

shutil.copytree('/app/test_images','/app/staticfiles/inspection/media/test_images')

def set_postgres(command):
    conn = None
    try:
        # read database configuration
        params = {'host':'db','database':'postgres','user':'postgres','password':'postgres'}
        # connect to the PostgreSQL database
        conn = psycopg2.connect(**params)
        # create a new cursor
        cur = conn.cursor()
        # execute the UPDATE  statement
        cur.execute(command)
        # Commit the changes to the database
        conn.commit()
        # Close communication with the PostgreSQL database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def update_ready_indicators(component, value):
    """ update ready indicator based on the module """
    psql = f'UPDATE inspection_statesystem SET {component} = {value} WHERE id = 1'
    set_postgres(psql)

def update_event_counter(value):
    """ update ready indicator based on the module """
    psql = f'UPDATE inspection_performanceautomation SET count = {value} WHERE id = 1'
    set_postgres(psql)
    
def update_media(sensor_topic,path):
    psql = f"UPDATE inspection_configui SET media_path_{sensor_topic} = '../../static/inspection/media/test_images/{os.path.split(path)[1]}' WHERE id = 1"
    set_postgres(psql)

def update_plot(id,value):
    """ update ready indicator based on the module """
    psql = f'UPDATE inspection_performancemodel SET defect = {value} WHERE id = {id}'
    set_postgres(psql)   

if __name__ == '__main__':
    # variable overhead
    module_list=['sensor_ready','model_ready','automation_ready','cloud_ready']
    defects=[0,1,2,3,4]
    state_list=['true','false']
    images=glob.glob('./test_images/*.png')
    sensor_topic=collections.deque([0,1,2])
    count=0
    while True:
        #---
        time.sleep(0.250)
        #---
        module=random.choice(module_list)
        state=random.choice(state_list)
        update_ready_indicators(module,state)
        #---
        # topic=list(sensor_topic.rotate(-1))[0]
        path=random.choice(images)
        defect=random.choice(defects)
        update_plot(1,defect)
        update_media(0,path)
        path=random.choice(images)
        defect=random.choice(defects)
        update_plot(2,defect)
        update_media(1,path)
        path=random.choice(images)
        defect=random.choice(defects)
        update_plot(3,defect)
        update_media(2,path)
        update_event_counter(count)
        count+=1



