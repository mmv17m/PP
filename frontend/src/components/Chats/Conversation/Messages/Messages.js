import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import Message from "./Message/Message"

import './../../../../index.css'
import classes from "./Messages.module.css"




export default function Messages({scroll}) {
	const me = useSelector(state => state.user.value)
	const chat = useSelector(state => state.chats.currentChat)
	const messages = useSelector(state => state.messages.messages)

	const handleScroll = (e) =>{
		if ((e.currentTarget.scrollHeight - e.currentTarget.offsetHeight + e.currentTarget.scrollTop)/e.currentTarget.scrollHeight <= 0.2){
			scroll()
		}
	}

	return (
		<div onScroll={handleScroll} className={classes.messages_container}>
			{
				messages.map(m => (
					<Message key={m.id} message={m} nickname={m.sender_id == me.id ? me.nickname : chat.user_nickname}/>
				))
			}
		</div>
	);
}