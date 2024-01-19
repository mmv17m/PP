import React from "react"

import './../../../index.css'
import classes from './UserCard.module.css'
import icon from "./user.svg"


function UserCard({joined, training_sessions}){
    return (
        <div className={classes.user_card}>
            <div className={classes.img_container}>
                <img className={classes.img} src={icon}/>
            </div>
            <div className={classes.information}>
                <span className={classes.text}>{`Joined: ${joined}`}</span>
                <span className={classes.text}>{`Training sessions: ${training_sessions}`}</span>
            </div> 
        </div>
    );   
}


export default UserCard;
