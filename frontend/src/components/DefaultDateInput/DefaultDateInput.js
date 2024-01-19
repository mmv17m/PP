import React from "react"

import './../../index.css'
import classes from "./DefaultDateInput.module.css"




function DefaultDateInput({changeValue, placeholder, value}){
	const changeMyValue = (event) => {changeValue(event.target.value)}

	return (
		<div className={classes.container}>
			<input type="date" placeholder={placeholder} value={value} className={classes.field} onChange={changeMyValue}></input>
		</div>					
	);
}

export default DefaultDateInput;