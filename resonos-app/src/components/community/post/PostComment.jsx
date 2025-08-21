import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import ReplyForm from './ReplyForm'
import { Link } from 'react-router-dom'
import CommentEdit from './CommentEdit'
import ReplyEdit from './ReplyEdit'
import * as api from '../../../apis/community'

const PostComment = ({ initComments, commentCount, editComment, deleteComment, ids,
  postReply, editReplyf, userInfo, isLogin, deleteUnlogComment, initPagination }) => {

  const [replyTo, setReplyTo] = useState(null)
  const [isEdit, setIsEdit] = useState(null)
  const [editReply, setEditReply] = useState(null)
  const [openPw, setOpenPw] = useState(null)
  const [tempPw, setTempPw] = useState(null)
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState(initComments || [])
  const [pagination, setPagination] = useState(initPagination || null)

  const fetchComment = async (page) => {
    try {
      const response = await api.getPostDataWithPage(ids, page)
      console.log(response.data)
      setComments(response.data.comments)
      setPagination(response.data.commentsPagination)
      setPage(response.data.commentsPagination.page)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchComment(page); // 첫 페이지 로딩
  }, [ids.boardId, ids.postId, page]);

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
  const handleEditReply = (i) => {
    setEditReply(editReply === i ? null : i)
  }
  const handleCancelEditReply = () => {
    setEditReply(null)
  }
  const handleOpenDelUnlogCom = (i) => {
    setOpenPw(openPw === i ? null : i)
  }
  const handleDeleteUnlogComment = (pw, commentId, isRoot) => {
    deleteUnlogComment(pw, commentId, isRoot)
    setTempPw(null)
    setOpenPw(null)
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
                  {!com.userId && (
                    <>
                      <div className="btn btn-gold" onClick={() => handleCommentEdit(idx)}>수정</div>
                      <div className="btn btn-gold" onClick={() => handleOpenDelUnlogCom(idx)}>{openPw === idx ? '취소' : '삭제'}</div>
                      {openPw === idx && (
                        <>
                          <input id="tempPw" type="password"
                            placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
                          <button className="btn btn-gold" onClick={() => handleDeleteUnlogComment(tempPw, com.id, true)}>삭제</button>
                        </>
                      )}
                    </>
                  )}
                  {isLogin && userInfo.id === com.userId && (
                    <>
                      <div className="btn btn-gold" onClick={() => handleCommentEdit(idx)}>수정</div>
                      <div className="btn btn-gold" onClick={() => deleteComment(com.id, true)}>삭제</div>
                    </>
                  )}
                </div>
              </>
            )}
            {isEdit === idx && (
              <CommentEdit isLogin={isLogin} cancel={handleCancelCommentEdit} com={com} editComment={editComment} />
            )}
            {com.replies && (com.replies.map((rep, rIdx) =>
              <div className="reply-comment" key={rep.id}>
                <div className="user">
                  {rep.userId ? (
                    <Link to={`/users/${rep.userId}`}>
                      <p>{`${rep.userNickname}🎧`}</p>
                    </Link>
                  ) : (
                    <p>{rep.guestNickname}</p>
                  )}
                </div>
                {editReply != rep.id && (
                  <>
                    <div className="comment-contentr">
                      <p>{rep.content}</p>
                    </div>
                    <div className="comment-info">
                      <p>{rep.createdAt}</p>
                      <p className="btn btn-gold">👍 {rep.commentLikes}</p>
                      <p className="btn btn-gold">👎 {rep.commentDislikes}</p>
                      {!rep.userId && (
                        <>
                          <div className="btn btn-gold" onClick={() => handleEditReply(rep.id)}>수정</div>
                          <div className="btn btn-gold" onClick={() => handleOpenDelUnlogCom(rep.id)}>{openPw === rep.id ? '취소' : '삭제'}</div>
                          {openPw === rep.id && (
                            <>
                              <input id="tempPw" type="password"
                                placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
                              <button className="btn btn-gold" onClick={() => handleDeleteUnlogComment(tempPw, rep.id, false)}>삭제</button>
                            </>
                          )}
                        </>
                      )}
                      {isLogin && userInfo.id === rep.userId && (
                        <>
                          <div className="btn btn-gold" onClick={() => handleEditReply(rep.id)}>수정</div>
                          <div className="btn btn-gold" onClick={() => deleteComment(rep.id, false)}>삭제</div>
                        </>
                      )}
                    </div>
                  </>
                )}
                {editReply === rep.id && (
                  <ReplyEdit editReplyf={editReplyf} isLogin={isLogin} cancel={handleCancelEditReply} rep={rep} />
                )}
              </div>
            ))}
            {replyTo === idx && (
              <ReplyForm isLogin={isLogin} cancel={handleCancelReplyClick}
                postReply={postReply} com={com} />
            )}
          </div>
        )))}
      </div>
      {/* 페이지네이션 */}
      {pagination && (
        <Pagination
          pagination={pagination}
          onPageChange={(p) => setPage(p)}
        />
      )}
    </div>
  )
}

export default PostComment