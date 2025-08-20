import React, { useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import ReplyForm from './ReplyForm'
import { Link } from 'react-router-dom'

const PostComment = ({ comments, commentCount}) => {

  const [replyTo, setReplyTo] = useState(null)

  const handleReplyClick = (i) => {
    setReplyTo(replyTo === i ? null : i)
  }


  return (
    <div className="post-comment">
      <div className="comment-count">
        <p className='subtitle'>댓글 {commentCount} 개</p>
      </div>
      <div className="comments">
        {comments && (comments.map((com, idx) => (
          <div className="comment" key={idx}>
            <div className="user">
              <Link to={`/users/${com.userId ? com.userId : 0}`}>
                <p>{com.userNickname ? com.userNickname : com.guestNickname}</p>
              </Link>
            </div>
            <div className="comment-content" onClick={() => handleReplyClick(idx)}>
              <p>{com.content}</p>
            </div>
            <div className="comment-info">
              <p>{com.createdAt}</p>
              <p>👍 {com.commentLikes}</p>
              <p>👎 {com.commentDislikes}</p>
            </div>
            
            {com.replies && (com.replies.map((rep, rIdx) =>
              <div className="reply-comment" key={rIdx}>
                <div className="user">
                  <Link to={`/users/${rep.userId}`}>
                    <p>{rep.userNickname ? rep.userNickname : rep.guestNickname}</p>
                  </Link>
                </div>
                <div className="comment-contentr">
                  <p>{rep.content}</p>
                </div>
                <div className="comment-info">
                  <p>{rep.createdAt}</p>
                  <p>👍 {com.commentLikes}</p>
                  <p>👎 {com.commentDislikes}</p>
                </div>
              </div>
            ))}
            {replyTo === idx && (
              <ReplyForm />
            )}
          </div>
        )))}
      </div>
      {/* 페이지네이션 */}
      <Pagination />
    </div>
  )
}

export default PostComment