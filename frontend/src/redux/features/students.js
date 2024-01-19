import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"




export const getStudents = createAsyncThunk(
	"user/getStudents",
	async function(params, callback){
		const result = await axios.get(`${config.defaultUrl}students/get_my_students`, {withCredentials: true})
		if (result.status == 200){
			return result.data
		}

		return {}
	}
)


const studentsSlice = createSlice({
	name: "students",
	initialState: {students: [], currentStudent: {}},
	reducers: {
		setCurrentStudent(state, action){
			state.currentStudent = {...state.students.find(o => o.id === action.payload.id)}
		}
	},
	extraReducers: (builder) => {
    	builder
    	.addCase(getStudents.fulfilled, (state, action) => {
    		state.students = action.payload
            return state;
    	})
  	}

})


export const {setCurrentStudent} = studentsSlice.actions
export default studentsSlice.reducer;