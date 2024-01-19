import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import DefaultButton from "./../../DefaultButton/DefaultButton"
import InputField from "./../../InputField/InputField"
import { getProgress, addValue } from "./../../../redux/features/progress"

import './../../../index.css'
import classes from './MetricCard.module.css'



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function MetricCard({metric}){
    const dispatch = useDispatch()
    const yValues = metric.values.map(point => point.value);
    const xValues = metric.values.map(point => point.date);
    const student = useSelector(state => state.students.currentStudent)
    const [addValueFormOpened, setAddValueFromOpened] = useState(false)

    const chartData = {
        labels: xValues,
        datasets: [
            {
                label: 'Line Chart',
                data: yValues,
                borderColor: 'rgb(44, 105, 141)',
                fill: false,
                pointBackgroundColor: 'rgb(44, 105, 141)',
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `${metric.name}: ${metric.units}`,
                color: 'rgb(44, 105, 141)'
            }
        },
        scales: {
            x: {
                ticks: {color: "rgb(44, 105, 141)"},
                border: {color: 'rgba(44, 105, 141, 0.3)', width: 2},
                grid: {color: 'rgb(44, 105, 141, 0.03)'}                
            },
            y: {
                ticks: {color: "rgb(44, 105, 141)"},
                border: {color: 'rgba(44, 105, 141, 0.3)', width: 2},
                grid: {color: 'rgb(44, 105, 141, 0.03)'}
            }
        }
    }
    
    const addNewValue = (params) => {
        const new_value = {
            metric_id: metric.id,
            value: parseInt(params[0])
        }
        addValue(new_value, () => dispatch(getProgress()))
    } 

    return (
        <div className={classes.container}>
            <div className={classes.chart}><Line data={chartData} options={chartOptions} /></div>
            {student.id ? null : <DefaultButton onClick_={() => setAddValueFromOpened(true)} text={"Add value"} isMain={false}/>}
            {addValueFormOpened ? <InputField fields = {[[0, "number", "Value"]]} addFunction={addNewValue} close={() => setAddValueFromOpened(false)}/> : null}
        </div>
    )
}
