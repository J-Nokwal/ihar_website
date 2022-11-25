import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appAuth } from '../firebase/AppAuth'
import { appFireBaseStorage } from "../firebase/FireBaseStorage.ts";
import { PostRequest } from "../Requests/PostsRequest";

const postRumorSlice = createSlice({
    name: 'postRumor',
    initialState: {
        isLoading: false,
        isUploadingFinished:false,
        error: null
    },
    reducers: {
        replaceData(state, action) {
            state.isLoading = action.payload.isLoading ?? state.isLoading
            state.error = action.payload.error ?? state.error
            state.isUploadingFinished = action.payload.isUploadingFinished ?? state.isUploadingFinished
        },
    },
})
export default postRumorSlice;

export const postRumorAction = createAsyncThunk('postRumor/postRumorAction', async ({ image, message }, thunkApi) => {
    thunkApi.dispatch(postRumorSlice.actions.replaceData({ isLoading: true ,isUploadingFinished:false}))
    if (image === null && message === "") {
        thunkApi.dispatch(postRumorSlice.actions.replaceData({ error: Error("Both Image and Message can't be empty."), isLoading: false }))
        return
    }
    var url = null;
    if (image != null) {
        console.log(image);
        url =await  appFireBaseStorage.uploadImage(image)
    }
    
    await PostRequest.createPost({
        "message": message,
        "post_photo_link": url,
        "userId": appAuth.auth.currentUser.uid,
    });
    // thunkApi.dispatch(getFeedsAction(true));
    thunkApi.dispatch(postRumorSlice.actions.replaceData({isLoading: false ,isUploadingFinished:true}))


})