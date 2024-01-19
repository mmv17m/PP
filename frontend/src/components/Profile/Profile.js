import React from "react"
import {useSelector} from 'react-redux'

import Modal from "./../Modal/Modal"
import DefaultTextInput from "./../DefaultTextInput/DefaultTextInput"
import DefaultSelect from "./../DefaultSelect/DefaultSelect"
import DefaultButton from "./../DefaultButton/DefaultButton"
import DefaultDateInput from "./../DefaultDateInput/DefaultDateInput"
import UserCard from "./UserCard/UserCard"


import './../../index.css'
import classes from './Profile.module.css'


function Profile({close}){
    const user = useSelector(state => state.user.value)

    const changeValue = (event) => {}

    return (
        <Modal close={close}>
            <div className={classes.profile}>
                <div className={classes.user_card}><UserCard joined={user.joined} training_sessions={125}/></div>
                <div className={classes.fields_container}>
                    <DefaultTextInput placeholder="Nickname" value={user.nickname} changeValue={changeValue}/>
                    <DefaultTextInput placeholder="Email" value={user.email} changeValue={changeValue}/>
                    <div className={classes.select_menus}>
                        <DefaultSelect options={["man", "woman"]} value={user.gender} placeholder={"Gender"} changeValue={changeValue}/>
                        <DefaultSelect options={["trainer", "student"]} value={user.role} placeholder={"Gender"} changeValue={changeValue}/>
                    </div>
                    <DefaultDateInput placeholder="Birth date" value={user.birthdate} changeValue={changeValue}/>
                    <div className={classes.buttons}>
                        <DefaultButton isMain={false} onClick_={close} text="Cancel"/>
                    </div>
                </div>
            </div>
        </Modal>
    );  
}


export default Profile;
