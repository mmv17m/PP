import React, { useState } from "react"
import { useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'

import DefaultTextInput from "./../DefaultTextInput/DefaultTextInput"
import PasswordInput from "./../PasswordInput/PasswordInput"
import DefaultButton from "./../DefaultButton/DefaultButton"
import { logIn, fetchUser } from "./../../redux/features/user"

import './../../index.css'
import classes from "./LogIn.module.css"




export default function LogIn(){
	const [profile, setProfile] = useState({
		username: "",
		password: "",
	})
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const logInFunction = () => {
		const user = profile
		logIn(user, () => {dispatch(fetchUser());navigate("/home")})
	}

	return (
		<div className={classes.container}>
			<div className={classes.inputs}>
				<DefaultTextInput placeholder="Email" value={profile.username} changeValue={(v) => setProfile({...profile, username: v})}/>
				<PasswordInput placeholder="Password" value={profile.password} changeValue={(v) => setProfile({...profile, password: v})}/>
				<div className={classes.buttons}>
				    <DefaultButton isMain={true} onClick_={logInFunction} text="Log in"/>
				    <DefaultButton isMain={false} onClick_={() => navigate("signup")} text="Sign up"/>
				</div>
			</div>
		</div>					
	);
}
