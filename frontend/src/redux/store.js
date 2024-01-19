import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/user"
import chatsReducer from "./features/chats"
import messagesReducer from "./features/messages"
import trainersReducer from "./features/trainers"
import studentsReducer from "./features/students"
import progressReducer from "./features/progress"
import dietReducer from "./features/diet"
import trainingsReducer from "./features/trainings"
import dateReducer from "./features/date"
import mobileReducer from "./features/mobile"




const store = configureStore({
	reducer: {
		user: userReducer,
		chats: chatsReducer,
		messages: messagesReducer,
		trainers: trainersReducer,
		students: studentsReducer,
		progress: progressReducer,
		diet: dietReducer,
		trainings: trainingsReducer,
		date: dateReducer,
		mobile: mobileReducer
	}
})

export default store;