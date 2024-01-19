import React, { useState } from "react"
import axios from "axios"

import Modal from "./../Modal/Modal"
import SearchField from "./../SearchField/SearchField"
import PlusButton from "./../PlusButton/PlusButton"

import './../../index.css'
import classes from "./Search.module.css"




export default function Search({close, component, searchFunction = (v, callback) => {}, addFunction = (id) => {}, buttonFunction = null}){
	const [data, setData] = useState([])

	const search = (value) => {
		searchFunction(value, (data) => setData(data))
	}

	return (
		<div className={classes.container}>
			<Modal close={close}>
				<div className={classes.window}>
					<div className={classes.search}><SearchField onEnter={search}/></div>
					<div className={classes.results}>
						{data.map(c => {
							const DynamicComponent = component;
							return <DynamicComponent key={c.id} value={c} onClick_={(id) => {addFunction(id); close()}}/>		
						})}
						{buttonFunction ? <PlusButton onClick_={buttonFunction}/> : null}
					</div>
				</div>
			</Modal>
		</div>
	)
}