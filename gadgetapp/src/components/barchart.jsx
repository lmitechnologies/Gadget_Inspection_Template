import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import React, { useEffect, useState } from 'react';
import './css/chart.css';

const BarChart = ({ id, inspection, topic, decision_key }) => {
    const [chartData, setChartData] = useState(JSON.parse(localStorage.getItem(`bar_chart_${id}`)) || [])
    const [chartLabels, setChartLabels] = useState(JSON.parse(localStorage.getItem(`bar_chart_${id}_labels`)) || [])

    useEffect(() => {
        if (inspection) {            
            if (inspection['results'][decision_key] != undefined) {
                let decision = inspection['results'][decision_key];
                setChartLabels(prevLabels => {
                    const index = prevLabels.indexOf(decision);
                    if (index === -1) {
                        // Decision doesn't exist in labels
                        setChartData(prevData => [...prevData, 1]);
                        return [...prevLabels, decision];
                    } else {
                        setChartData(prevData => {
                            const newData = [...prevData];
                            newData[index]++;
                            return newData;
                        });
                        return prevLabels;
                    }
                });
                localStorage.setItem(`bar_chart_${id}`, JSON.stringify(chartData));
                localStorage.setItem(`bar_chart_${id}_labels`, JSON.stringify(chartLabels));
            }
        }
    }, [inspection]);
    
    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: topic,
                data: chartData,
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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

export default BarChart;


