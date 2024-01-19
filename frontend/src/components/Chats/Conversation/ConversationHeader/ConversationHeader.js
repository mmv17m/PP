import React from "react"
import {useSelector, useDispatch} from 'react-redux'

import OptionsButton from "./OptionsButton/OptionsButton"
import { changeCurrentChat } from "./../../../../redux/features/chats"

import './../../../../index.css'
import classes from "./ConversationHeader.module.css"
import example_avatar_1 from "./../../../avatar_examples/1.png"




export default function ConversationHeader(){
	const dispatch = useDispatch()
	const chat = useSelector(state => state.chats.currentChat) 
	const isMobile = useSelector(state => state.mobile.isMobile)

	const onBack = () => {
		dispatch(changeCurrentChat({}))
	}

	return (
		<div className={classes.conversation_header}>
			<div className={classes.user}>
				{isMobile && (
					<button className={classes.backButton} onClick={onBack}>&#8592;</button>
				)}
				<img src={example_avatar_1} className={classes.img}/>
				<div>
					<div className={classes.nickname}>{chat.user_nickname}</div>
					<div className={classes.last_seen}>{chat.user_registration_date}</div>
				</div>
			</div>
			<OptionsButton/>
		</div>
	);
}
