import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"

import { getTraining, finishTraining } from "./../../redux/features/trainings"
import Exercise from "./Exercise/Exercise"

import './../../index.css'
import classes from './TrainingSession.module.css'




export default function TrainingSession(){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const training_id = useParams().id
    const training = useSelector(state => state.trainings.trainingChange)
    const [startTime, setStartTime] = useState(new Date());
    const [currentExercise, setCurrentExercise] = useState(0);


    useEffect(() => {
        setStartTime(new Date());
    }, []);

    useEffect(() => {
        dispatch(getTraining(training_id))
    }, [dispatch])

    useEffect(() => {
        if (training.id && currentExercise>=training.exercises.length){
            finishTraining(training_id, Math.floor((new Date() - startTime)/1000))
            navigate("/trainings")
        }
    }, [currentExercise])

    if (currentExercise<training.exercises.length){
        return (<div className={classes.container}>
            <Exercise exercise={training.exercises[currentExercise]} onFinish={() => setCurrentExercise(currentExercise + 1)}/>
        </div>)
    }
        return <div/>
}
