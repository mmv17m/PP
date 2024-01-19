import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import { getChats, changeCurrentChat } from "./../../redux/features/chats"
import ChatsPanel from "./ChatsPanel/ChatsPanel"
import Conversation from "./Conversation/Conversation"

import './../../index.css'
import classes from "./Chats.module.css"




export default function Chats(){
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.value)
	const chats = useSelector(state => state.chats.chats)
	const isMobile = useSelector(state => state.mobile.isMobile)
	const currentChat = useSelector(state => state.chats.currentChat) 

	useEffect(() => {
		dispatch(getChats());
	}, [dispatch])

	if (isMobile){
		return (
			<div className={classes.chats}>
				{currentChat.user_nickname ? <Conversation/> : <ChatsPanel/>}
			</div>
		);
	}
	else{
		return (
			<div className={classes.chats}>
				<ChatsPanel/> 
				{currentChat.user_nickname ? <Conversation/> : <div></div>}
			</div>
		);
	}
}