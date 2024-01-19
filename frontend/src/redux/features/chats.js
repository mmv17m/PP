import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"



export function searchPossibleChats(nickname, callback){
	let params = {
		amount: 10,
		nickname: nickname
	}
	axios.get(`${config.defaultUrl}chats/get_users`, {withCredentials: true, params: params}).then(r=>{ 
		if (r.status==200){
			callback(r.data)
		}
	}).catch(e=>{console.log(e)})
}


export function newChat(id, callback){
	axios.post(`${config.defaultUrl}chats/create_chat`, {}, {withCredentials: true, params: {id: id}}).then(r=>{
		if (r.status==200){
			callback()
		}
	}).catch(e => console.log(e))
}


export const getChats = createAsyncThunk(
	"user/getChats",
	async function(){
    	const result = await axios.get(`${config.defaultUrl}chats/get_chats`, {withCredentials: true})
		if (result.status == 200){
			return result.data
		}

		return {}
	}
)


const chatsSlice = createSlice({
	name: "chats",
	initialState: {chats: [], currentChat: {id: "", nickname: null}},
	reducers: {
		changeCurrentChat(state, action){
			state.currentChat = {...state.chats.find(o => o.id === action.payload.id)}
		}
	},
	extraReducers: (builder) => {
    	builder
    	.addCase(getChats.fulfilled, (state, action) => {
    		let new_chats = action.payload
    		state.chats = new_chats
            return state;
    	})
  	}

})


export const {changeCurrentChat} = chatsSlice.actions
export default chatsSlice.reducer;