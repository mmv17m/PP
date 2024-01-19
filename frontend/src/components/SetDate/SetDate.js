import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import { setDate, setCurrentDate } from "./../../redux/features/date"

import './../../index.css'
import classes from './SetDate.module.css'





export default function SetDate(){
    const dispatch = useDispatch()
    const date = useSelector(state => state.date.date)

    useEffect(() => { 
        if (!date){
        const currentDate = new Date();
        const date = formatDate(currentDate)
        dispatch(setDate({date: date}));
        dispatch(setCurrentDate({date: date}));}
    }, [dispatch])

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const onDataChange = (e) =>{
        if (e.target.value){
            dispatch(setDate({date: e.target.value}))
        }
    }

    return (<div className={classes.container}>
        <input className={classes.date} type="date" value={date} onChange={onDataChange}/> 
    </div>)
}
