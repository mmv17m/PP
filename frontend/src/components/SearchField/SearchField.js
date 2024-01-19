import React, { useState } from "react"

import './../../index.css'
import classes from "./SearchField.module.css"




export default function SearchField({onEnter = (v) => {}}){
	const [value, setValue] = useState("")

	const keyDown = (e) =>{
		if (e.key=="Enter"){
			onEnter(value)
		}	
	}

	return (
		<div className={classes.container}>
			<input type="search" onKeyDown={keyDown} placeholder="Search" value={value} onChange={(e) => setValue(e.target.value)} className={classes.search_field}>
			</input>
		</div>					
	);
}