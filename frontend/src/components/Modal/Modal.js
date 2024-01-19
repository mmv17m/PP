import React from "react"

import './../../index.css'
import classes from './Modal.module.css'


export default function Modal ({close, children}){
    return (
        <div className={classes.modal}>
            <div className={classes.container} onClick={close}>
                <div className={classes.content} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );  
}
