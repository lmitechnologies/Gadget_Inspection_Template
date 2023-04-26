import {update_line} from './update_plots.js'
import {update_bar} from './update_plots.js'
import {update_2D} from './update_media.js';
import {update_3D} from './update_media.js';

window.onload=function() { 
    //https://www.w3schools.com/jsref/met_win_setinterval.asp
    setInterval(function(){get_app_data()},500);
}

//persistent data counter.
var MAX_DEPTH=10;
var new_data_counter=new Array(MAX_DEPTH).fill(0);

function get_app_data() {
    //https://api.jquery.com/jquery.ajax/
    var new_data=false;
    $.ajax({
        dataType: "json",
        url: "/ui_update",
        type: "GET",
        success: function(data) {
            // console.log('[INFO] Successful Get.', data);
            // UPDATE STATE
            // sensor:
            var sensor_state_array=data.state_dict.sensor_state;
            var n_sensors=sensor_state_array.length;
            var led_sensor;
            var ready_sensor;
            for (let sc=0; sc<n_sensors; sc++) {
                led_sensor=document.querySelector('#ready_sensor_'+sc);
                ready_sensor=data.state_dict.sensor_state[sc];
                update_LED(led_sensor,ready_sensor);
            }
            // model
            var ready_model_array=data.state_dict.pipeline_state;
            var n_pipelines=ready_model_array.length;
            var led_model;
            var ready_model
            for (let pc=0; pc<n_pipelines; pc++) {
                led_model=document.querySelector('#ready_pipeline_'+pc);
                ready_model=data.state_dict.pipeline_state[pc];
                update_LED(led_model,ready_model);
            }
            // automation
            var led_automation=document.querySelector('#ready_automation');
            var ready_automation=data.state_dict.automation_state;
            update_LED(led_automation,ready_automation);
            // cloud
            var led_cloud=document.querySelector('#ready_cloud');
            var ready_cloud=data.state_dict.cloud_state;
            update_LED(led_cloud,ready_cloud);
            // play button
            var start_button=document.querySelector('#play-button-selector');
            var is_running=data.is_running;
            update_STARTSTOP(start_button,is_running);

            // UPDATE INSPECTION
            var current_count=new Array(n_sensors).fill(0);
            for (let sc=0; sc<n_sensors; sc++) {
                current_count=parseInt(data.inspection_dict[sc].new_data);
                if (current_count==new_data_counter[sc] || current_count==0 ) {
                    new_data=false;
                } else {
                    console.log('[INFO] New data detected.');
                    new_data=true;
                    new_data_counter[sc]=current_count;
                }
                if (new_data) 
                {   
                    // update Media
                    var media_path=data.inspection_dict[sc].path;
                    var media_type=parseInt(data.media_type);
                    try {
                            //update canvas
                            update_ui_media(media_type,media_path,sc,current_count[sc]);
                        } catch (e) {
                            console.error(e);
                        }
                    // update charts
                    var nchart;
                    var update_charts=true;
                    try {
                        nchart=data.inspection_dict[sc].charts.length
                    } catch (e) {
                        console.error(e);
                        update_charts=false;
                    }
                    if (update_charts)
                    {
                        for (let cc=0; cc<nchart; cc++) {
                            update_ui_plots(data.inspection_dict[sc].charts[cc],
                                data.inspection_dict[sc].chart_type[cc],
                                data.inspection_dict[sc].plot_update[cc],
                                data.inspection_dict[sc].plot_x[cc],
                                data.inspection_dict[sc].plot_y[cc])
                        }
                    }
                    //update UI information
                    var info_display_0_value = data.info_display_0_value
                    var info_display_1_value = data.info_display_1_value
                    var info_display_2_value = data.info_display_2_value
                    try {
                        update_ui_information(info_display_0_value, info_display_1_value, info_display_2_value);
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {

        var elem = document.getElementsByClassName('led-blue')
        
        for(var i=0; i<elem.length; i++){
            var led = document.querySelector('#'+elem[i].id);
            update_LED(led, "STOPPED")
        }

        elem = document.getElementsByClassName('led-green')
        
        for(var i=0; i<elem.length; i++){
            var led = document.querySelector('#'+elem[i].id);
            update_LED(led, "STOPPED")
        }
    })
}

function update_ui_information(info_display_0_value, info_display_1_value, info_display_2_value) 
{
    console.log('[INFO] Updating data.');

    //update static text
    var d0v=document.querySelector('#display_0_value');
    if (d0v!==null) {
        d0v.innerHTML = info_display_0_value;
    }
    var d1v=document.querySelector('#display_1_value');
    if (d1v!==null) {
        d1v.innerHTML = info_display_1_value;
    }
    var d2v=document.querySelector('#display_2_value');
    if (d2v!==null) {
        d2v.innerHTML = info_display_2_value;
    }
}

function update_ui_plots(canvas_ID,chart_option,plot_update,x,y)
{
    var canvas=document.querySelector('#param_'+canvas_ID+'_plot');
    if(x.length == y.length){
        for (let i = 0; i < x.length; i++){
            plot_selector(canvas,chart_option,plot_update,x[i],y[i]);
        }
    } else {
        console.log("X and Y values don't match. Ignoring chart update")
    }
}
    

function plot_selector(canvas, plot_option, plot_update, plot_x, plot_y) {
    // direct update plot
    switch (plot_option) {
        case 0:
            break;
        case 1:
            update_line(canvas,plot_x,plot_y);
            break;
        case 2:
            update_bar(canvas,plot_update,plot_y);
            break;
    }
}

function update_ui_media(media_type,media_path,canvas_id,current_count) {
    var current_canvas = "#media-canvas-" + canvas_id;
    var canvas_media=document.querySelector(current_canvas);
    var media_viewer=canvas_media.data;
    switch (media_type) {
        case 0:
            update_2D(media_viewer,media_path);
            break;
        case 1:
            update_3D(media_viewer,media_path,current_count);
            break;
    }
}

function update_LED(dom_object,ready_new) {
    var i="INITIALIZING";
    var s="STOPPED";
    var r="RUNNING";

    var led_state=dom_object.className;
       
    if (ready_new==i) {
        dom_object.className='led-yellow';
    } else if (ready_new==r) {
        dom_object.className='led-green';
    } else {
        dom_object.className='led-red';
    }
}

function update_STARTSTOP(dom_object,is_running) {
    // Updates start/stop button on all client devices so that state is consistent.
    // The actual state is changed by method update_start_stop() in views.py
    // Test by changing state from a different browser - observe that the state on the current
    // browser will track.
    var running_state=dom_object.value;
    var ready_state=false;
    if (running_state=="START") {
        ready_state=false;
    } else {
        ready_state=true;
    }
    if (ready_state!=is_running) {
        if (is_running==true) {
            dom_object.value='STOP';
        } else {
            dom_object.value='START';
        }
    }
}

