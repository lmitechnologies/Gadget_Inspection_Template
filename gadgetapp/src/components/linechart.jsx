import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './css/chart.css';
import stringToColor from './common/stringtocolor';

function addElement(array, element) {
    const newArray = [...array, element];
    if (newArray.length > 10) {
        return newArray.slice(1);
    }
    return newArray;
}

const LineChart = ({ id, inspection, height, decision_key, onClick }) => {
    const [dataSets, setDataSets] = useState(JSON.parse(localStorage.getItem(`line_chart_${id}`)) || [])

    const data = {
        labels: [0,1,2,3,4,5,6,7,8,9],
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
                            return { ...dataset, data: addElement(dataset.data, 1) };
                        } else {
                            return { ...dataset, data: addElement(dataset.data, 0) };
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

export default LineChart;

