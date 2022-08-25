import * as THREE from "./three/src/three.module.js";
import { PCDLoaderWithROI } from "./three/src/PCDLoaderWithROI.js";
import { TrackballControls } from "./three/src/TrackballControls.js";
import { MapControls } from "./three/src/OrbitControls.js";
import { ConvexGeometry } from "./three/src/ConvexGeometry.js";

const ORTHO = false;
const CONTROLS = "map";

// -------------------------------------------
function init_2D(canvas_object, image_path) {
  var ctx = canvas_object.getContext("2d");
  var datasource = new Image();
  datasource.onload = function () {
    // save initial transform
    ctx.save();
    ctx.clearRect(0, 0, canvas_object.width, canvas_object.height);
    // move to center of canvas
    ctx.translate(canvas_object.width / 2, canvas_object.height / 2);
    var scale;
    // don't rotate the logo, otherwise rotate the image by 90 degrees
    if (datasource.src.indexOf("fringeLOGO.png") !== -1) {
      // fit image onto canvas
      var scale = datasource.height / canvas_object.height;
      if (canvas_object.height / scale > canvas_object.height) {
        scale = datasource.width / canvas_object.width;
      }
    } else {
      // fit image onto canvas
      // height and width are switched because the image will be rotated
      var scale = datasource.width / canvas_object.height;
      if (canvas_object.height / scale > canvas_object.height) {
        scale = datasource.height / canvas_object.width;
      }
      // // rotate the image by 90 degrees
      // ctx.rotate(Math.PI / 2);
    }
    var imgWidth = datasource.width / scale;
    var imgHeight = datasource.height / scale;
    ctx.drawImage(
      datasource,
      -(imgWidth / 2),
      -(imgHeight / 2),
      imgWidth,
      imgHeight
    );
    // restore saved transform
    ctx.restore();
  };
  datasource.src = image_path;
  return datasource;
}
export { init_2D };

// -------------------------------------------
function init_3D(canvas) {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  var innerWidth = canvas.width;
  var innerHeight = canvas.height;
  var aspect = innerWidth / innerHeight;

  if (ORTHO) {
    var frustumSize = 400;
    var camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      2000
    );
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 300;
  } else {
    var camera = new THREE.PerspectiveCamera(50, aspect, 1, 1000);
    camera.position.x = 100;
    camera.position.y = 100;
    camera.position.z = 300;
  }
  camera.up.set(0, 0, 1);

  scene.add(camera);

  var renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);

  if (CONTROLS == "trackball")
    var controls = new TrackballControls(camera, renderer.domElement);
  else if (CONTROLS == "map")
    var controls = new MapControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.5;
  controls.zoomSpeed = 0.5;
  controls.panSpeed = 2.0;

  controls.noZoom = false;
  controls.noPan = true;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.minDistance = 0.3;
  controls.maxDistance = 0.3 * 2500;

  window.addEventListener("keypress", keyboard);

  var pcd_viewer = new PcdViewer(camera, scene, renderer, controls);

  return pcd_viewer;
}
export { init_3D };

class PcdViewer {
  constructor(camera, scene, renderer, controls) {
    this.point_size = 1;
    this.loader = new PCDLoaderWithROI();
    this.frame_id = 0;
    this.filename = "NONE";
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.controls = controls;
  }

  loadCallback({ cloud_mesh, roi_meshes }) {
    this.clear_scene();
    this.scene.add(cloud_mesh);
    // roi_meshes.forEach((roi_mesh) => {
    // 	this.scene.add( roi_mesh );
    // });
  }

  setupAfterFirst({ cloud_mesh, roi_meshes }) {
    let { center, radius } = cloud_mesh.geometry.boundingSphere;
    this.controls.target.set(center.x, center.y, center.z);
    this.camera.zoom = 250 / radius;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  loadNext() {
    this.loader.load(this.filename, this.point_size, (res) => {
      if (this.frame_id == 1) {
        this.setupAfterFirst(res);
      }
      this.loadCallback(res);
    });
  }

  update_point_size(mult) {
    var points = this.scene.getObjectByName("cloud");
    points.material.size *= mult;
    points.material.needsUpdate = true;
    this.point_size = points.material.size;
    console.log("new point size", points.material.size);
  }

  clear_scene() {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
  }
}

function keyboard(ev) {
  var canvas_media = document.querySelector("#media_canvas");
  var media_viewer = canvas_media.data;

  switch (ev.key || String.fromCharCode(ev.keyCode || ev.charCode)) {
    case "+":
      media_viewer.update_point_size(1.2);
      break;

    case "-":
      media_viewer.update_point_size(0.8);
      break;
  }
}