import React, { useContext, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import ReplyForm from './ReplyForm'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../../contexts/LoginContextProvider'
import CommentEdit from './CommentEdit'

const PostComment = ({ comments, commentCount, editComment, postReply }) => {

  const [replyTo, setReplyTo] = useState(null)
  const [isEdit, setIsEdit] = useState(null)

  const { userInfo, isLogin  } = useContext(LoginContext)


  const handleReplyClick = (i) => {
    setReplyTo(replyTo === i ? null : i)
  }
  const handleCancelReplyClick = () => {
    setReplyTo(null)
  }
  const handleCommentEdit = (i) => {
    setIsEdit(isEdit === i ? null : i)
  }
  const handleCancelCommentEdit = () => {
    setIsEdit(null)
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
              {com.userId ? (
                <Link to={`/users/${com.userId}`}>
                  <p>{`${com.userNickname}🎧`}</p>
                </Link>
              ) : (
                <p>{com.guestNickname}</p>
              )}
            </div>
            {isEdit != idx && (
              <>
                <div className="comment-content" onClick={() => handleReplyClick(idx)}>
                  <p>{com.content}</p>
                </div>
                <div className="comment-info">
                  <p>{com.createdAt}</p>
                  <p className="btn btn-gold">👍 {com.commentLikes}</p>
                  <p className="btn btn-gold">👎 {com.commentDislikes}</p>
                  { !com.userId && (
                    <>
                      <div className="btn btn-gold" onClick={() => handleCommentEdit(idx)}>수정</div>
                      <div className="btn btn-gold">삭제</div>
                    </>
                  )}
                  {isLogin && userInfo.id === com.userId && (
                    <>
                      <div className="btn btn-gold" onClick={() => handleCommentEdit(idx)}>수정</div>
                      <div className="btn btn-gold">삭제</div>
                    </>
                  )}
                </div>
              </>
            )}
            {isEdit === idx && (
              <CommentEdit userInfo={userInfo} cancel={handleCancelCommentEdit} com={com} editComment={editComment} />
            )}
            {com.replies && (com.replies.map((rep, rIdx) =>
              <div className="reply-comment" key={rIdx}>
                <div className="user">
                  {rep.userId ? (
                    <Link to={`/users/${rep.userId}`}>
                      <p>{`${rep.userNickname}🎧`}</p>
                    </Link>
                  ) : (
                    <p>{rep.guestNickname}</p>
                  )}
                </div>
                <div className="comment-contentr">
                  <p>{rep.content}</p>
                </div>
                <div className="comment-info">
                  <p>{rep.createdAt}</p>
                  <p className="btn btn-gold">👍 {rep.commentLikes}</p>
                  <p className="btn btn-gold">👎 {rep.commentDislikes}</p>
                  { !rep.userId && (
                    <>
                      <div className="btn btn-gold" onClick={() => handleCommentEdit(idx)}>수정</div>
                      <div className="btn btn-gold">삭제</div>
                    </>
                  )}
                  {isLogin && userInfo.id === rep.userId && (
                    <>
                      <div className="btn btn-gold" onClick={() => handleCommentEdit(idx)}>수정</div>
                      <div className="btn btn-gold">삭제</div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {replyTo === idx && (
              <ReplyForm userInfo={userInfo} cancel={handleCancelReplyClick}
                      postReply={postReply} com={com} />
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