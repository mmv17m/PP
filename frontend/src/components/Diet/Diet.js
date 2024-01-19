import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import ChooseStudent from "./../ChooseStudent/ChooseStudent"
import SetDate from "./../SetDate/SetDate"
import Meal from "./Meal/Meal"
import NormsBars from "./NormsBars/NormsBars"
import PlusButton from "./../PlusButton/PlusButton"
import InputField from "./../InputField/InputField"
import PieChart from "./PieChart/PieChart"
import { getMeals, addMeal } from "./../../redux/features/diet"

import './../../index.css'
import classes from './Diet.module.css'





export default function Diet(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    const date = useSelector(state => state.date.date)
    const student = useSelector(state => state.students.currentStudent)
    const meals = useSelector(state => state.diet.meals)
    const currentDate = useSelector(state => state.date.currentDate)
    const [addMealFromOpened, setAddMealFromOpened] = useState(false)

    useEffect(() => { 
        dispatch(getMeals({date: date, user_id: student ? student.id : null}));
    }, [dispatch, student, date])

    const addNewMeal = (params) => {
        const new_meal = {
            name: params[0],
        }
        addMeal(new_meal, () => dispatch(getMeals({date: date, user_id: student ? student.id : null})))
    }

    return (<div className={classes.container}>
        {user.role=="trainer" ? <ChooseStudent/> : <div></div>}
        <div className={user.role=="trainer" ? classes.content : null}>
            <div className={classes.grid}>
                <div className={classes.column}>
                    <SetDate/>
                    <NormsBars/>
                    <PieChart/>
                </div>
                <div className={classes.column}>
                    {meals.map((m) => <Meal key={m.id} meal={m}/>)}
                    {!student.id && date === currentDate && (
                        <PlusButton onClick_={() => setAddMealFromOpened(true)} />
                    )}
                </div>
            </div>
        </div>
        {addMealFromOpened ? <InputField fields = {[[0, "text", "Name"]]} addFunction={addNewMeal} close={() => setAddMealFromOpened(false)}/> : null}
    </div>)
}
