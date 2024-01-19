import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"
import { getDatetime } from "./../../utils"




export const createTraining = (training, callback, user_id=null) => {
	let params = {}
	if (user_id){params.user_id = user_id}
	axios.post(`${config.defaultUrl}trainings/create_user_training`, training, { withCredentials: true, params: params}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}

export const finishTraining = (training_id, span) => {
	let params = {id: training_id, span: span, finishing_time: getDatetime()}
	axios.post(`${config.defaultUrl}trainings/finish_training`, params, { withCredentials: true}).catch((e) => console.log(e))	
}


export const addExercise = (exercise, callback) => {
	axios.post(`${config.defaultUrl}trainings/add_exercise`, exercise, { withCredentials: true}).then((r) => {
		if (r.status == 200){callback(r.data)}
	}).catch((e) => console.log(e))	
}


export const createExercise = (exercise) => {
	axios.post(`${config.defaultUrl}trainings/create_exercise`, exercise, { withCredentials: true}).catch((e) => console.log(e))	
}


export const getExercises = (name, callback) => {
	const params = {name: name}
	axios.get(`${config.defaultUrl}trainings/get_exercises`, { params: params, withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback(r.data)}
	}).catch((e) => console.log(e))	
}


export const deleteTraining = (training_id, callback, user_id=null) => {
	console.log(training_id)
	let params = {training_id: training_id}
	if (user_id){params.user_id = user_id}
	axios.post(`${config.defaultUrl}trainings/delete_user_training`, {}, { withCredentials: true, params: params}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const removeExercise = (e_id, callback) => {
	let params = {exercise_in_training_id: e_id}
	axios.post(`${config.defaultUrl}trainings/remove_exercise`, {}, { withCredentials: true, params: params}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const getTrainings = createAsyncThunk(
	"trainings/getTrainings",
	async function({ date, user_id = null }){
		let params = {date: date}
		if (user_id){params.user_id = user_id}
		const result = await axios.get(`${config.defaultUrl}trainings/get_user_trainings`, {withCredentials: true, params: params})
		if (result.status == 200){
			return result.data
		}
		return {}
	}
)


export const getTraining = createAsyncThunk(
	"trainings/getTraining",
	async function( training_id ){
		let params = {training_id: training_id}
		const result = await axios.get(`${config.defaultUrl}trainings/get_user_training`, {withCredentials: true, params: params})
		if (result.status == 200){
			return result.data
		}
		return {}
	}
)


const trainingsSlice = createSlice({
	name: "trainings",
	initialState: {trainings: [], trainingChange: {exercises: []}},
	reducers: {},
	extraReducers: (builder) => {
    	builder
    	.addCase(getTrainings.fulfilled, (state, action) => {
    		state.trainings = action.payload
            return state;
    	})
		.addCase(getTraining.fulfilled, (state, action) => {
    		state.trainingChange = action.payload
            return state;
    	})
  	}

})


export default trainingsSlice.reducer;