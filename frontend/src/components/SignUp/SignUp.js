import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';

import './../../index.css'
import classes from "./SignUp.module.css"

import DefaultTextInput from "./../DefaultTextInput/DefaultTextInput"
import DefaultSelect from "./../DefaultSelect/DefaultSelect"
import PasswordInput from "./../PasswordInput/PasswordInput"
import DefaultButton from "./../DefaultButton/DefaultButton"
import DefaultDateInput from "./../DefaultDateInput/DefaultDateInput"
import { register } from "./../../redux/features/user"




export default function SignUp(){
	const [profile, setProfile] = useState({
		nickname: "",
		email: "",
		password: "",
		gender: "man",
		role: "trainer",
		birthdate: "",
	})
	const navigate = useNavigate()

	const registerNewUser = () => {
		const user = profile
		const result = register(user, () => navigate("/login"))
		
	}

	return (
		<div className={classes.container}>
			<div className={classes.inputs}>
				<DefaultTextInput placeholder="Nickname" value={profile.nickname} changeValue={(v) => setProfile({...profile, nickname: v})}/>
    	    	<DefaultTextInput placeholder="Email" value={profile.emial} changeValue={(v) => setProfile({...profile, email: v})}/>
        		<PasswordInput placeholder="Password" value={profile.password} changeValue={(v) => setProfile({...profile, password: v})}/>
        		<div className={classes.options}>
        		    <DefaultSelect options={["man", "woman"]} placeholder={"Gender"} value={profile.gender} changeValue={(v) => setProfile({...profile, gender: v})}/>
        		    <DefaultSelect options={["trainer", "student"]} placeholder={"Role"} value={profile.role} changeValue={(v) => setProfile({...profile, role: v})}/>
        		</div>
        		<DefaultDateInput placeholder="Birth date" value={profile.birthdate} changeValue={(v) => setProfile({...profile, birthdate: v})}/>
        		<div className={classes.buttons}>
        		    <DefaultButton isMain={true} onClick_={registerNewUser} text="Sign up"/>
        		    <DefaultButton isMain={false} onClick_={() => navigate("login")} text="Log in"/>
        		</div>
        	</div>
		</div>					
	);
}