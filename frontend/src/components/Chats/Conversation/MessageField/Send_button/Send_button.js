import React from "react"

import './../../../../../index.css'
import classes from "./Send_button.module.css"
import options_img from "./send.svg"

class Send_button extends React.Component{
	render(){
		return (
			<img src={options_img} className={classes.img}/>
		);
	}
}


export default Send_button;