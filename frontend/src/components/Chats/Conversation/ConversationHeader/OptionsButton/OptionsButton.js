import React from "react"

import './../../../../../index.css'
import classes from "./OptionsButton.module.css"
import options_img from "./options.svg"




export default function OptionsButton(){
	return (
		<img src={options_img} className={classes.img}/>
	);
}
