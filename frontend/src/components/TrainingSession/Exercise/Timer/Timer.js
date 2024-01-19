import React, { useState, useEffect } from "react"

import useNow from "./../../../../hooks/useNow"

import './../../../../index.css'
import classes from './Timer.module.css'




export default function Timer({timeout=0, onFinish=()=>{}}){
    const [startTime, setStartTime] = useState(new Date());
    const now = useNow(1000)
    const rest = timeout-Math.floor((now-startTime)/1000)

    useEffect(()=>{
        if (rest<=0){onFinish()}
    }, [rest])

    return <div className={classes.container}>
        <div className={classes.time}>{rest}</div>
    </div>
}
