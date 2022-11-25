import { Avatar, Box, Divider, IconButton, TextField } from '@mui/material'
import React, {  useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import { Close, Send } from '@mui/icons-material';
import  { postRumorAction } from '../store/postRumorStore';
import { useNavigate } from 'react-router-dom';
const PostRumor = () => {
  const authState = useSelector((state) => state.auth);
  const postRumorState = useSelector((state) => state.postRumor);
  const dispatch = useDispatch();
  const inputBoxRef = useRef(null);
  const navigate = useNavigate();

  const [imgF, setimageFile] = useState();
  function readImage(input) {
    if (input.target.files && input.target.files[0]) {
      // console.log(URL.createObjectURL(input.target.files[0]))
      // setimageFile(URL.createObjectURL(input.target.files[0]));
      setimageFile(imageFile => input.target.files[0]);
      console.log("in postrumerjsx",typeof imgF,imgF);
    }
  }
  
  const onSendButtonClicked=async()=>{
    await dispatch(postRumorAction({image:imgF,message:inputBoxRef.current.value})).unwrap();
    navigate(-1);
  }
  return (
    <div className='homeContainer'>
      <img className='backgroundImage' />
      <div className='postRumorWrapper'>
        {
          postRumorState.isLoading && <h3>Loading</h3>
        }
        {!postRumorState.isLoading && <>
        <div className='top'>
          <Avatar variant='circular' alt="Profile Pic" src={(authState.user.ProfilePhotoLink !== '') ? authState.user.ProfilePhotoLink : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"} />
          <h3>Create A Rumor</h3>
        </div>
          <Divider />
          <Box height="15px"></Box>
        {imgF && < div className='imageWrapper'>
          <img src={URL.createObjectURL(imgF)}  alt="rumor image" />
          <IconButton className='closeButton' component="span" onClick={()=>{setimageFile(null)}}><Close /></IconButton>
        <Divider />
        <Box height="15px"></Box>
        </div>}
        <TextField id="standard-basic" ref={inputBoxRef}   color="grey" autoFocus placeholder="I hear a rumor," multiline variant="standard" />
        <Divider />
        <Box height="15px"></Box>
        <div className='bottom'>
          <input style={{ display: "none" }} type="file" accept='image/*' onChange={readImage} id='fileInput'></input>
          <label htmlFor="fileInput"><IconButton component="span"><CollectionsOutlinedIcon /></IconButton></label>
          <IconButton component="span" onClick={onSendButtonClicked}><Send /></IconButton>
        </div>
        </>}
      </div>
      <div><Navbar showCreateRumorButton={false}></Navbar></div>
    </div>)
}

export default PostRumor