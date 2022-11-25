import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { openCommentBox } from '../store/commentsStore';
import { getFeedsAction } from '../store/feedStore'
import { BiDotsVerticalRounded } from "react-icons/bi"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Avatar, Divider, IconButton, Menu, MenuItem } from '@mui/material'
import { pink, grey } from '@mui/material/colors'
import { Comment, Send } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
const PostsFeed = () => {
  const dispatch = useDispatch()




  useEffect(() => {
    dispatch(getFeedsAction(true));
  }, [])
  const moreLoading = useSelector((state) => state.feed.moreLoading);
  const posts = useSelector((state) => state.feed.posts);

  const hasRechedMax = useSelector((state) => state.feed.hasRechedMax);
  console.log("moreloading :", moreLoading);
  const onCommentsButtonPressed = (postId) => {
    dispatch(openCommentBox(postId))
  }
  return (
    <div className='postFeedsContainer'>
      <InfiniteScroll
        dataLength={posts.length} //This is important field to render the next data
        next={() => dispatch(getFeedsAction(false))}
        hasMore={!hasRechedMax}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((post, i) => <PostContainer onCommentsButtonPressed={onCommentsButtonPressed} post={post} key={i} />)}
      </InfiniteScroll>
    </div>
  )
}

export const PostContainer = ({ onCommentsButtonPressed, post }) => {
  const navigator = useNavigate()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : null;
  const [active, setActive] = useState(post.liked)

  const [showComments, setshowComments] = useState(false);
  // useEffect(() => {
  //   triggerShowmore()

  //   return
  // }, [showComments])

  var triggerShowmore = (s) => {
    console.log("triggerShowmore");
    setshowComments(!showComments)
  }

  return (
    <div className='postsContainer'>
      <div className='postTop'>
        <IconButton className='ProfilePhoto' onClick={() => {
          navigator("/user/" + post.postFrom.userId)
        }} >
          <Avatar variant='circular' alt="Profile Pic" src={(post.postFrom.ProfilePhotoLink !== '') ? post.postFrom.ProfilePhotoLink : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"} /></IconButton>
        <h5 className='profileName' >{post.postFrom.FirstName} {post.postFrom.LastName}</h5>
        <IconButton aria-describedby={id} onClick={handleClick} ><BiDotsVerticalRounded /></IconButton>
        <Menu id={id} anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Share</MenuItem>
          <MenuItem onClick={handleClose}>Copy Link</MenuItem>
          <MenuItem onClick={handleClose}>Report</MenuItem>
        </Menu>
      </div>
      <Divider />
      <img className='postPhoto' height='20px' loading='lazy' src={(post.post_photo_link !== '') ? post.post_photo_link : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"}></img>
      <div className='actionButtons'>
        <IconButton onClick={() => setActive(!active)} >{active ? <FavoriteIcon sx={{ color: pink[500] }} /> : <FavoriteBorderIcon sx={{ color: grey }} />} </IconButton>
        <IconButton onClick={() => { onCommentsButtonPressed(post.ID) }}> <Comment /></IconButton>
        <IconButton > <Send /></IconButton>
      </div>
      <h5 className='likes'>Likes {post.likes}</h5>

      <CommentText onClick={() => { console.log("show more") }}>{post.message} </CommentText>
      {/* <button className='showMoreButton' onClick={triggerShowmore} >Read More</button> */}
      <div className='empty'></div>
      {/* {showComments && <div className="commentsBox"></div>}     */}
    </div>
  );
}

const CommentText = ({ children, onClick }) => {

  const text = children;
  const [isReadMore, setIsReadMore] = useState(text.length > 150);
  const toggleReadMore = () => {
    onClick();
  };
  return (
    <h5 className="comment">
      {text}
      {/* {isReadMore ? text.slice(0, 150) : text} */}
      {isReadMore && <span className="readMore" onClick={toggleReadMore} >{isReadMore ? "...read more" : " show less"}</span>}
    </h5>
  );
};

export default PostsFeed
