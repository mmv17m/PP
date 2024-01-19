import React from "react"

import './../../index.css'
import classes from "./PasswordInput.module.css"




export default function PasswordInput({placeholder = "password", value = "", changeValue}){
	const changeMyValue = (event) => {changeValue(event.target.value)}

	return (
		<div className={classes.container}>
			<input type="password" placeholder={placeholder} value={value} className={classes.field} onChange={changeMyValue}></input>
		</div>					
	);
}