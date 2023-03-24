function update_line(canvas_object,x,y) { 
    var chart_line=canvas_object.data;
    if (typeof chart_line !== 'undefined') {
        //remove data
        chart_line.data.labels.shift();
        chart_line.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
        //add new data
        chart_line.data.labels.push(x);
        chart_line.data.datasets.forEach((dataset) => {
            dataset.data.push(y);
        });
        chart_line.update();
    }
}
export {update_line}

function update_bar(canvas_object,plot_update,plot_y) {
    var chart_bar=canvas_object.data; 
    if (typeof chart_bar !== 'undefined') {
        // add delta to current count
        var i;
        var num_classes=chart_bar.data.datasets[0].data.length;
        for (i=0; i<num_classes; i++) {
            // replace old data with absolute new data
            if (plot_update==0) {
                chart_bar.data.datasets[0].data[i]=plot_y[i];
            }
            // add new data to old data
            if (plot_update==1) {
                chart_bar.data.datasets[0].data[i]=chart_bar.data.datasets[0].data[i]+plot_y[i];
            }
        }
        chart_bar.update()
    }
}
export {update_bar}