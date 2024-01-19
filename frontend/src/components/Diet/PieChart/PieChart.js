import React, { useState, useEffect } from "react"
import {useSelector} from 'react-redux'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import './../../../index.css'
import classes from './PieChart.module.css'




ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(){
    const total = useSelector(state => state.diet.total)

    const data = {
        labels: ['Proteins', 'Fats', 'Crabohydrates'],
        datasets: [
            {
                data: [total.proteins, total.fats, total.carbohydrates],
                backgroundColor: ['rgb(44, 105, 141)', '#BAE8E8', '#E3F6F5'],
                hoverBackgroundColor: ['rgb(74, 135, 171)', '#93bfbf', '#EEF9F9'],
            },
        ],
    }  

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
        },
        layout: {
            padding: {
                left: 0, // Adjust top padding as needed
                right: 0, // Adjust bottom padding as needed
            },
        },
    };

    return (<div className={classes.container}>
        <div className={classes.title}>Nutrition ratio:</div>
        <div className={classes.chart}><Pie data={data} options={options} /></div>
    </div>)
}
