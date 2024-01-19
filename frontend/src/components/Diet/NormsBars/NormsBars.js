import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import { getNorms, setNorms } from "./../../../redux/features/diet"
import ProgressBar from "./../../ProgressBar/ProgressBar"
import DefaultButton from "./../../DefaultButton/DefaultButton"
import InputField from "./../../InputField/InputField"

import './../../../index.css'
import classes from './NormsBars.module.css'





export default function NormsBars(){
    const dispatch = useDispatch()
    const student = useSelector(state => state.students.currentStudent)
    const norms = useSelector(state => state.diet.norms)
    const total = useSelector(state => state.diet.total)
    const [isNewNormsFieldOpened, setIsNewNormsFieldOpened] = useState(false)

    useEffect(() => { 
        dispatch(getNorms(student ? student.id : null));
    }, [dispatch, student])

    const setNewNorms = (params) => {
        const newNorms = {
            calories: params[0],
            proteins: params[1],
            fats: params[2],
            carbohydrates: params[3],
            water: params[4]
        }
        setNorms(student ? student.id : null, newNorms, () => dispatch(getNorms(student ? student.id : null)))
    }

    return (<div className={classes.container}>
        <div className={classes.title}>Nutrition:</div>
        <div className={classes.bars}>
            <ProgressBar name="Calories" max={norms.calories} filled={total.calories}/>
            <ProgressBar name="Proteins" max={norms.proteins} filled={total.proteins}/>
            <ProgressBar name="Fats" max={norms.fats} filled={total.fats}/>
            <ProgressBar name="Carbohydrates" max={norms.carbohydrates} filled={total.carbohydrates}/>
            <ProgressBar name="Water" max={norms.water} filled={total.water}/>
        </div>
        <DefaultButton onClick_={() => setIsNewNormsFieldOpened(true)} text={"Set norms"} isMain={true}/>
        {isNewNormsFieldOpened ? <InputField fields = {[
            [0, "number", "Calories"],
            [1, "number", "Proteins"],
            [2, "number", "Fats"],
            [3, "number", "Carbohydrates"],
            [4, "number", "Water"],
        ]} addFunction={setNewNorms} close={() => setIsNewNormsFieldOpened(false)}/> : null}
    </div>)
}
