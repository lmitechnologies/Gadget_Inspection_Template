function init_line(ctx,buffer,xinit,yinit,xlabel,ylabel) {
    // var x_data = [...Array(buffer).keys()];
    var x_data = new Array(buffer).fill(xinit);
    var y_data = new Array(buffer).fill(yinit);

    var chart_obj = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: x_data,
            datasets: [{
                label: ylabel,
                data: y_data,
                borderColor: 'rgb(0,178,79)',
                fill: 'false'
            }]
        },
        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontColor: "white"
                }               
            },
            // scales: {
            //     yAxes: [{
            //         ticks: {
            //             fontColor: "white"
            //         }
            //     }],
            //     xAxes: [{
            //         ticks: {
            //             fontColor: "white"
            //         }
            //     }]
            // },
            animation: false,
        }
    });
    //store chart in hidden canvas data
    return chart_obj;
}
export {init_line}

function init_bar(ctx,yinit,xlabel,ylabel) {
    var xlabel_array=xlabel[0].split(",");
    var nbin=xlabel_array.length;
    var init_bar=new Array(nbin).fill(yinit)
    var bg_color=new Array(nbin).fill('rgba(0, 178, 79, 0.2)')
    var border_color=new Array(nbin).fill('rgba(0, 178, 79, 1)')
    var chart_obj = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: xlabel_array,
            datasets: [{
                label: ylabel,
                data: init_bar,
                backgroundColor: bg_color,
                borderColor: border_color,
                borderWidth: 1
            }]
        },
        // Configuration options go here
        options: {
            // responsive:true,
            // maintainAspectRation: true,
            legend: {
                labels: {
                    fontColor: "white"
                }               
            },
            // scales: {
            //     yAxes: [{
            //         ticks: {
            //             beginAtZero: true,
            //             fontColor: "white"
            //         }
            //     }],
            //     xAxes: [{
            //         ticks: {
            //             fontColor: "white"
            //         }
            //     }]
            // },
            animation: false
        }
    });
    return chart_obj;    
}
export {init_bar}

function init_hist(ctx) {
    var chart_obj = new Chart(ctx, {
        type: 'bar',
        options: {
            legend: {
                labels: {
                    fontColor: "white"
                }               
            },
            animation: false
        }
    });
    return chart_obj;    
}
export {init_hist}