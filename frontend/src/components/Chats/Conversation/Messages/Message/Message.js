import React from "react"

import './../../../../../index.css'
import classes from "./Message.module.css"




export default function Message({message, nickname}){
	return (
		<div className={classes.message_container}>
			<div className={classes.message_header}>
				<span className={classes.nickname}>{nickname}</span>
				<span className={classes.date}>{message.created_at}</span>
			</div>
			<span className={classes.text}>{message.text}</span>
		</div>
	);
}