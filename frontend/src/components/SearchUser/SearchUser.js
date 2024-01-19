import React, { useState } from "react"
import axios from "axios"

import Modal from "./../Modal/Modal"
import SearchField from "./../SearchField/SearchField"
import Chat from "./../Chat/Chat"

import './../../index.css'
import classes from "./SearchUser.module.css"
import example_avatar_1 from "./../avatar_examples/1.png"




export default function SearchUser({close, searchFunction = (v, callback) => {}, addFunction = (id) => {}}){
	const [users, setUsers] = useState([])

	const search = (value) => {
		searchFunction(value, (users) => setUsers(users))
	}

	return (
		<div className={classes.container}>
			<Modal close={close}>
				<div className={classes.new_chat}>
					<div className={classes.search}><SearchField onEnter={search}/></div>
					<div className={classes.chats}>
						{users.map(c => {
							return <Chat 
								key={c.id} 
								chatId={c.id}
								nickname={c.nickname} 
								isCurrent={false}
								onClick_={(id) => {addFunction(id); close()}}
							/>		
						})}
					</div>
				</div>
			</Modal>
		</div>
	)
}