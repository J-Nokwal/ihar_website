import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appAuth } from '../firebase/AppAuth'
import { PostRequest } from "../Requests/PostsRequest";
import { UsersRequests } from "../Requests/UserRequests";

const userProfileSlice = createSlice({
    name: 'try',
    initialState: {
        isloading: true,
        user: null,
        posts: [],
        gridPosts: [],
        error: null,
    },
    reducers: {
        replaceData(state, action) {
            state.isloading = action.payload.isloading ?? state.isloading
            state.user = action.payload.user ?? state.user
            state.posts = action.payload.posts ?? state.posts
            state.gridPosts = action.payload.gridPosts ?? state.gridPosts
            state.error = action.payload.error ?? state.error
        },
    },
})
export default userProfileSlice;

export const getUserDetails = createAsyncThunk('userProfile/getUserDetails', async (uid, thunkApi) => {
    thunkApi.dispatch(userProfileSlice.actions.replaceData({
        isloading: true,
    }));
    try {
        var user = await UsersRequests.getUser(uid);

    } catch (error) {
        thunkApi.dispatch(userProfileSlice.actions.replaceData({
            isloading: false,
            error:"User Not Found"
        }));
        return;
    }    
    var posts = await PostRequest.getAllPostOfUserForUser(uid, appAuth.auth.currentUser?.uid);
    var gridPosts = posts.filter((post) => post.postPhotoLink !== null && post.postPhotoLink !== "")
    console.log("post are",posts,user);
    thunkApi.dispatch(userProfileSlice.actions.replaceData({
        user: user,
        posts: posts,
        gridPosts: gridPosts,
        isloading: false
    }))
})