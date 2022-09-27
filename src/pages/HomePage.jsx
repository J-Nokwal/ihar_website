import React from 'react'
import Navbar from '../components/Navbar'
import PostsFeed from '../components/PostsFeed'

const HomePage = () => {
  return (
  <div className='homeContainer'>
 
  <div><PostsFeed></PostsFeed></div> 
  <div><Navbar></Navbar></div>
  </div>
  )
}

export default HomePage