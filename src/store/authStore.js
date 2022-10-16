import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appAuth } from '../firebase/AppAuth'
import { AvatarRequests } from "../Requests/AvatarRequest";
import { UsersRequests } from "../Requests/UserRequests";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: true,
        signedin: false,
        user: null,
        error: null,
    },
    reducers: {
        replaceData(state, action) {
            state.loading = action.payload.loading;
            state.signedin = action.payload.signedin;
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
    },
})
export default authSlice;

export const checkAuthAction = createAsyncThunk('auth/checkAuthentication', async (_, thunkApi) => {
    console.log("check auth start");
    if (appAuth.isAuthenticated()) {
        console.log("user is firebase authenticated");
        var user;
        var currentUser=appAuth.auth.currentUser;
        try {
            user = await UsersRequests.getUser(currentUser.uid);
        } catch (error) {
            if(error.code==="1002"){
                user =await createuserInServer();
            }
        }
        console.log("user");
        thunkApi.dispatch(authSlice.actions.replaceData({
            loading: false,
            signedin: true,
            user: user,
            error: null,
        }));
    } else {
        console.log("user is not firebase authenticated");
        thunkApi.dispatch(authSlice.actions.replaceData({
            loading: false,
            signedin: false,
            user: null,
            error: null,
        }));
    }
})

export const checkinitialAuthAction = createAsyncThunk('auth/checkInitialAuthentication', async (_, thunkApi) => {
    console.log("initial check auth start");
    appAuth.auth.onAuthStateChanged(async (user) => {
        console.log(user);


        if (user !== null && !user?.isAnonymous && !user?.emailVerified) {
            console.log("email not verified")
            return;
        }
        if (user) {
            console.log(" user is changed and a valid auth go for dispatch")
            thunkApi.dispatch(checkAuthAction()).unwrap();
            return
        }
        
        thunkApi.dispatch(authSlice.actions.replaceData({
            loading: false,
            signedin: false,
            user: null,
            error: null,
        }));

    });


})


export const signInWithGoogleAction = () => {
    return async (dispatch) => {
        dispatch(authSlice.actions.replaceData({
            loading: true,
            signedin: false,
            user: null,
            error: null,
        }));
        try {
            await appAuth.signInWithGoogle();
            // var user;
            // if (appAuth.additionalUserInfo().isNewUser){
            //     user=await createuserInServer();
            // }else{
            //     user=await UsersRequests.getUser(appAuth.auth.currentUser.uid)
            // }
            console.log("signedup with google");
            dispatch(checkAuthAction());
            
        } catch (error) {
            // console.log(error);
            dispatch(authSlice.actions.replaceData({
                loading: false,
                signedin: false,
                user: null,
                error: error.message,
            }));
            
        }

    }
}
export const signInAnonymouslyAction = () => {
    return async (dispatch) => {
        dispatch(authSlice.actions.replaceData({
            loading: true,
            signedin: false,
            user: null,
            error: null,
        }));
        try {
            await appAuth.signInAnonymously();
        } catch (error) {
            dispatch(authSlice.actions.replaceData({
                loading: false,
                signedin: false,
                user: null,
                error: error.message,
            }));
            
        }

    }
}


var createuserInServer = async () => {
    // auth=appAuth;
    var currentUser=appAuth.auth.currentUser;
    if (currentUser.photoURL === null) {
        var avatarByte = await AvatarRequests.getNewAvatar();
        console.log(typeof (avatarByte));
        //TODO: add firestore functionality
    }
  var user=await  UsersRequests.createUser({
        userId:currentUser.uid.toString(),
        is_anaoymous:currentUser.isAnonymous,
        email:currentUser.email,
        ProfilePhotoLink:currentUser.photoURL,
    })
    return user;
}

// var goToSavedRoute=()=>{
//     const path = useSelector((state) => state.route.path);
//     useNavigate().call(path);

// }