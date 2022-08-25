import { update_line } from "./update_plots.js";
import { update_bar } from "./update_plots.js";
import { update_2D } from "./update_media.js";
import { update_3D } from "./update_media.js";

window.onload = function () {
  //https://www.w3schools.com/jsref/met_win_setinterval.asp
  setInterval(function () {
    get_app_data();
  }, 500);
};

//check variable for new data
var new_data_counter = 0;

function get_app_data() {
  //https://api.jquery.com/jquery.ajax/

  console.debug("Update app query: ", new_data_counter);
  var new_data = false;
  $.ajax({
    dataType: "json",
    url: "/ui_update",
    type: "GET",
    success: function (data) {
      console.debug("[INFO] Successful Get.", data);
      // update module_ready indicators
      var led_sensor = document.querySelector("#ready_sensor");
      var ready_sensor = data.sensor_ready;
      update_LED(led_sensor, ready_sensor);
      var led_model = document.querySelector("#ready_model");
      var ready_model = data.model_ready;
      update_LED(led_model, ready_model);
      var led_automation = document.querySelector("#ready_automation");
      var ready_automation = data.automation_ready;
      update_LED(led_automation, ready_automation);
      var led_cloud = document.querySelector("#ready_cloud");
      var ready_cloud = data.cloud_ready;
      update_LED(led_cloud, ready_cloud);

      var start_button = document.querySelector("#play-button-selector");
      var is_running = data.is_running;
      update_STARTSTOP(start_button, is_running);

      var current_count = parseInt(data.event_count);
      if (current_count == new_data_counter || isNaN(current_count)) {
        new_data = false;
      } else {
        console.log("[INFO] New data detected.");
        new_data = true;
        new_data_counter = current_count;
      }
      if (new_data) {
        //get media data
        var media_path = data.media_path;
        var media_type = parseInt(data.media_type);
        var canvas_id = data.canvas_id;

        //get UI text data data
        var info_display_0_value = data.info_display_0_value;
        var info_display_1_value = data.info_display_1_value;
        var info_display_2_value = data.info_display_2_value;

        //get UI plot data
        var plot_0 = parseInt(data.plot_0);
        var plot_0_x = data.plot_0_x;
        var plot_0_y = data.plot_0_y;
        var plot_1 = parseInt(data.plot_1);
        var plot_1_x = data.plot_1_x;
        var plot_1_y = data.plot_1_y;
        var plot_2 = parseInt(data.plot_2);
        var plot_2_x = data.plot_2_x;
        var plot_2_y = data.plot_2_y;

        //update information
        update_ui_information(
          info_display_0_value,
          info_display_1_value,
          info_display_2_value
        );

        //update plots
        update_ui_plots(
          plot_0,
          plot_0_x,
          plot_0_y,
          plot_1,
          plot_1_x,
          plot_1_y,
          plot_2,
          plot_2_x,
          plot_2_y
        );

        //update canvas
        update_ui_media(media_type, media_path, canvas_id, current_count);
      }
    },
  });
}

function update_ui_information(
  info_display_0_value,
  info_display_1_value,
  info_display_2_value
) {
  console.log("[INFO] Updating data.");

  //update static text
  var d0v = document.querySelector("#display_0_value");
  if (d0v !== null) {
    d0v.innerHTML = info_display_0_value;
  }
  var d1v = document.querySelector("#display_1_value");
  if (d1v !== null) {
    d1v.innerHTML = info_display_1_value;
  }
  var d2v = document.querySelector("#display_2_value");
  if (d2v !== null) {
    d2v.innerHTML = info_display_2_value;
  }
}

function update_ui_plots(
  plot_0,
  plot_0_x,
  plot_0_y,
  plot_1,
  plot_1_x,
  plot_1_y,
  plot_2,
  plot_2_x,
  plot_2_y
) {
  //update plots
  if (plot_0 != 0) {
    var canvas_0 = document.querySelector("#param_0_plot");
    plot_selector(canvas_0, plot_0, plot_0_x, plot_0_y);
  }
  if (plot_1 != 0) {
    var canvas_1 = document.querySelector("#param_1_plot");
    plot_selector(canvas_1, plot_1, plot_1_x, plot_1_y);
  }
  if (plot_2 != 0) {
    var canvas_2 = document.querySelector("#param_2_plot");
    plot_selector(canvas_2, plot_2, plot_2_x, plot_2_y);
  }
}

function plot_selector(canvas, plot_option, plot_x, plot_y) {
  // direct update plot
  switch (plot_option) {
    case 0:
      break;
    case 1:
      update_line(canvas, plot_x, plot_y);
      break;
    case 2:
      update_bar(canvas, plot_y);
      break;
  }
}

function update_ui_media(media_type, media_path, canvas_id, current_count) {
  var current_canvas = "#media_" + canvas_id + "_canvas";
  var canvas_media = document.querySelector(current_canvas);
  var media_viewer = canvas_media.data;
  switch (media_type) {
    case 0:
      update_2D(media_viewer, media_path);
      break;
    case 1:
      update_3D(media_viewer, media_path, current_count);
      break;
  }
}

function update_LED(dom_object, ready_new) {
  var led_state = dom_object.className;
  var ready_state = false;
  if (led_state == "led-red") {
    ready_state = false;
  } else {
    ready_state = true;
  }
  if (ready_state != ready_new) {
    if (ready_new == true) {
      dom_object.className = "led-green";
    } else {
      dom_object.className = "led-red";
    }
  }
}

function update_STARTSTOP(dom_object, is_running) {
  var running_state = dom_object.value;
  var ready_state = false;
  if (running_state == "START") {
    ready_state = false;
  } else {
    ready_state = true;
  }
  if (ready_state != is_running) {
    if (is_running == true) {
      dom_object.value = "STOP";
    } else {
      dom_object.value = "START";
    }
  }
}