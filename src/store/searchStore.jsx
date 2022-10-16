import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appAuth } from '../firebase/AppAuth'
import { UsersRequests } from "../Requests/UserRequests";


const searchSlice = createSlice({
    name: 'search',
    initialState: {
        isActive:false,
        suggestions:["Hii","manu","Repulic Day"],
        crrQuery:"",
        error:null,
    },
    reducers: {
        replaceData(state, action) {
            state.counter = state.counter+1;
        },
    },
})
export default searchSlice;

export const increment = createAsyncThunk('auth/checkAuthentication', async (_, thunkApi) => {
for (var i=0 ; i<20;i+=1){
    await new Promise(resolve => setTimeout(resolve, 1000));
    thunkApi.dispatch(trySlice.actions.replaceData())
}
})