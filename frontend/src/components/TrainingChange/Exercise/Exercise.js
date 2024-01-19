import React, { useState, useEffect } from "react"

import './../../../index.css'
import classes from './Exercise.module.css'




export default function Exercise({value, onClick_}){
    return (<div className={classes.container} onClick={() => onClick_(value.id)}>
        <div className={classes.title}>{value.name}</div>
        <div className={classes.description}>{value.description}</div>
    </div>)
}
