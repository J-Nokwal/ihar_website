import React, { useState } from 'react'
import appLogo from '../img/appLogo.svg';
import emailSignInButton from '../img/emailSignInButton.svg';
import googleSignInButton from '../img/googleSignInButton.svg';
import {GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
// import {auth} from '../firebase/firebasecore.js'
import {UsersRequests} from '../Requests/UserRequests'
import { AvatarRequests } from '../Requests/AvatarRequest';
const LogInPage = () => {
  const onGoogleIignInButtonPressed=async(e)=>{
    e.preventDefault();
    console.log("onGoogleIignInButtonPressed");
    // const provider = new GoogleAuthProvider();
    
    // signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.customData.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // });


  }
  const [showb,setShowb]=useState(null);
  const onEmailSignnButtonPressed= async(e)=>{
    setShowb("loading");
// var r=await AvatarRequests.getNewAvatar();
var r=await UsersRequests.getUser("manu");

console.log(r);
setShowb("email is "+r.email);
  }
  return (
   <div className='loginContainer'>
    <div className='loginWrapper'>
      <span className='logo'><img src={appLogo}/></span>
      <button className='signInWithEmailButton' onClick={onEmailSignnButtonPressed}> <img src={emailSignInButton} /></button>
      <button className='signInWithGoggleButton' onClick={onGoogleIignInButtonPressed}> <img src={googleSignInButton}/></button>
{showb &&<h1>{showb}</h1>}
    </div>
     </div> 
  )
}

export default LogInPage