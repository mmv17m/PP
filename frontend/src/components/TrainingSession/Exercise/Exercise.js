import React, { useState, useEffect } from "react"

import useNow from "./../../../hooks/useNow"
import DefaultButton from "./../../DefaultButton/DefaultButton"
import Timer from "./Timer/Timer"

import './../../../index.css'
import classes from './Exercise.module.css'




export default function Exercise({exercise, onFinish=()=>{}}){
    const [counting, setCounting] = useState(exercise.sets*2)
    
    useEffect(() => {
        setCounting(exercise.sets*2)
    }, [exercise]);

    useEffect(()=>{
        if (counting<=0){onFinish()}
    }, [counting])

    return <div className={classes.container}>
        <div className={classes.label}>
            <div className={classes.title}>{exercise.name}</div>
            <div className={classes.description}>{exercise.description}</div>
            <ul className={classes.settings}>
                <li className={classes.setting}>Remaining sets: {Math.floor(counting/2)}</li>
                <li className={classes.setting}>Repetitions: {exercise.repetitions}</li>
                <li className={classes.setting}>Rest time: {exercise.rest_time}s</li>
                <li className={classes.setting}>Weight: {exercise.weight}g</li>
            </ul>
        </div>
        {
            counting % 2 === 0  
            ? <DefaultButton onClick_={() => setCounting(counting - 1)} text={"Next"} isMain={true}/>
            : <Timer timeout={exercise.rest_time} onFinish={() => setCounting(counting - 1)}/>
        }
    </div>
}
