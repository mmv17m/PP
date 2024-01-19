import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import ChooseStudent from "./../ChooseStudent/ChooseStudent"
import PlusButton from "./../PlusButton/PlusButton"
import InputField from "./../InputField/InputField"
import MetricCard from "./MetricCard/MetricCard"
import { getProgress, addMetric } from "./../../redux/features/progress"

import './../../index.css'
import classes from './Progress.module.css'




export default function Progress(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    const progress = useSelector(state => state.progress.progress)
    const student = useSelector(state => state.students.currentStudent)
    const [addMetricFromOpened, setAddMetricFromOpened] = useState(false)

    useEffect(() => { 
        dispatch(getProgress(student ? student.id : null));
    }, [dispatch, student])

    const addNewMetric = (params) => {
        const new_metric = {
            name: params[0],
            units: params[1]
        }
        addMetric(new_metric, () => dispatch(getProgress()))
    }

    return (
        <div className={classes.page}>
            {user.role=="trainer" ? <ChooseStudent/> : <div></div>}  
            {progress.map((m) => <MetricCard key={m.id} metric={m}/>)}  
            {student.id ? null : <PlusButton onClick_={() => setAddMetricFromOpened(true)}/>}
            {addMetricFromOpened ? <InputField fields = {[[0, "text", "Name"], [1, "text", "Units"]]} addFunction={addNewMetric} close={() => setAddMetricFromOpened(false)}/> : null}       
        </div>
    )
}
