import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { appAuth } from '../firebase/AppAuth'
import { UsersRequests } from "../Requests/UserRequests";
import jsonpAdapter from "axios-jsonp";
import { SearchRequests } from "../Requests/SearchRequests";

const searchStoreIntialState= {
    isActive:false,
    // suggestions:["Hii","manu","Repulic Day","fdsddbdfsd","dfgsfsd","sdsfgsfsd","qeaefsfsd","behsfsd",],
    suggestions:["hi","bye","sdsd"],
    crrQuery:"",
    searchResults:{posts:[],users:[]},
    isLoadingSearchResults:false,
    error:null,
};
const searchSlice = createSlice({
    name: 'search',
    initialState:searchStoreIntialState,
    reducers: {
        replaceData(state, action) {
            state.counter = state.counter+1;
            state.isActive=action.payload.isActive??state.isActive;
            state.suggestions=action.payload.suggestions??state.suggestions;
            state.crrQuery=action.payload.crrQuery??state.crrQuery;
            state.searchResults=action.payload.searchResults??state.searchResults;
            state.isLoadingSearchResults=action.payload.isLoadingSearchResults??state.isLoadingSearchResults;
            state.error=action.payload.error??state.error;
        },
        activate(state,action){
            state.isActive=true;
        },
        deActivate(state,action){
            state.isActive=false;
        },
        setDefault(state,action){
            state.suggestions=searchStoreIntialState.suggestions;
        }
    },
})
export default searchSlice;

export const searchsuggestion = createAsyncThunk('search/searchsuggestion', async (searchInput, thunkApi) => {
    thunkApi.dispatch(searchSlice.actions.activate())

    var results
        try {
            results = await axios({
                url: `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchInput}`,
                adapter: jsonpAdapter,
            });
        } catch (error) {
            console.log("error on search suggession api ")
            console.log(error)
            throw error;
        }
        var res;
        if (results.data[1].length===0){
            res=[searchInput]
        }else{
            res=results.data[1]
        }
        console.log(res)
         thunkApi.dispatch(searchSlice.actions.replaceData(
            {
                suggestions:res,
                crrQuery:searchInput,
            }
         ))
})

export const searchResults = createAsyncThunk('search/searchResults', async (searchInput, thunkApi) => {
    thunkApi.dispatch(searchSlice.actions.replaceData({isLoadingSearchResults:true,}))
    var results
        try {
            var byUser=appAuth.auth.currentUser?.uid;
            results = await SearchRequests.getSearchResults(byUser,searchInput);
            console.log(results);
        } catch (error) {
            thunkApi.dispatch(searchSlice.actions.replaceData({isLoadingSearchResults:false}))
            console.log("error on search suggession api ")
            console.log(error)
            throw error;
        }
        
        
         thunkApi.dispatch(searchSlice.actions.replaceData(
            {
                isLoadingSearchResults:false,
                searchResults:results,
                crrQuery:searchInput,
            }
         ));

})