import axios from "axios"
import { createSlice } from "@reduxjs/toolkit"




const dateSlice = createSlice({
	name: "date",
	initialState: { date: "", currentDate: ""},
	reducers: {
		setDate(state, action){
			state.date = action.payload.date
		},

		setCurrentDate(state, action){
			state.currentDate = action.payload.date
		}
	},
})


export const {setDate, setCurrentDate} = dateSlice.actions
export default dateSlice.reducer;