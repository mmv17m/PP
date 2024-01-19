import React from "react"

import exampleAvatar2 from "./../avatar_examples/4.png"

import './../../index.css'
import classes from "./Chat.module.css"




export default function Chat({chatId, nickname, avatar=exampleAvatar2, lastMessage, joined, isCurrent=false, onClick_ = (id) => {}}){
	let textColor = isCurrent ? classes.white : classes.dark_blue;
	return (
		<div className={isCurrent ? classes.current_chat : classes.chat} onClick={(e) => onClick_(chatId)}>
			<img src={avatar} className={classes.img}/>
			<div className={classes.text}>
				<div className="jc_space_between">
					<span className={`${classes.nickname} ${textColor}`}>{nickname}</span>
					<span className={`${classes.last_seen} ${textColor}`}>{joined}</span>
				</div>
				<span className={textColor}>{lastMessage}</span>
			</div>
		</div>
	);
}