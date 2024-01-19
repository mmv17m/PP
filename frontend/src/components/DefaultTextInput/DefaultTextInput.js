import React from "react"

import './../../index.css'
import classes from "./DefaultTextInput.module.css"




function DefaultTextInput({changeValue, value, placeholder}){
	const changeMyValue = (event) => {
		changeValue(event.target.value)
	}

	return (
		<div className={classes.container}>
			<input type="text" placeholder={placeholder} value={value} className={classes.field} onChange={changeMyValue}></input>
		</div>					
	);
}


export default DefaultTextInput;