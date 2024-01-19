import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import DefaultButton from "./../../DefaultButton/DefaultButton"
import { getTrainers, deleteTrainer } from "./../../../redux/features/trainers"

import './../../../index.css'
import classes from './Trainer.module.css'
import avatar_example_1 from "./../../avatar_examples/4.png"





export default function Trainer({id, nickname}){
    const dispatch = useDispatch()

    const onDelete = () => {
        deleteTrainer(id, () => dispatch(getTrainers()))
    }

    return (<div className={classes.trainer}>
        <div className={classes.name}>
            <img className={classes.img} src={avatar_example_1}/>
            <div className={classes.nickname}>{nickname}</div>
        </div>
        <DefaultButton onClick_={onDelete} text={"Delete"} isMain={true} width={170}/>
    </div>)
}
