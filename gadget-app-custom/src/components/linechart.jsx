import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import '../css/chart.css';

function addElement(array, element, len) {
    const newArray = [...array, element];
    if (newArray.length > len) {
        return newArray.slice(1);
    }
    return newArray;
}

const LineChart = ({ id, inspection, decision_key, history_len=10 }) => {
    const [dataSets, setDataSets] = useState(JSON.parse(localStorage.getItem(`line_chart_${id}`)) || [])
    let labels = []
    for (let i = 0; i < history_len; i++) {
        labels.push(i)
    }
    const data = {
        labels: labels,
        datasets: dataSets
    };

    const options = {
        animation: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white',
                }
            },
            x: {
                ticks: {
                    color: 'white',
                }  
            }
        }
    };

    useEffect(() => {
        if (inspection) {            
            if (inspection['results'][decision_key] != undefined) {
                let decision = inspection['results'][decision_key];
                setDataSets(prevDataSets => {
                    if (prevDataSets.length === 0){
                        return [{
                            label: decision_key,
                            data: [parseInt(decision)],
                            tension: 0.1,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)'
                        }];
                    }

                    const updatedDataSets = prevDataSets.map(dataset => {
                        return { ...dataset, data: addElement(dataset.data, parseInt(decision), history_len) };
                    });

                    return updatedDataSets
                });

                localStorage.setItem(`line_chart_${id}`, JSON.stringify(dataSets));
            }
        }
    }, [inspection]);

    const style = {
        height: "90%",
        position: "relative",
        fontSize: "20px",
        width: "100%",
    }
    
    return <div style={style}>
                <Line data={data} options={options} />
            </div>
};

export default LineChart;

