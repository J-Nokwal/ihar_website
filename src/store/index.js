import {  configureStore } from "@reduxjs/toolkit";
import authSlice from "./authStore";
import trySlice from "./tryStore";
import feedSlice from "./feedStore";
import commentsSlice from "./commentsStore";
import routerSlice from "./routerStore";
import userProfileSlice from "./userProfileStore";
import searchSlice from "./searchStore";
import postRumorSlice from "./postRumorStore";
import singlePostStore from "./singlePostStore";
const store =configureStore({
    reducer :{
        auth: authSlice.reducer,
        feed:feedSlice.reducer,
        comments:commentsSlice.reducer,
        route:routerSlice.reducer,
        userProfile:userProfileSlice.reducer,
        search:searchSlice.reducer,
        postRumor:postRumorSlice.reducer,
        singlePostStore:singlePostStore.reducer,
        try:trySlice.reducer,

    }, 
    // middleware:applyMiddleware([thunk])
    
})


export default store;