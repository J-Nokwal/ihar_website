import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentsBox from '../components/commentsBox'
import Navbar from '../components/Navbar'
import { PostContainer } from '../components/PostsFeed'
import { openCommentBox } from '../store/commentsStore'
import { getPostData } from '../store/singlePostStore'

const PostPage = () => {

    var postState = useSelector((state) => (state.singlePostStore))
    var dispatch = useDispatch()
    let { uid } = useParams()
    useEffect(() => {
        var id = uid

        console.log("at post page id= ", id);
        dispatch(getPostData(id))

    }, [dispatch])
    const onCommentsButtonPressed = (postId) => {

        dispatch(openCommentBox(postId));
    }
    console.log("postpage post is ", postState,postState.isloading);
    return (
        <div className='homeContainer'>
            <img className='backgroundImage' />
            {
                postState.error &&
                <div className='postRumorWrapper'>
                    <div> {uid} </div>
                    <h4>{postState.error}</h4>
                </div>
            }
            {!postState.error && !postState.isloading &&
                <div>
                    <div className='postFeedsContainer'>
                        {!postState.isloading && <PostContainer onCommentsButtonPressed={onCommentsButtonPressed} post={postState.post} />}
                        <InfiniteScroll dataLength={1} >
                            {/* <h1>user Posts</h1> */}
                            {/* {postState.posts.length===0 && <div className='noPostFound'> <h3>No Post Found </h3> <h3>For This User</h3></div>} */}
                            {/* <PostContainer onCommentsButtonPressed={onCommentsButtonPressed} post={postState.post} /> */}
                        </InfiniteScroll>
                    </div>
                </div>
            }
            {/* {!user.error && !user.isloading && user.user &&<UserBox user={user.user} />} */}
            {
                !postState.error && !postState.isloading &&
                <CommentsBox></CommentsBox>
            }
            <div><Navbar></Navbar></div>
        </div>
    )
}



export default PostPage