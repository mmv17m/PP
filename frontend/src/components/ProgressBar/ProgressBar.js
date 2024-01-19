import React, { useState, useEffect } from "react"

import './../../index.css'
import classes from './ProgressBar.module.css'





export default function ProgressBar({name="", max=0, filled=0}){
    const filledPercent = max ? filled/max*100 : 100
    return (<div className={classes.container}>
        <div className={classes.fill} style={{width: `${filledPercent}%`}}><span className={classes.text}>{`${name} ${filled.toFixed(2)}/${max}`}</span></div>
    </div>)
}
