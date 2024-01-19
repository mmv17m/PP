import React from "react"

import './../../../index.css'
import classes from "./Logo.module.css"
import logo from "./gym3.svg"




export default function Logo(){
	return (
		<div className={classes.logo}>
			<img className={classes.img} src={logo}/>	
			<div className={classes.title}>Platform title</div> 
		</div>
	);
}