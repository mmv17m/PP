import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"
import { getDatetime } from "./../../utils"




export const addMeal = (meal, callback) => {
	const time = getDatetime()
	meal.created_at = time
	axios.post(`${config.defaultUrl}diet/create_meal`, meal, { withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const createDish = (dish) => {
	axios.post(`${config.defaultUrl}diet/create_dish`, dish, { withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){console.log("Successful")}
	}).catch((e) => console.log(e))	
}


export const addDish = (dish, callback) => {

	axios.post(`${config.defaultUrl}diet/add_dish`, dish, { withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const setNorms = (user_id, norms, callback) => {
	const params = {}
	if (user_id){params.user_id = user_id}
	axios.post(`${config.defaultUrl}diet/set_user_norms`, norms, { params: params, withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const getDishes = (name, callback) => {
	const params = {dish: name}
	axios.get(`${config.defaultUrl}diet/get_dishes`, { params: params, withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback(r.data)}
	}).catch((e) => console.log(e))	
}


export const getMeals = createAsyncThunk(
	"diet/getMeals",
	async function({ date, user_id = null }){
		console.log(date)
		let params = {date: date}
		if (user_id){params.user_id = user_id}
		const result = await axios.get(`${config.defaultUrl}diet/get_user_meals`, {withCredentials: true, params: params})
		if (result.status == 200){
			return result.data
		}
		return {}
	}
)


export const getNorms = createAsyncThunk(
	"diet/getNorms",
	async function(user_id=null){
		let params = {}
		if (user_id){params.user_id = user_id}
		const result = await axios.get(`${config.defaultUrl}diet/get_user_norms`, {withCredentials: true, params: params})
		if (result.status == 200){
			return result.data
		}
		return {}
	}
)


const dietSlice = createSlice({
	name: "diet",
	initialState: {meals: [], norms: {}, total: {calories: 0, proteins: 0, fats: 0, carbohydrates: 0, water: 0}},
	reducers: {},
	extraReducers: (builder) => {
    	builder
    	.addCase(getMeals.fulfilled, (state, action) => {
    		state.total = {calories: 0, proteins: 0, fats: 0, carbohydrates: 0, water: 0}
            state.meals = action.payload
            state.meals.forEach((i) => {
            	i.total = {calories: 0, proteins: 0, fats: 0, carbohydrates: 0, water: 0}
            	i.dishes.forEach((j) => {
            		const c = j.weight/100
            		i.total.calories += j.calories*c
            		i.total.proteins += j.proteins*c
            		i.total.fats += j.fats*c
            		i.total.carbohydrates += j.carbohydrates*c
            		i.total.water += j.water*c
            	})
            	state.total.calories += i.total.calories
            	state.total.proteins += i.total.proteins
            	state.total.fats += i.total.fats
            	state.total.carbohydrates += i.total.carbohydrates
            	state.total.water += i.total.water
            })

            return state;
    	})
    	.addCase(getNorms.fulfilled, (state, action) => {
            state.norms = action.payload
            return state;
    	})
  	}

})


export default dietSlice.reducer;