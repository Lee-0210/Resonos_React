import React from 'react'
import Pagination from '../../Pagination/Pagination'

const PostComment = () => {
  return (
    <div className="post-comment">
      <div className="comment-count">
        <p className='subtitle'>댓글 123 개</p>
      </div>
      <div className="comments">
        <div className="comment">
          <div className="user">
            <p>한지용</p>
          </div>
          <div className="comment-content">
            <p>에스파는 세계제일 여돌</p>
          </div>
          <div className="comment-info">
            <p>2025. 08. 18. 11:34:14</p>
            <p>👍 12</p>
            <p>👎 1</p>
          </div>
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
        </div>
        <div className="comment">
          <div className="user">
            <p>한지용</p>
          </div>
          <div className="comment-content">
            <p>에스파는 세계제일 여돌</p>
          </div>
          <div className="comment-info">
            <p>2025. 08. 18. 11:34:14</p>
            <p>👍 12</p>
            <p>👎 1</p>
          </div>
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
        </div>
      </div>
      {/* 페이지네이션 */}
      <Pagination />
    </div>
  )
}

export default PostComment