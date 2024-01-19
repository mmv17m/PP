import React from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Description from "./Description/Description"

import './../../index.css'
import classes from './About.module.css'


export default function About(){
    return (
        <div className={classes.about}>
            <div className={classes.container}>
                <Description/>
            </div>
        </div>
    );    
}
