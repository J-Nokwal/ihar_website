import React, { useEffect, useState } from 'react'
import appLogo from '../img/appLogo.svg';
import emailSignInButton from '../img/emailSignInButton.svg';
import googleSignInButton from '../img/googleSignInButton.svg';
import anonymouslySignInButton from '../img/anonymouslySignInButton.svg';
import { Navigate, useNavigate } from 'react-router-dom';
import { checkAuthAction, checkinitialAuthAction, signInAnonymouslyAction, signInWithGoogleAction } from '../store/authStore';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { appFireBaseStorage } from '../firebase/FireBaseStorage.ts';
import { AvatarRequests } from '../Requests/AvatarRequest';

var c = 0

const LogInPage = () => {
  const dispatch = useDispatch();
  console.log(c++);
  // checkAuthAction()
  const onGoogleIignInButtonPressed = async (e) => {
    e.preventDefault();
    console.log("onGoogleIignInButtonPressed");
    dispatch(signInWithGoogleAction());

    // await dispatch(signInWithGoogleAction()).unwrap();
    // dispatch(checkAuthAction());
    // <Navigate to="/" />;

  }
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  console.log("isloading", isLoading)
  const [showb, setShowb] = useState(null);
  const onEmailSignnButtonPressed = async (e) => {
    e.preventDefault();
    // <Navigate to="/login" />;

  }
  const onanonymouslysignInButtonPressed = async (e) => {
    e.preventDefault();
    dispatch(signInAnonymouslyAction());
  }
 
  if (user != null) {
    // navigator("/", { replace: true });
    // console.log("navigating tttto ");
  }
  var onFileChange = event => {
    
    // Update the state
    // this.setState({ selectedFile: event.target.files[0] });
    console.log(event.target.files[0]);
    AvatarRequests.getNewAvatar().then((file)=>{
    console.log(typeof(file))
    console.log(file)
      appFireBaseStorage.uploadProfilePic(file).then((s)=>{
        console.log(s)
      })
    })
  };
  const navigator=useNavigate()
 
  return (
    <div className='loginContainer'>
      <div className='loginWrapper'>
        {/* { <input type='file'onChange={onFileChange} ></input>} */}
        {!isLoading && <span className='logo'><img src={appLogo} /></span>}
        {!isLoading && <button className='signInWithEmailButton' onClick={onEmailSignnButtonPressed}> <img src={emailSignInButton} /></button>}
        {!isLoading && <button className='signInWithGoggleButton' onClick={onanonymouslysignInButtonPressed}> <img src={anonymouslySignInButton} /></button>}
        {!isLoading && <button className='signInWithGoggleButton' onClick={onGoogleIignInButtonPressed}> <img src={googleSignInButton} /></button>}
        {isLoading && <Loading />}
        {user && <Navigate to={"/"} replace={true} />}
      </div>
    </div>
  )
}

export default LogInPage