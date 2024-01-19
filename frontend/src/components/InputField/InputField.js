import React, { useState } from "react"
import axios from "axios"

import Modal from "./../Modal/Modal"
import DefaultButton from "./../DefaultButton/DefaultButton"

import './../../index.css'
import classes from "./InputField.module.css"
import example_avatar_1 from "./../avatar_examples/1.png"




export default function InputField({close, fields = [], addFunction = (p) => {}}){
	const [values, setValues] = useState(new Array(fields.length).fill(""))

	const setValue = (i, value) =>{
		let new_values = [...values]
		const new_value = value
		new_values[i] = new_value
		setValues(new_values)
	}

	return (
		<div>
			<Modal close={close}>
				<div className={classes.container}>
					{fields.map((f) => {
						return <input 
							key={f[0]} 
							type={f[1]} 
							placeholder={f[2]} 
							value={values[f[0]]} 
							className={classes.field} 
							onChange={(e) => setValue(f[0], e.target.value)}
						></input>
					})}
					<DefaultButton onClick_={() => {addFunction(values); close()}} text={"Save"} isMain={true}/>
					<DefaultButton onClick_={() => close()} text={"Cancel"} isMain={false}/>
				</div>
			</Modal>
		</div>
	)
}