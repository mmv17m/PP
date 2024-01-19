import React from "react"

import './../../index.css'
import classes from "./DefaultButton.module.css"




export default function DefaultButton({height = 35, width = null, isMain = false, onClick_, text = ""}){
	return (
		<div style={{height: height, width: width}} className={classes.button}>
			<button type="button" className={isMain ? classes.main_button : classes.additional_button} onClick={onClick_}>{text}</button>
		</div>					
	);
}