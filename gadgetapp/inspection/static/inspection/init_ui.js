import {init_2D} from './init_media.js'
import {init_3D} from './init_media.js'
import {init_line} from './init_plots.js'
import {init_bar} from './init_plots.js'
import {init_hist} from './init_plots.js'

function init_plot(parent_div_object,canvas_object,plot_i,buffer,xinit,yinit,xlabel,ylabel) {
    //initialize plots
    canvas_object.height=parent_div_object.clientHeight;
    canvas_object.width=parent_div_object.clientWidth;
    var ctx=canvas_object.getContext('2d');
    switch(plot_i) {
        case 0:
            // none
            var chart_object=undefined;
            break;
        case 1:
            // line charts
            var chart_object=init_line(ctx,buffer,xinit,yinit,xlabel,ylabel)
            break;
        case 2:
            // bar charts
            xlabel=xlabel.split()
            var chart_object=init_bar(ctx,yinit,xlabel,ylabel)
            break;
        case 3:
            // histogram
            var chart_object=init_hist(ctx)
            break;
    }
    canvas_object.data=chart_object;
}
export {init_plot}

function init_media(parent_div_object,canvas_object,media_type) {
    canvas_object.height=parent_div_object.clientHeight;  //pad to make room for vertical alignment helper
    canvas_object.width=parent_div_object.clientWidth;

    switch(media_type) {
        case 0:
            //2D plot, returns image object with onload callback
            var image_path="../../static/inspection/media/lmi_technologies_cube_RGB.png";
            var media_viewer=init_2D(canvas_object,image_path);
            break;
        case 1:
            //3D plot, returns 3D object including:camera, scene, renderer, controls, datasource
            var media_viewer=init_3D(canvas_object);
            break;
    }
    canvas_object.data=media_viewer;
}
export {init_media}