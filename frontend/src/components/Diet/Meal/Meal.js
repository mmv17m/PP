import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import DefaultButton from "./../../DefaultButton/DefaultButton"
import Search from "./../../Search/Search"
import Dish from "./../Dish/Dish"
import InputField from "./../../InputField/InputField"
import { getDishes, addDish, getMeals, createDish } from "./../../../redux/features/diet"

import './../../../index.css'
import classes from './Meal.module.css'





export default function Meal({meal}){
    const dispatch = useDispatch()
    const student = useSelector(state => state.students.currentStudent)
    const date = useSelector(state => state.date.date)
    const [isAddDishMenuOpened, setIsAddDishMenuOpened] = useState(false)
    const [isAddDishOpened, setIsDishOpened] = useState(false)
    const [currentDish, setCurrentDish] = useState(null)
    const [isCreateDishOpened, setIsCreateDishOpened] = useState(false)

    const row = (id, name, data, c=1) => {
        return <tr key={id} className={classes.table__raw}>
            <td className={classes.table__data}>{name}</td>
            <td className={classes.table__data}>{(data.calories*c).toFixed(1)}</td>
            <td className={classes.table__data}>{(data.proteins*c).toFixed(1)}</td>
            <td className={classes.table__data}>{(data.fats*c).toFixed(1)}</td>
            <td className={classes.table__data}>{(data.carbohydrates*c).toFixed(1)}</td>
            <td className={classes.table__data}>{(data.water*c).toFixed(1)}</td>
        </tr>
    }

    const addNewDish = (params) => {
        const dish = {
            dish_id: currentDish,
            meal_id: meal.id,
            weight: params[0]
        }
        addDish(dish, ()=>dispatch(getMeals({date: date, user_id: student ? student.id : null})))
    }

    const createNewDish = (params) => {
        const dish = {
            name: params[0],
            calories: params[1],
            proteins: params[2],
            fats: params[3],
            carbohydrates: params[4],
            water: params[5]
        }
        createDish(dish)
    }

    return (<div className={classes.container}>
        <div className={classes.title}>
            <div className={classes.meal_name}>{meal.name}</div>
            <div className={classes.time}>{meal.datetime}</div>
        </div>
        <table className={classes.table}>
            <thead>
                <tr className={classes.table__raw}>
                    <th className={classes.table__title}>Dish:</th>
                    <th className={classes.table__title}>Calories:</th>
                    <th className={classes.table__title}>Proteins:</th>
                    <th className={classes.table__title}>Fats:</th>
                    <th className={classes.table__title}>Carbohydrates:</th>
                    <th className={classes.table__title}>Water:</th>
                </tr>
            </thead>
            <tbody>
                {meal.dishes.map((d) => {
                    const c = d.weight/100
                    return row(d.id, d.name, d, c)
                })}
            </tbody>
            <tfoot>
                {row(0, "total", meal.total)}
            </tfoot>
        </table>
        {student.id ? null : <DefaultButton onClick_={() => setIsAddDishMenuOpened(true)} text={"Add dish"} isMain={false}/>}
        {isAddDishMenuOpened ? <Search
            close={()=>setIsAddDishMenuOpened(false)}
            component={Dish}
            searchFunction={getDishes}
            addFunction={(id) => {setCurrentDish(id); setIsDishOpened(true)}}
            buttonFunction = {() => setIsCreateDishOpened(true)}
        /> : null}
        {isAddDishOpened ? <InputField fields = {[[0, "number", "Weight"]]} addFunction={addNewDish} close={() => setIsDishOpened(false)}/> : null}
        {isCreateDishOpened ? <InputField fields = {[
            [0, "text", "Name"],
            [1, "number", "Calories"],
            [2, "number", "Proteins"],
            [3, "number", "Fats"],
            [4, "number", "Carbohydrates"],
            [5, "number", "Water"],
        ]} addFunction={createNewDish} close={() => setIsCreateDishOpened(false)}/> : null}
    </div>)
}
