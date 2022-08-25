function update_2D(media_viewer, media_path) {
    media_viewer.src = media_path;
    console.log("Updated image.");
  }
  export { update_2D };
  
  function update_3D(media_viewer, media_path, new_data_counter) {
    media_viewer.filename = media_path;
    media_viewer.frame_id = new_data_counter;
    media_viewer.loadNext();
    console.log("Updated point cloud.");
  
    var animate = function () {
      requestAnimationFrame(animate);
      media_viewer.controls.update();
      media_viewer.renderer.render(media_viewer.scene, media_viewer.camera);
    };
  
    animate();
  }
  export { update_3D };