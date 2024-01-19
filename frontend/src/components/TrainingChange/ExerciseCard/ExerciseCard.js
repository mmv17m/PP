import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';

import DefaultButton from "./../../DefaultButton/DefaultButton"
import { removeExercise } from "./../../../redux/features/trainings"

import './../../../index.css'
import classes from './ExerciseCard.module.css'





export default function ExerciseCard({exercise, onDeleteCallback=()=>{}}){

    const deleteMyExercise = () => {
        removeExercise(exercise.id, () => onDeleteCallback())
    }

    return (<div className={classes.container}>
        <div className={classes.title}>{exercise.name}</div>
        <div className={classes.description}>{exercise.description}</div>
        <div className={classes.settings}>
            <div className={classes.setting}>Sets: {exercise.sets}</div>
            <div className={classes.setting}>Repetitions: {exercise.repetitions}</div>
            <div className={classes.setting}>Rest time: {exercise.rest_time}s</div>
            <div className={classes.setting}>Weight: {exercise.weight}g</div>
        </div>
        <div className={classes.button}><DefaultButton onClick_={deleteMyExercise} text={"Delete"} isMain={false}/></div>
    </div>)
}
