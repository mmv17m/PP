import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"


export const getMessages = createAsyncThunk(
	"user/getMessages",
	async function(params, callback){
    	const result = await axios.get(`${config.defaultUrl}chats/get_messages`, { withCredentials: true, params: params })
		if (result.status == 200){
			return result.data
		}
		return {}
	}
)


const messagesSlice = createSlice({
	name: "messages",
	initialState: {messages: [], fetching: false},
	reducers: {
		addMessage(state, action){
			state.messages = [action.payload, ...state.messages]
		},
		setFetching(state, action){
			state.fetching = action.payload.value
		}
	},
	extraReducers: (builder) => {
    	builder
    	.addCase(getMessages.fulfilled, (state, action) => {
    		state.messages = [...state.messages, ...action.payload]
            state.fetching = false
            return state;
    	})
  	}

})


export const {addMessage, setFetching} = messagesSlice.actions
export default messagesSlice.reducer;