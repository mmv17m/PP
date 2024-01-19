import React, { useState, useEffect } from "react"
import {useSelector, useDispatch} from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {Navigate} from "react-router-dom";
import axios from "axios"

import Header from "./../Header/Header"
import Profile from "./../Profile/Profile"
import Chats from "./../Chats/Chats"
import About from "./../About/About"
import SignUp from "./../SignUp/SignUp"
import LogIn from "./../LogIn/LogIn"
import Trainers from "./../Trainers/Trainers"
import Progress from "./../Progress/Progress"
import Diet from "./../Diet/Diet"
import Trainings from "./../Trainings/Trainings"
import TrainingChange from "./../TrainingChange/TrainingChange"
import TrainingSession from "./../TrainingSession/TrainingSession"
import { fetchUser } from "./../../redux/features/user"
import { setIsMobile } from "./../../redux/features/mobile"

import './../../index.css'
import './App.css'




function App(){
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.value)
    const [isProfileOpened, setIsProfileOpened] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            dispatch(setIsMobile(window.innerWidth < 900));
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch])

    if (user){
        return (
            <div className="app">
                {isProfileOpened && <Profile close={() => setIsProfileOpened(false)}/>}
                <Header openProfile={() => setIsProfileOpened(true)}/>
                <div className="page_body">
                    <Routes>
                        <Route exact path="/about" element={<About/>}/>
                        <Route exact path="/chats" element={<Chats/>}/>
                        <Route exact path="/diet" element={<Diet/>}/>
                        <Route exact path="/trainings" element={<Trainings/>}/>
                        <Route exact path="/progress" element={<Progress/>}/>
                        <Route exact path="/trainers" element={<Trainers/>}/>
                        <Route exact path="/trainings/change/:id" element={<TrainingChange/>}/>
                        <Route exact path="/trainings/session/:id" element={<TrainingSession/>}/>
                        <Route path='*'element=<Navigate replace to="/trainings"/>></Route>
                    </Routes>
                </div>
            </div>
        );
    }
    else{
        return (
            <div className="app">
                <Routes>
                    <Route exact path="/about" element={<About/>}/>
                    <Route exact path="/signup" element={<SignUp/>}/>
                    <Route exact path="/login" element={<LogIn/>}/>
                    <Route path='*' element=<Navigate replace to="/about"/>></Route>
                </Routes>
            </div>
        )      
    }
}

export default App;
