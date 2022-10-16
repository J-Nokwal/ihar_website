import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appAuth } from '../firebase/AppAuth'
import { UsersRequests } from "../Requests/UserRequests";

const trySlice = createSlice({
    name: 'try',
    initialState: {
        counter:0
    },
    reducers: {
        replaceData(state, action) {
            state.counter = state.counter+1;
        },
    },
})
export default trySlice;

export const increment = createAsyncThunk('auth/checkAuthentication', async (_, thunkApi) => {
for (var i=0 ; i<20;i+=1){
    await new Promise(resolve => setTimeout(resolve, 1000));
    thunkApi.dispatch(trySlice.actions.replaceData())
}
})