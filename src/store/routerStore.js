import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const routerSlice = createSlice({
    name: 'try',
    initialState: {
        path:"/"
    },
    reducers: {
        setRoute(state, action) {
            state.path = action.payload.path;
        },
    },
})
export default routerSlice;
