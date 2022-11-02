import React from 'react'
import Navbar from '../components/Navbar'
import PostsFeed from '../components/PostsFeed'
import CommentsBox from '../components/commentsBox'
import IntroBox from '../components/introBox'
const HomePage = () => {
  return (
    <div className='homeContainer'>
      <img className='backgroundImage' />
      <div><PostsFeed></PostsFeed></div>
      <CommentsBox></CommentsBox>
      {/* <IntroBox></IntroBox> */}
      <div><Navbar></Navbar></div>
    </div>
  )
}

export default HomePage