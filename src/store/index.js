import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authStore";
import thunk from "redux-thunk";
import trySlice from "./tryStore";
import feedSlice from "./feedStore";
import commentsSlice from "./commentsStore";
import routerSlice from "./routerStore";
import userProfileSlice from "./userProfileStore";
const store =configureStore({
    reducer :{
        auth: authSlice.reducer,
        feed:feedSlice.reducer,
        comments:commentsSlice.reducer,
        route:routerSlice.reducer,
        userProfile:userProfileSlice.reducer,
        try:trySlice.reducer,

    }, 
    // middleware:applyMiddleware([thunk])
    
})


export default store;