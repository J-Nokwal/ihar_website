import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostsFeed from "../components/PostsFeed";
import { appAuth, auth } from '../firebase/AppAuth'
import { AvatarRequests } from "../Requests/AvatarRequest";
import { PostRequest } from "../Requests/PostsRequest";
import { UsersRequests } from "../Requests/UserRequests";

const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        loading: true,
        posts: [],
        moreLoading: false,
        hasRechedMax: false,
        error: null,
        pageId: 0,
        noOfPages: 1,
        queryTime: null,
    },
    reducers: {
        replaceData(state, action) {
            state.loading = action.payload.loading ?? state.loading;
            state.posts = action.payload.posts ?? state.posts;
            state.moreLoading = action.payload.moreLoading ?? state.moreLoading;
            state.error = action.payload.error ?? state.error;
            state.hasRechedMax = action.payload.hasRechedMax ?? state.hasRechedMax;
            state.pageId = action.payload.pageId ?? state.pageId;
            state.noOfPages = action.payload.noOfPages ?? state.noOfPages;
            state.queryTime = action.payload.queryTime ?? state.queryTime;
        },
        addFeed(state, action) {
            // console.log(action.payload.posts)
            state.posts.push(...action.payload.posts);
            state.moreLoading = false;
            state.loading = false;
            state.pageId = action.payload.pageId ?? state.pageId;
            if (action.payload.noOfPages!==0){
                console.log("no of pages to: ",action.payload.noOfPages);
                state.noOfPages = action.payload.noOfPages ?? state.noOfPages;
            }
            if (state.pageId>= state.noOfPages){
                state.hasRechedMax = true;

            }
            state.queryTime = action.payload.queryTime ?? state.queryTime;
        }
    },
})
export default feedSlice;



export const getFeedsAction = createAsyncThunk('feed/getfeedAction', async (isRefresed, thunkApi) => {
    if (isRefresed) {
        thunkApi.dispatch(feedSlice.actions.replaceData({
            loading: true,
            posts: [],
            moreLoading: false,
            hasRechedMax: false,
            error: null,
            pageId: 0,
            noOfPages: 1,
            queryTime: null,
        }));
    }
    var feedState = thunkApi.getState().feed
    var currentuser = thunkApi.getState().auth.user

    console.log("sssssss", feedState,);
    try {
       
        if (feedState.hasRechedMax) {
            return;
        }

        if (feedState.posts.length !== 0) {
            thunkApi.dispatch(feedSlice.actions.replaceData({
                moreLoading: true,
            }));
        }
        var postsResponse = await PostRequest.getPostByPageIdByUser(feedState.pageId, currentuser.userId, feedState.queryTime);
        var pageId = feedState.pageId + 1;
        console.log(pageId,postsResponse.noOfPages,pageId >= postsResponse.noOfPages);
        var hasRechedMax= (pageId >= postsResponse.noOfPages) ? true : false;
        await new Promise(resolve => setTimeout(resolve, 1000));
        thunkApi.dispatch(feedSlice.actions.addFeed({
            posts: postsResponse.posts,
            // hasRechedMax: hasRechedMax,
            pageId: pageId,
            noOfPages: postsResponse.noOfPages,
            queryTime: postsResponse.queryTime,
        }));
        console.log("postresponse",postsResponse,thunkApi.getState().feed);
        // thunkApi.dispatch(feedSlice.actions.replaceData({
        //     moreLoading: false,
        // }));

    } catch (error) {
        console.log(error);
    }
})
