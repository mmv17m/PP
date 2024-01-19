import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import config from "./../../config"




export const register = (user, callback) => {
	console.log(user)

	axios.post(`${config.defaultUrl}auth/register`, user, { withCredentials: true }).then(
		res => {
			console.log(res, res.status)
			if (res.status == 201){
				console.log("Successful!")
				callback()
			}
			else{
				console.log("error during the register") //если будет время, изменить это
			}
		}
	).catch(
		error => {console.log("error during the register")}
	)
}


export const logIn = (user, callback) => {
	let userParams =   new URLSearchParams(user)
	axios.post(`${config.defaultUrl}auth/jwt/login`, userParams, { withCredentials: true }, {headers: {'accept': 'application/json'}}).then(res=>{
		callback()
	}).catch(err=>{
		console.log(err)
	})
}


export const fetchUser = createAsyncThunk(
	"user/fetchUser",
	async function(){
    	const result = await axios.get(`${config.defaultUrl}auth/get_user`, {withCredentials: true});
    	if (result.status === 201 || result.status === 200) {
    	    return result.data;
    	}
    	return {}
	}
)


const userSlice = createSlice({
	name: "user",
	initialState: {value: null},
	reducers: {},
	extraReducers: (builder) => {
    	builder
    	.addCase(fetchUser.fulfilled, (state, action) => {
            return {
                ...state,
                value: action.payload,
            };
    	})
  	}

})


export default userSlice.reducer;