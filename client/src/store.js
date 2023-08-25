import { configureStore } from "@reduxjs/toolkit";
import { userProfileReducer, userReducer } from "./Reducers/User";
import { postReducer, userPostReducer } from "./Reducers/Post";

const store = configureStore({
    reducer: {
        user:userReducer,
        post: postReducer,
        userPosts: userPostReducer,
        userProfile: userProfileReducer
    }
})

export default store