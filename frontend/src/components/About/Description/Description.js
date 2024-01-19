import React from "react"
import { useNavigate } from 'react-router-dom';

import DefaultButton from "./../../DefaultButton/DefaultButton"

import './../../../index.css'
import classes from "./Description.module.css"




export default function Description(){
	const navigation = useNavigate()
	return (
		<div className={classes.description}>
			<h1 className={classes.title}>Platform Title - a platform for online personal trainers</h1>
			<p className={classes.subtitle}>Platform title is a functional online platform for online fitness coaches and their students. The platform provides all the necessary functions for your workout. It is also available for all the popular systems. Improve your online workout experience with Platform title.</p>
			<div className={classes.buttons}>
				<DefaultButton width={300} isMain={true} height={40} onClick_={() => navigation("/login")} text="Log in"/>
				<DefaultButton width={300} isMain={false} height={40} onClick_={() => navigation("/signup")} text="Sign up"/>
			</div>
		</div>					
	);
}
