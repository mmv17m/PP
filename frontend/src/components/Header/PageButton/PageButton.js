import React from "react"
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./PageButton.module.css"




export default function PageButton({page, text}){
	const navigation = useNavigate();
	const currentPage = useLocation().pathname;

	const changePage = () => {
		navigation(page);
	};

	return (
		<div onClick={changePage} className={currentPage === page ? classes.current_page_button : classes.page_button}>{text}</div>
	);
}