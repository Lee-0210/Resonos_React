import React from 'react'
import Pagination from '../../Pagination/Pagination'

const PostComment = ({ comments, commentCount }) => {
  return (
    <div className="post-comment">
      <div className="comment-count">
        <p className='subtitle'>댓글 {commentCount} 개</p>
      </div>
      <div className="comments">
        {comments && (comments.map((com) => (
          <div className="comment">
            <div className="user">
              <p>{com.userNickname}</p>
            </div>
            <div className="comment-content">
              <p>{com.content}</p>
            </div>
            <div className="comment-info">
              <p>{com.createdAt}</p>
              <p>👍 {com.commentLikes}</p>
              <p>👎 {com.commentDislikes}</p>
            </div>
            {com.replies && (com.replies.map((rep) =>
              <div className="reply-comment">
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