import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"


export const addValue = (value, callback) => {
	axios.post(`${config.defaultUrl}progress/add_value`, value, { withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const addMetric = (metric, callback) => {
	axios.post(`${config.defaultUrl}progress/add_metric`, metric, { withCredentials: true, headers: { 'Content-Type': 'application/json' }}).then((r) => {
		if (r.status == 200){callback()}
	}).catch((e) => console.log(e))	
}


export const getProgress = createAsyncThunk(
	"prgoress/getProgress",
	async function(chat_id=null){
		let params = {}
		if (chat_id){params.user_id = chat_id}
    	const result = await axios.get(`${config.defaultUrl}progress/get_user_progress`, {withCredentials: true, params: params})
		if (result.status == 200){
			return result.data
		}

		return {}
	}
)


const progressSlice = createSlice({
	name: "prgoress",
	initialState: {progress: []},
	reducers: {},
	extraReducers: (builder) => {
    	builder
    	.addCase(getProgress.fulfilled, (state, action) => {
    		state.progress = action.payload
            return state;
    	})
  	}

})


export default progressSlice.reducer;