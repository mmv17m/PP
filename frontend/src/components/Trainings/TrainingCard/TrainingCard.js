import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

import DefaultButton from "./../../DefaultButton/DefaultButton"
import { deleteTraining, getTrainings } from "./../../../redux/features/trainings"

import './../../../index.css'
import classes from './TrainingCard.module.css'





export default function TrainingCard({training, onDeleteCallback=()=>{}}){
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const student = useSelector(state => state.students.currentStudent)

    const deleteMyTraining = () => {
        deleteTraining(training.id, () => onDeleteCallback(), student ? student.id : null)
    }

    return (<div className={classes.container}>
        <div className={classes.title_and_date}>
            <div className={classes.title}>{training.name}</div>
            <div className={classes.date}>{training.datetime}</div>
        </div>
        {training.finishing_time ? <div className={classes.finishing_date}>{`Finishing time: ${training.finishing_time}`}</div> : null}
        {training.span ? <div className={classes.span}>{`Span: ${training.span}s`}</div> : null}
        <ul className={classes.exercises}>
            {training.exercises.map((e) => <li key={e.id} className={classes.exercise}>
                {`${e.name}: ${e.sets}x${e.repetitions}`}
            </li>)}
        </ul>
        <div className={classes.buttons}>
            <div className={classes.button}><DefaultButton onClick_={deleteMyTraining} text={"Delete"} isMain={false}/></div>
            <div className={classes.button}><DefaultButton onClick_={() => navigation(`change/${training.id}`)} text={"Change"} isMain={false}/></div>
            <div className={classes.button}><DefaultButton onClick_={() => navigation(`session/${training.id}`)} text={"Start"} isMain={true}/></div>
        </div>
    </div>)
}
