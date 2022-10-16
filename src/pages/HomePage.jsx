import React from 'react'
import Navbar from '../components/Navbar'
import PostsFeed from '../components/PostsFeed'
import CommentsBox from '../components/commentsBox'
const HomePage = () => {
  return (
    <div className='homeContainer'>
      <img className='backgroundImage' />
      <div><PostsFeed></PostsFeed></div>
      <CommentsBox></CommentsBox>
      <div><Navbar></Navbar></div>
    </div>
  )
}

export default HomePage