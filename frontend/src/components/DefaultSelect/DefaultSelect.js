import React from "react"

import './../../index.css'
import classes from "./DefaultSelect.module.css"




function DefaultSelect({name, placeholder, options, value, changeValue}){
	function changeMyValue(event){changeValue(event.target.value)}

	return (
		<select name={name} placeholder={placeholder} value={value} className={classes.select} onChange={changeMyValue} single>
			{options.map(o => (
				<option className={classes.option} key={o} value={o}>{o}</option>
			))}
		</select>					
	);
}


export default DefaultSelect;