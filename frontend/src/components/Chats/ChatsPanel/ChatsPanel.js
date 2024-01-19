import React, { useState } from "react"
import {useSelector, useDispatch} from 'react-redux'

import SearchField from "./../../SearchField/SearchField"
import PlusButton from "./../../PlusButton/PlusButton"
import Chat from "./../../Chat/Chat"
import SearchUser from "./../../SearchUser/SearchUser"
import { getChats, changeCurrentChat, searchPossibleChats, newChat } from "./../../../redux/features/chats"

import './../../../index.css'
import classes from "./ChatsPanel.module.css"
import exampleAvatar2 from "./../../avatar_examples/4.png"




export default function ChatsPanel({}){
	const dispatch = useDispatch()
	const chats = useSelector(state => state.chats.chats)
	const currentChat = useSelector(state => state.chats.currentChat) 
	const isMobile = useSelector(state => state.mobile.isMobile)
	const [isNewChatOpened, setIsNewChatOpened] = useState(false)

	const addChat = (id) => {
		newChat(id, () => dispatch(getChats()))
	}

	
	return (
		<div className={classes.chats_panel}>
			{isNewChatOpened && <SearchUser 
				searchFunction = {(v, callback) => searchPossibleChats(v, callback)} 
				addFunction = {addChat} 
				close={() => setIsNewChatOpened(false)}
			/>}
			<div className={classes.search_field_container}>
				<SearchField/>
			</div>
			<div className={classes.chats}>
				{
					chats.map(c => {
						return <Chat 
							key={c.id} 
							chatId={c.id}
							nickname={c.user_nickname} 
							lastMessage={isMobile ? null : "This is just a message template"} 
							joined={isMobile ? null : c.user_registration_date} 
							isCurrent={currentChat.id==c.id} 
							onClick_={(id) => dispatch(changeCurrentChat({id: id}))}
						/>	
					})
				}
			</div>
			<div className={classes.plus_button_container}><PlusButton onClick_={() => setIsNewChatOpened(true)}/></div>
		</div>
	);
}