import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import './css/chart.css';

// Bar chart that uses a predefined list of labels
const HistogramChart = ({ id, inspection, topic, decision_key, label_list=[] }) => {
    const [chartData, setChartData] = useState(JSON.parse(localStorage.getItem(`hist_chart_${id}`)) || new Array(label_list.length).fill(0))

    useEffect(() => {
        if (inspection) {            
            if (inspection['results'][decision_key] != undefined) {
                let decision = inspection['results'][decision_key];
                const index = label_list.indexOf(String(decision));
                if (index !== -1) {
                    setChartData(prevData => {
                        const newData = [...prevData];
                        newData[index]++;
                        return newData;
                    });
                    localStorage.setItem(`hist_chart_${id}`, JSON.stringify(chartData));
                }
            }
        }
    }, [inspection]);
    
    const data = {
        labels: label_list,
        datasets: [
            {
                label: topic,
                data: chartData,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }
        ]
    };

    const options = {
        animation: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    fontColor: 'white',
                    color: 'white'
                }
            },
            x: {
                ticks: {
                    fontColor: 'white',
                    color: 'white'
                }
            }
        }
    };

    return <div className="chart-container">
                <Bar data={data} options={options} />
            </div>

};

export default HistogramChart;


