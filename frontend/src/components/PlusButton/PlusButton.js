import React from "react"

import './../../index.css'
import classes from "./PlusButton.module.css"




export default function PlusButton({onClick_ = () => {}}){
	return (
		<div className={classes.plus_button} onClick={onClick_}>
			<span className={classes.plus}>+</span>
		</div>					
	);
}

