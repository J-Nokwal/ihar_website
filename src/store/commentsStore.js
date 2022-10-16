import { createAsyncThunk, createSlice, Store,ThunkAction } from "@reduxjs/toolkit";
import { appAuth } from '../firebase/AppAuth'
import { CommentsRequests } from "../Requests/CommentsRequests";
import { UsersRequests } from "../Requests/UserRequests";

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        showCommentsBox:false,
        isLoading:true,
        postId:null,
        postCommentsloading:false,
        comments:[],
        error:false,
    },
    reducers: {
        replaceData(state, action) {
            state.showCommentsBox=action.payload.showCommentsBox??state.showCommentsBox
            state.isLoading=action.payload.isLoading??state.isLoading
            state.postId=action.payload.postId??state.postId
            state.postCommentsloading=action.payload.postCommentsloading??state.postCommentsloading
            state.comments=action.payload.comments??state.comments
            state.error=action.payload.error??state.error
        },
        triggerCommentBox(state,action){
            state.showCommentsBox = action.payload.showCommentsBox;
        },
        addComment(state,action){
            state.postCommentsloading=false;
            state.comments.push(action.payload.comment)
        }
    },
})

export const openCommentBox = createAsyncThunk('comments/openCommentBox', async (postId, thunkApi) => {
    thunkApi.dispatch(commentsSlice.actions.replaceData({
        showCommentsBox:true,
        isLoading:true,
        
    }));
    await new Promise(resolve => setTimeout(resolve, 300));

    var responseCommens=await CommentsRequests.getAllCommentForPost(postId);

    thunkApi.dispatch(commentsSlice.actions.replaceData({
        isLoading:false,
        comments:responseCommens,
        postId:postId
    }));
})

export const closeCommentBox = createAsyncThunk('comments/closeCommentBox', async (_, thunkApi) => {
    thunkApi.dispatch(commentsSlice.actions.triggerCommentBox({
        showCommentsBox:false
    }));
})

export const postComment = createAsyncThunk('comments/postComment', async ( { message, postId } , thunkApi) => {
    thunkApi.dispatch(commentsSlice.actions.replaceData({
        postCommentsloading:true,
    }));
    
    var  crrState =thunkApi.getState() ;
    var responseMessage=await CommentsRequests.createComment({
        userId:appAuth.auth.currentUser?.uid,
        postId:postId,
        message:message,
    });
    thunkApi.dispatch(commentsSlice.actions.addComment({
        comment:responseMessage,
    }));
})
export default commentsSlice;