import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import axios from "axios"

import ConversationHeader from "./ConversationHeader/ConversationHeader"
import MessageField from "./MessageField/MessageField"
import Messages from "./Messages/Messages"
import { getMessages, addMessage, setFetching } from "./../../../redux/features/messages"

import './../../../index.css'
import classes from "./Conversation.module.css"


export default function Conversation() {
	const dispatch = useDispatch()
	const me = useSelector(state => state.user.value)
	const chat = useSelector(state => state.chats.currentChat) 
	const messages = useSelector(state => state.messages.messages)
	const fetching = useSelector(state => state.messages.fetching)

	const [ws, setWs] = useState(false)

	useEffect(() =>{
		loadMessages()
	}, [])

	useEffect(() => {
		if (fetching){
			getMyMessages()
		}
		
	}, [fetching])

	useEffect(() => {
		const newWs = new WebSocket(`ws://localhost:7123/chats_ws/${chat.id}`);
		newWs.addEventListener("message", onMessage);
		setWs(newWs);
		return () => {
			newWs.removeEventListener("message", onMessage);
			newWs.close();
		};
	}, [chat.id]);


	const getMyMessages = () => {
		let params = {chat_id: chat.id}
		if (messages.length) {
			params.start_time = messages[messages.length - 1].created_at;
		}
		dispatch(getMessages(params), () => (dispatch(setFetching({value: false}))))
	}
		
	const onMessage = (event) => {
  		const newMessage = JSON.parse(JSON.parse(event.data));
		if (newMessage){
			dispatch(addMessage(newMessage))
		}
	};

	const loadMessages = () =>{
		if (!fetching){
			dispatch(setFetching({value: true}))
		}
	}

	const sendMessage = (text) => {
		ws.send(text);
	};

	if (chat) {
		return (
			<div className={classes.conversation}>
    	  		<ConversationHeader/>
    	    	<Messages scroll={loadMessages}/>
				<MessageField onEnter={sendMessage} />
			</div>
		);
	} else {
		return <div></div>;
	}
}