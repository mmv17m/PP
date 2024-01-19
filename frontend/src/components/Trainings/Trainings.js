import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import ChooseStudent from "./../ChooseStudent/ChooseStudent"
import PlusButton from "./../PlusButton/PlusButton"
import SetDate from "./../SetDate/SetDate"
import InputField from "./../InputField/InputField"
import TrainingCard from "./TrainingCard/TrainingCard"
import { getTrainings, createTraining } from "./../../redux/features/trainings"

import './../../index.css'
import classes from './Trainings.module.css'





export default function Trainings(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    const student = useSelector(state => state.students.currentStudent)
    const date = useSelector(state => state.date.date)
    const trainings = useSelector(state => state.trainings.trainings)
    const [isNewTriningOpened, setIsNewTriningOpened] = useState(false)

    const getMyTrainings = () => dispatch(getTrainings({date: date, user_id: student ? student.id : null}))

    const addNewTraining = (params) => {
        const training = {
            name: params[0],
            date: params[1]
        }
        createTraining(training, () => getMyTrainings(), student ? student.id : null)
    }    

    useEffect(() => {
        if (date){getMyTrainings()} 
    }, [dispatch, student, date])

    return (<div className={classes.container}>
        <div className={classes.cards}> 
            {user.role=="trainer" ? <ChooseStudent/> : <div></div>}
            <SetDate/>
            {trainings.map((t) => {
                return <TrainingCard key={t.id} training={t} onDeleteCallback={getMyTrainings}/>
            })}
            
        </div>
        <PlusButton onClick_={() => setIsNewTriningOpened(true)}/>
        {isNewTriningOpened ? <InputField fields = {[[0, "text", "Name"], [1, "date", "Date"]]} addFunction={addNewTraining} close={() => setIsNewTriningOpened(false)}/> : null}
    </div>)
}
