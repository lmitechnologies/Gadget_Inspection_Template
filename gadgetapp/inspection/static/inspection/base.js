const INDEX_BUTTON=document.querySelector('#index')
const DASH_BUTTON=document.querySelector('#dashboard');
const MODEL_CONFIG_BUTTON=document.querySelector('#model-button')
const SENSOR_CONFIG_BUTTON=document.querySelector('#sensor-button')
const automation_CONFIG_BUTTON=document.querySelector('#automation-button');

const PLAY_BUTTON=document.querySelector('#play-button');

function goto_index() {
    location.href="/"
}

function goto_dash() {
    location.href="/inspection/dashboard"
}

function goto_pipeline_config() {
    location.href="/inspection/pipeline_config"
}

function goto_sensor_config() {
    location.href="/inspection/sensor_config"
}

function goto_automation_config() {
    location.href="/inspection/automation_config"
}

if (INDEX_BUTTON!=null) {
    INDEX_BUTTON.addEventListener("click",goto_index, false);
}
if (DASH_BUTTON!=null) {
    DASH_BUTTON.addEventListener("click",goto_dash, false);
}
if (MODEL_CONFIG_BUTTON!=null) {
    MODEL_CONFIG_BUTTON.addEventListener("click", goto_pipeline_config, false);
}
if (SENSOR_CONFIG_BUTTON!=null) {
    SENSOR_CONFIG_BUTTON.addEventListener("click", goto_sensor_config, false);
}
if (automation_CONFIG_BUTTON!=null) {
    automation_CONFIG_BUTTON.addEventListener("click", goto_automation_config, false);
}



