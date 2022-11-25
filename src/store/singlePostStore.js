import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appAuth } from '../firebase/AppAuth'
import { PostRequest } from "../Requests/PostsRequest";

const singlePostStore = createSlice({
    name: 'singlePost',
    initialState: {
        isloading:true,
        post:null,
        error:null,
    },
    reducers: {
        replaceData(state, action) {
            state.isloading=action.payload.isloading??state.isloading;
            state.post=action.payload.post??state.post;
            state.error=action.payload.error??state.error;

        },
    },
})
export default singlePostStore;

export const getPostData = createAsyncThunk('singlePostStore/getPostData', async (uid, thunkApi) => {
    console.log("qqqqqqqqqqqq",uid);
    thunkApi.dispatch(singlePostStore.actions.replaceData({isloading:true}))
   var post= await PostRequest.getPostForUser(uid,appAuth.auth.currentUser?.uid)
    thunkApi.dispatch(singlePostStore.actions.replaceData({isloading:false,post:post}))
})