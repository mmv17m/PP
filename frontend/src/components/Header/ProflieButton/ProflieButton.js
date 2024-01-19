import React from "react"

import classes from "./ProflieButton.module.css"
import icon from "./profile2.svg"




export default function ProflieButton({onClick_}){
	return (
		<div onClick={onClick_}>
			<img className={classes.img} src={icon}/>	
		</div>
	);
}