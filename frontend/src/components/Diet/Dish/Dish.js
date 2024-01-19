import React, { useState, useEffect } from "react"

import './../../../index.css'
import classes from './Dish.module.css'




export default function Dish({value, onClick_}){

    return (<div className={classes.container} onClick={() => onClick_(value.id)}>
        <div className={classes.title}>{value.name}</div>
        <div className={classes.nutritions}>{`${value.calories}kcal: C${value.carbohydrates}; P${value.proteins}; F${value.fats}; W${value.water}`}</div>
    </div>)
}
