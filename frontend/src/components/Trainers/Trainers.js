import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import Trainer from "./Trainer/Trainer"
import PlusButton from "./../PlusButton/PlusButton"
import SearchUser from "./../SearchUser/SearchUser"
import { searchPossibleTrainers, newTrainer, getTrainers } from "./../../redux/features/trainers"

import './../../index.css'
import classes from './Trainers.module.css'





export default function Trainers(){
    const dispatch = useDispatch()
    const trainers = useSelector(state => state.trainers.trainers)
    const [isSearchOpened, setIsSearchOpened] = useState(false)

    useEffect(() => {
        dispatch(getTrainers());
    }, [dispatch])

    const addTrainer = (id) => {
        newTrainer(id, () => dispatch(getTrainers()))
    }

    return (<div className={classes.container}>
        {isSearchOpened && <SearchUser 
            searchFunction = {(v, callback) => searchPossibleTrainers(v, callback)} 
            addFunction = {addTrainer} 
            close={() => setIsSearchOpened(false)}
        />}
        <div className={classes.trainers_container}>
            {trainers.map((t) => {
                return <Trainer key={t.id} id={t.id} nickname={t.nickname}/>
            })}
            <div className={classes.plus_button}><PlusButton onClick_={() => setIsSearchOpened(true)}/></div>
        </div>
    </div>)
}
