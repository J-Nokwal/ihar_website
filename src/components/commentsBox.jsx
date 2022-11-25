import commentsSlice, { closeCommentBox, postComment } from '../store/commentsStore';
import { Divider, IconButton } from '@mui/material'
import React, {  useEffect, useRef } from 'react'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Avatar } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { BiSend } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
const CommentsBox = () => {
    const inputBoxRef = useRef(null);
    const dispatch = useDispatch();
    var commentsState = useSelector((state) => state.comments);
    useEffect(() => {
    }, [dispatch])
    if (!commentsState.showCommentsBox) {
        return (<></>)
    }
    const onCloseCommentsbox = () => {
        dispatch(closeCommentBox());
    }
    const onCommentSendButtonPress = () => {
        // if (inputBoxRef.current === document.activeElement) {
        var message = inputBoxRef.current.value;
        if (message !== '') {
            var postId = commentsState.postId;
            dispatch(postComment({ message, postId }))
            inputBoxRef.current.value = "";
        } else {
            console.log("empty comment");
        }

        // } else {
        // console.log("not active element");
        // }
    }
    console.log(commentsState.comments);
    return (
        <div className='commentsBoxWrapper'>
            <div className='commentBox'>
                <div className='commentBoxTop'>
                    <h4> Comments</h4>
                    <IconButton onClick={onCloseCommentsbox}> <CloseRoundedIcon /></IconButton>
                </div>
                <Divider />
                {commentsState.isLoading && <div className='loading'>Loading</div>}
                {!commentsState.isLoading && <div className='comments'>
                    {commentsState.comments.map((comment) => <SingleComment key={comment.ID} comment={comment} />)}</div>}
                {/* <Divider/> */}
                <div className='commentInputWrapper'>
                    <input className='commentInput' type="text" ref={inputBoxRef} autoFocus placeholder="Type..." onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            onCommentSendButtonPress()
                        }
                    }} ></input>
                    <IconButton className='commentSendButton' onClick={(e) => { onCommentSendButtonPress() }}><BiSend > </BiSend></IconButton>

                </div>

            </div>
        </div>
    )

}

const SingleComment = ({ comment }) => {
    const navigator = useNavigate()
const dispatch =useDispatch()
    return (
        //  <li  key={comment.ID}>{comment.message}</li>   
        <div className='SingleCommentBox'>
            <IconButton className='ProfilePhoto' onClick={() => {
                dispatch(commentsSlice.actions.triggerCommentBox(false));
                navigator("/user/" + comment.commentFrom.userId)
            }} >
                <Avatar variant='circular' alt="Profile Pic" src={(comment.commentFrom.ProfilePhotoLink !== '') ? comment.commentFrom.ProfilePhotoLink : "https://firebasestorage.googleapis.com/v0/b/ihar-7ab4b.appspot.com/o/profilePics%2F2022-08-13T00%3A30%3A17.633397?alt=media&token=8e93f5b2-8ade-4d27-9b3e-a69d92b9b7d5"} /></IconButton>

            {comment.message}
        </div>

    )
}

export default CommentsBox;
