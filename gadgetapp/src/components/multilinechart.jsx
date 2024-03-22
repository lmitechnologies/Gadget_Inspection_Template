import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './css/chart.css';
import stringToColor from './common/stringtocolor';

function addElement(array, element, len) {
    const newArray = [...array, element];
    if (newArray.length > len) {
        return newArray.slice(1);
    }
    return newArray;
}

const MultiLineChart = ({ id, inspection, decision_key, history_len=10 }) => {
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
                    let found = false
                    const updatedDataSets = prevDataSets.map(dataset => {
                        if (dataset.label === decision){
                            found = true
                            return { ...dataset, data: addElement(dataset.data, 1, history_len) };
                        } else {
                            return { ...dataset, data: addElement(dataset.data, 0, history_len) };
                        }
                    });

                    if (found === false){
                        const newColor = stringToColor(String(decision));
                        updatedDataSets.push({
                            label: decision,
                            data: [0,0,0,0,0,0,0,0,0,1],
                            tension: 0.1,
                            backgroundColor: newColor,
                            borderColor: newColor
                        });
                    }
                    
                    return updatedDataSets
                });
                localStorage.setItem(`line_chart_${id}`, JSON.stringify(dataSets));
            }
        }
    }, [inspection]);
    
    return  <div className="chart-container">
                <Line data={data} options={options} />
            </div>
};

export default MultiLineChart;

