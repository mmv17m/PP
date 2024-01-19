import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { useParams, useNavigate } from "react-router-dom"

import PlusButton from "./../PlusButton/PlusButton"
import InputField from "./../InputField/InputField"
import ExerciseCard from "./ExerciseCard/ExerciseCard"
import Search from "./../Search/Search"
import Exercise from "./Exercise/Exercise"
import { getTraining, createTraining, getExercises, addExercise, createExercise } from "./../../redux/features/trainings"

import './../../index.css'
import classes from './TrainingChange.module.css'





export default function TrainingChange(){
    const dispatch = useDispatch()
    const training_id = useParams().id
    const training = useSelector(state => state.trainings.trainingChange)
    const [currentExercise, setCurrentExercise] = useState(null)
    const [isFindExerciseOpened, setIsFindExerciseOpened] = useState(false)
    const [isAddExerciseOpened, setIsAddExerciseOpened] = useState(false)
    const [isCreateExerciseOpened, setIsCreateExerciseOpened] = useState(false)
    
    useEffect(() => {
        dispatch(getTraining(training_id))
    }, [dispatch])

    const addNewExercise = (params) => {
        const exercise = {
            training_id: training_id,
            exercise_id: currentExercise,
            weight: params[0],
            sets: params[1],
            repetitions: params[2],
            rest_time: params[3]
        }
        addExercise(exercise, ()=>dispatch(getTraining(training_id)))
    }

    const createNewExercise = (params) => {
        const exercise = {
            name: params[0],
            description: params[1]
        }
        createExercise(exercise)
    }

    return (<div className={classes.container}>
        <div className={classes.cards}> 
            {training.exercises.map((e) => <ExerciseCard key={e.id} exercise={e} onDeleteCallback={()=>dispatch(getTraining(training_id))}/>)}
        </div>
        <PlusButton onClick_={() => setIsFindExerciseOpened(true)}/>
        {isFindExerciseOpened ? <Search
            close={()=>setIsFindExerciseOpened(false)}
            component={Exercise}
            searchFunction={getExercises}
            addFunction={(id) => {setCurrentExercise(id); setIsAddExerciseOpened(true)}}
            buttonFunction = {() => setIsCreateExerciseOpened(true)}
        /> : null}
        {isAddExerciseOpened ? <InputField fields = {[
            [0, "number", "Weight (g)"],
            [1, "number", "Sets"],
            [2, "number", "Repetitions"],
            [3, "number", "Rest time (s)"]
        ]} addFunction={addNewExercise} close={() => setIsAddExerciseOpened(false)}/> : null}
        {isCreateExerciseOpened ? <InputField fields = {[
            [0, "text", "Name"],
            [1, "text", "Short description"]
        ]} addFunction={createNewExercise} close={() => setIsCreateExerciseOpened(false)}/> : null}
    </div>)
}
