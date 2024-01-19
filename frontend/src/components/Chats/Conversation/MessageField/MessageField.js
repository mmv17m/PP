import React, {useState} from "react"

import Send_button from "./Send_button/Send_button"

import './../../../../index.css'
import classes from "./MessageField.module.css"




export default function MessageField({onEnter = (v) => {}}){
	const [value, setValue] = useState("")

	const keyDown = (e) =>{
		if (e.key=="Enter"){
			setValue("")
			onEnter(value)
		}
	}

	return (
		<div className={classes.message_field}>
			<input type="text" className={classes.input} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={keyDown} placeholder="Your message"/>
			<Send_button/>
		</div>
	);
}