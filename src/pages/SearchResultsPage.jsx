import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar'
import { PostContainer } from '../components/PostsFeed';
import { searchResults } from '../store/searchStore';
import CommentsBox from '../components/commentsBox'
import { closeCommentBox, openCommentBox } from '../store/commentsStore';
import { Avatar, Box, Divider, IconButton } from '@mui/material';
import useIsMobile from '../sripts/screentype';


const SearchResultsPage = () => {
  const searchState = useSelector((state) => state.search);
  const commentsState = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  let { query } = useParams()
  useEffect(() => {
    dispatch(closeCommentBox());
    dispatch(searchResults(query))
  }, [query])
  const onCommentsButtonPressed = (postId) => {
    dispatch(openCommentBox(postId))
  }
  var isMobile=useIsMobile();
  console.log(isMobile);
  return (
    <div className='homeContainer'>
      <img className='backgroundImage' />

      {!searchState.isLoadingSearchResults && <div>
        <div className='postFeedsContainer' >
          {/* {istablet() && <Box height={'200px'} />} */}
          < InfiniteScroll dataLength={searchState.searchResults.posts.length} >
          {isMobile && <SerchUserResultsBoxTablet users={searchState.searchResults.users} />}
            {searchState.searchResults.posts.length === 0 && <div className='noPostFound'> <h3>No Post Found </h3></div>}
            {searchState.searchResults.posts.map((post, i) => <PostContainer onCommentsButtonPressed={onCommentsButtonPressed} post={post} key={i} />)}
          </InfiniteScroll>
        </div>
      </div>}
      {commentsState.showCommentsBox && <CommentsBox></CommentsBox>}
      {!isMobile && !commentsState.showCommentsBox && <SerchUserResultsBox users={searchState.searchResults.users} /> }

      <div><Navbar showValue={true}></Navbar></div>
    </div>
  )
}

export default SearchResultsPage

export const SerchUserResultsBoxTablet = ({ users }) => {
  const navigator=useNavigate()

  return (
    <div className='userSearchResultsBoxWrapper'>
      <div className='userSearchResultsBox'>
        <div className='userSearchResultsBoxTop'><h4> Users</h4></div>
        <Divider />
        <div>
          {users.length !== 0 && <div className='users'>
            {users.map((user) => (
              <div className='singleuser' id={user.userId} >
                <IconButton className='ProfilePhoto' sx={{ width: 150 }}
                onClick={()=>{
                  navigator("/user/"+user.userId)
                }}
                >
                  <Avatar variant='circular' alt="Profile Pic" sx={{ width: 80, height: 80 }} src={(user.ProfilePhotoLink !== '') ? user.ProfilePhotoLink : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"} />
                  <Box height={'10px'}/>
                  {user.FirstName} {user.LastName} 
                </IconButton>
              </div>
            ))}</div>}
        </div>

      </div>
    </div>
  )
}



const SerchUserResultsBox = ({ users }) => {
  const navigator=useNavigate()

  return (
    <div className='userSearchResultsBoxWrapper'>
      <div className='userSearchResultsBox'>
        <div className='userSearchResultsBoxTop'><h4> Users</h4></div>
        <Divider />
        {users.length === 0 && <h4 className='nouserfound' >No User Found</h4>}
        {users.length !== 0 && <div className='users'>
          {users.map((user) => (
            <div className='singleuser' id={user.userId} >
              <IconButton className='ProfilePhoto'
              onClick={()=>{
                navigator("/user/"+user.userId)
              }}
              > <Avatar variant='circular' alt="Profile Pic" src={(user.ProfilePhotoLink !== '') ? user.ProfilePhotoLink : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"} /></IconButton>
              {user.FirstName} {user.LastName}</div>
          ))}
        </div>}
      </div>
    </div>
  )
}
