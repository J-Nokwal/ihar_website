import React from 'react'
import Navbar from '../components/Navbar'
import PostsFeed from '../components/PostsFeed'
import CommentsBox from '../components/commentsBox'
import { useDispatch, useSelector } from 'react-redux'
import commentsSlice from '../store/commentsStore'
import AboutBox from '../components/aboutBox'
const HomePage = () => {

  var showCommentsBox = useSelector((state) => state.comments.showCommentsBox);
  const dispatch = useDispatch(null);
  const onclickbackground = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("focused on blured element");
    if (showCommentsBox) {
      dispatch(commentsSlice.actions.triggerCommentBox({ showCommentsBox: false }))
    }
  }
  return (
    <div className='homeContainer'>
      <img onClick={onclickbackground } className='backgroundImage' />
      <div onClick={onclickbackground } className={(showCommentsBox) ? "blur" : ""}><PostsFeed></PostsFeed></div>
      <CommentsBox></CommentsBox>
      <AboutBox/>
      {/* <IntroBox></IntroBox> */}
      <div><Navbar></Navbar></div>
    </div>
  )
}

export default HomePage