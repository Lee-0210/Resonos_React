import React, { useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import ReplyForm from './ReplyForm'
import { Link } from 'react-router-dom'

const PostComment = ({ comments, commentCount }) => {

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
              <Link to={`/users/${com.userId}`}>
                <p>{com.userNickname}</p>
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
            {replyTo === idx && (
              <ReplyForm />
            )}
            {com.replies && (com.replies.map((rep, rIdx) =>
              <div className="reply-comment" key={rIdx}>
                <div className="user">
                  <p>이준영</p>
                </div>
                <div className="comment-content">
                  <p>인정하는 부분이지 말입니다 악</p>
                </div>
                <div className="comment-info">
                  <p>2025. 08. 18. 11:34:14</p>
                  <p>👍 12</p>
                  <p>👎 1</p>
                </div>
              </div>
            ))}
          </div>
        )))}
      </div>
      {/* 페이지네이션 */}
      <Pagination />
    </div>
  )
}

export default PostComment