import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'

import { getStudents, setCurrentStudent } from "./../../redux/features/students"

import './../../index.css'
import classes from './ChooseStudent.module.css'




// переделать чтобы все было красиво
export default function ChooseStudent(){    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    const students = useSelector(state => state.students.students)
    const currentStudent = useSelector(state => state.students.currentStudent)

    useEffect(() => {
        dispatch(getStudents());
    }, [dispatch])

    return (
        <select value={currentStudent ? currentStudent.id : user.id} className={classes.select} onChange={(e) => dispatch(setCurrentStudent({id: e.target.value}))} single>
            <option className={classes.option} key={user.id} value={user.id}>{user.nickname}</option>
            {students.map(o => (
                <option className={classes.option} key={o.id} value={o.id}>{o.nickname}</option>
            ))}
        </select>
    )
}
