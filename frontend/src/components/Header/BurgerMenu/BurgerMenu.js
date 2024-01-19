import React from "react"

import PageButton from "./../PageButton/PageButton";
import ProflieButton from "./../ProflieButton/ProflieButton";

import classes from "./BurgerMenu.module.css"




export default function BurgerMenu({pages = [], openProfile=()=>{}}){
	return (
		<div className={classes.container}>
			<ul className={classes.links}>
					{pages.map((p) => (
						<li key={p.page}>
							<PageButton page = {p.page} text={p.text} />
						</li>
					))}
					<li><ProflieButton onClick_={openProfile}/></li>
				</ul>
		</div>
	);
}