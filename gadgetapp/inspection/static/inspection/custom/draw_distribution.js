function range(start, end, step) {
    const len = Math.floor((end - start) / step) + 1
    return Array(len).fill().map((_, idx) => start + (idx * step))
}

function draw_normal(parentDiv,canvasID,mu,sigma,break_points) {
    //create input data
    // var x_pos = [...Array(300).keys()];
    // var x_pos = x_pos.map(function(element){
  	//     return element/100;});
    // var x_neg = [...Array(300).keys()].reverse();
    // x_neg = x_neg.map(function(element){
  	//     return element/-100;});
    // var x = x_neg.concat(x_pos.slice(1,x_pos.length));
    
    var start=-3*sigma+mu;
    var end=3*sigma+mu;
    var step=1;

    var x =range(start,end,step);
    
    //generate distribution
    var y = new Array();
    var i;
    var pdf;
    for (i=0; i<x.length; i++) {
        pdf=1/sigma/Math.sqrt(2*Math.PI) * Math.exp(-0.5 * Math.pow((x[i]-mu)/sigma,2) );
        y.push(pdf);
    }
    
    var label = ['Brk 0-1', 'Brk 1-2', 'Brk 2-3', 'Brk 3-4']
    var color =['blue','yellow','green','violet']

    //annotations
    var annotations = break_points.map(function(grade, index) {
        return {
           type: 'line',
           id: 'vline' + index,
           mode: 'vertical',
           scaleID: 'x-axis-0',
           value: grade,
           borderColor: color[index],
           borderWidth: 3,
           label: {
              enabled: true,
              position: "center",
              content: label[index]
           }
        }
     });


    //plot distribution
    var ctx=canvasID.getContext('2d');
    canvasID.height=parentDiv.clientHeight;
    canvasID.width=parentDiv.clientWidth;
    var chart_ts = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        // The data for our dataset
        data: {
            labels: x,
            datasets: [{
                label: 'Distribution',
                data: y,
                borderColor: 'rgb(255,255,255)',
                fill: 'false',
                pointRadius: 0,
            }]
        },
        // Configuration options go here
        options: {
            legend: {
                labels: {
                    fontColor: "white"
                }               
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white"
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white"
                    }
                }]
            },
            animation: false,
            annotation: {
                drawTime: 'afterDatasetsDraw',
                annotations: annotations
             },
             scales: {
                xAxes: [{
                    ticks: {fontColor: "white"}
                }],
                yAxes: [{
                    ticks: {fontColor: "white"}
                }]
            },
        }
    });

}

export {draw_normal};

