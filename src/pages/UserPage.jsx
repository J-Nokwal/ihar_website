import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentsBox from '../components/commentsBox'
import Navbar from '../components/Navbar'
import { PostContainer } from '../components/PostsFeed'
import { openCommentBox } from '../store/commentsStore'
import { getUserDetails } from '../store/userProfileStore'

const UserPage = () => {

  var user = useSelector((state) => (state.userProfile))
  var dispatch = useDispatch()
  let { uid } = useParams()
  useEffect(() => {
    var id = uid
    dispatch(getUserDetails(id));

  }, [dispatch])
  const onCommentsButtonPressed = (postId) => {
    dispatch(openCommentBox(postId))
  }
  console.log("userpage user is ",user);
  return (
    <div className='homeContainer'>
      <img className='backgroundImage' />
      {
        user.error &&
        <div className='postRumorWrapper'>
          <div> {uid} </div>
          <h4>{user.error}</h4>
        </div>
      }
      {!user.error && !user.isLoading &&
        <div>
          <div className='postFeedsContainer'>
            <InfiniteScroll dataLength={user.posts.length} >
              {/* <h1>user Posts</h1> */}
              {user.posts.length===0 && <div className='noPostFound'> <h3>No Post Found </h3>
              <h3>For This User</h3></div>}
              {user.posts.map((post, i) => <PostContainer onCommentsButtonPressed={onCommentsButtonPressed} post={post} key={i} />)}
            </InfiniteScroll>
          </div>
        </div>
      }
      {!user.error && !user.isLoading && user.user &&<UserBox user={user.user} />}
      {
        !user.error && !user.isLoading &&
        <CommentsBox></CommentsBox>
      }
      <div><Navbar></Navbar></div>
    </div>
  )
}


 const UserBox = ({ user }) => {
  console.log("userbox user is",user)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;

  return (
    <div className='userBoxWrapper'>
      <div className='userBox'>
        <div className='userBoxTop'>
          <h4> User profile</h4>
          <IconButton aria-describedby={id} onClick={handleClick} ><BiDotsVerticalRounded /></IconButton>
          <Menu id={id} anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Share</MenuItem>
            <MenuItem onClick={handleClose}>Copy Link</MenuItem>
            <MenuItem onClick={handleClose}>Report</MenuItem>
          </Menu>
        </div>
        <Divider />
        <div className='profilePic'>
          <Avatar variant='circular' sx={{ width: 150, height: 150 }} alt="Profile Pic" src={(user.ProfilePhotoLink !== '') ? user.ProfilePhotoLink : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"} />
        </div>
        <h4>{user.FirstName} {user.LastName}</h4>
        <div className='userId'>
          <h5>id:{user.userId}</h5>
        </div>
      </div>
    </div>
  )
}


export default UserPage