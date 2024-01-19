import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'

import Logo from "./Logo/Logo";
import PageButton from "./PageButton/PageButton";
import ProflieButton from "./ProflieButton/ProflieButton";
import BurgerMenu from "./BurgerMenu/BurgerMenu"

import "./../../index.css";
import classes from "./Header.module.css";




export default function Header({ openProfile }) {
	const pages = [
		{ text: "Diet", page: "/diet" },
		{ text: "Chats", page: "/chats" },
		{ text: "Trainings", page: "/trainings" },
		{ text: "Progress", page: "/progress" },
		{ text: "Trainers", page: "/trainers" },
	];
	const isMobile = useSelector(state => state.mobile.isMobile)
	const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);

	const handleBurgerMenuClick = () => {
		setIsBurgerMenuOpened(isBurgerMenuOpened ? false : true)
	};


	return (
		<header className={classes.header}>
			<div className="jc_space_between container">
				<ul className="standart_flex_row">
					<li>
						<Logo />
					</li>
					{!isMobile && pages.map((p) => (
						<li key={p.page}>
							<PageButton page = {p.page} text={p.text} />
						</li>
					))}
				</ul>
				{!isMobile && <ProflieButton onClick_={openProfile} />}
				{isMobile && <button className={classes.burger_button} onClick={handleBurgerMenuClick}>☰</button>}
				{isBurgerMenuOpened && <BurgerMenu pages={pages} openProfile={openProfile}/>}
			</div>
		</header>
	);
}