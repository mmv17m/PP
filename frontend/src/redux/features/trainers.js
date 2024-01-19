import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"




export function searchPossibleTrainers(nickname, callback){
	let params = {
		amount: 10,
		nickname: nickname
	}
	axios.get(`${config.defaultUrl}trainers/get_possible_trainers`, {withCredentials: true, params: params}).then(r=>{ 
		if (r.status==200){
			callback(r.data)
		}
	}).catch(e=>{console.log(e)})
}


export function newTrainer(id, callback){
	axios.post(`${config.defaultUrl}trainers/create_trainer`, {}, {withCredentials: true, params: {trainer_id: id}}).then(r=>{
		if (r.status==200){
			callback()
		}
	}).catch(e => console.log(e))
}


export function deleteTrainer(id, callback){
	axios.post(`${config.defaultUrl}trainers/delete_trainer`, {}, {withCredentials: true, params: {trainer_id: id}}).then(r=>{
		if (r.status==200){
			callback()
		}
	}).catch(e => console.log(e))
}


export const getTrainers = createAsyncThunk(
	"user/getTrainers",
	async function(params, callback){
		const result = await axios.get(`${config.defaultUrl}trainers/get_my_trainers`, {withCredentials: true})
		if (result.status == 200){
			return result.data
		}

		return {}
	}
)


const trainersSlice = createSlice({
	name: "trainers",
	initialState: {trainers: []},
	reducers: {},
	extraReducers: (builder) => {
    	builder
    	.addCase(getTrainers.fulfilled, (state, action) => {
    		state.trainers = action.payload
            return state;
    	})
  	}

})


export default trainersSlice.reducer;