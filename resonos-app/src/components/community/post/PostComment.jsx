import React, { useEffect, useState } from 'react'
import Pagination from '../../Pagination/Pagination'
import ReplyForm from './ReplyForm'
import { Link } from 'react-router-dom'
import CommentEdit from './CommentEdit'
import ReplyEdit from './ReplyEdit'
import * as api from '../../../apis/community'
import * as fmtDate from '../../../apis/util'
import PostForm from './PostForm'

const PostComment = ({ ids, isLogin, userInfo, swal }) => {

  const [replyTo, setReplyTo] = useState(null)
  const [isEdit, setIsEdit] = useState(null)
  const [editReply, setEditReply] = useState(null)
  const [openPw, setOpenPw] = useState(null)
  const [tempPw, setTempPw] = useState(null)
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState([])
  const [pagination, setPagination] = useState(null)
  const [commentCount, setCommentCount] = useState(null)

  console.log(page)

  const fetchComment = async (page) => {
    try {
      const response = await api.getPostDataWithPage(ids, page)
      console.log(response.data)
      setCommentCount(response.data.post.commentCount)
      setComments(response.data.comments)
      setPagination(response.data.commentsPagination)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchComment(page); // 첫 페이지 로딩
  }, [ids.boardId, ids.postId, page]);

  // 댓글 작성
  const postCommentfunc = async (data) => {
    if (!isLogin) {
      if (!data.guestNickname || !data.guestPassword) {
        swal.fire({
          title: '취소 되었습니다.',
          text: '아이디 또는 비밀번호를 입력해주세요.',
          icon: 'warning',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        return
      }
    }
    if (!data.content) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '내용을 입력해주세요.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    try {
      const response = await api.postComment(data, ids)
      console.log(response)
      if (response.status === 201) {
        swal.fire({
          title: '작성 완료',
          text: '댓글이 작성되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        if(comments.length % 10 === 0) {
          fetchComment(page+1)
        }
        else setComments(prevComments => [...prevComments, response.data])
        // setPage(pagination.last)
      }
    } catch (error) {
      console.log(error)
      swal.fire({
        title: '오류',
        text: '댓글 작성 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 비회원 댓글 수정
  const editComment = async (data, commentId) => {
    if (!isLogin) {
      if (!data.guestPassword) {
        swal.fire({
          title: '취소 되었습니다.',
          text: '아이디 또는 비밀번호를 입력해주세요.',
          icon: 'warning',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        return
      }
    }
    if (!data.content) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '내용을 입력해주세요.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    try {
      const response = await api.editComment(data, { ...ids, commentId })
      console.log(response)
      if (response.status === 200) {
        swal.fire({
          title: '수정 완료',
          text: '댓글이 수정되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        setComments(prevComments => prevComments.map(com =>
          response.data.id === com.id ?
            com = { ...com, content: data.content }
            : com
        ))
      }
    } catch (error) {
      swal.fire({
        title: '수정 실패',
        text: '비밀번호가 틀렸거나, 댓글 수정 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 대댓글 작성
  const postReply = async (data) => {
    if (!isLogin) {
      if (!data.guestNickname || !data.guestPassword) {
        swal.fire({
          title: '취소 되었습니다.',
          text: '아이디 또는 비밀번호를 입력해주세요.',
          icon: 'warning',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        return
      }
    }
    if (!data.content) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '내용을 입력해주세요.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    try {
      const response = await api.postReply(data, ids)
      console.log(response)
      if (response.status === 201) {
        swal.fire({
          title: '작성 완료',
          text: '대댓글이 작성되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        setComments(prevComments => prevComments.map(prev =>
          prev.id === response.data.parentCommentId ?
            { ...prev, replies: [...(prev.replies ?? []), response.data] }
            : prev
        ))
      }
    } catch (error) {
      swal.fire({
        title: '등록 실패',
        text: '대댓글 작성 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 대댓글 수정
  const editReplyf = async (data, commentId) => {
    if (!isLogin) {
      if (!data.guestPassword) {
        swal.fire({
          title: '취소 되었습니다.',
          text: '아이디 또는 비밀번호를 입력해주세요.',
          icon: 'warning',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        return
      }
    }
    if (!data.content) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '내용을 입력해주세요.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    try {
      const response = await api.editReply(data, { ...ids, commentId })
      console.log(response)
      if (response.status === 200) {
        swal.fire({
          title: '수정 완료',
          text: '대댓글이 수정되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        setComments(prevComments => prevComments.map(prev =>
          prev.id === response.data.parentCommentId ?
            {
              ...prev, replies: prev.replies.map(rep =>
                rep.id === response.data.id ? { ...rep, ...response.data } : rep
              )
            } : prev
        ))
      }
    } catch (error) {
      swal.fire({
        title: '수정 실패',
        text: '비밀번호가 틀렸거나, 댓글 수정 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 비회원 댓글 삭제
  const deleteUnlogComment = async (pw, commentId, isRoot) => {
    if (!pw) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '비밀번호를 입력해주세요.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
    const data = {
      guestPassword: pw
    }
    console.log(data)
    try {
      const response = await api.deleteUnlogComment(data, { ...ids, commentId })
      if (isRoot) {
        console.log('댓글입니다.')
        if (response.status === 200) {
          swal.fire({
            title: '삭제 완료',
            text: '댓글이 삭제되었습니다.',
            icon: 'success',
            customClass: {
              popup: 'album-wrapper'
            }
          })
          setComments(prevComments => prevComments.filter(com => com.id !== commentId))
        }
      }
      else {
        console.log('대댓글입니다.')
        if (response.status === 200) {
          swal.fire({
            title: '삭제 완료',
            text: '대댓글이 삭제되었습니다.',
            icon: 'success',
            customClass: {
              popup: 'album-wrapper'
            }
          })
          setComments(prevComments => prevComments.map(prev =>
            prev.id === response.data.parentCommentId ?
              { ...prev, replies: prev.replies.filter(rep => rep.id !== commentId) }
              : prev
          ))
        }
      }
    } catch (error) {
      console.log(error)
      swal.fire({
          title: '삭제 실패',
          text: '댓글 삭제 중 오류가 발생했습니다.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
    }
  }

  // 회원 댓글 삭제
  const deleteComment = async (commentId, isRoot) => {
    const result = await swal.fire({
      title: '삭제 확인',
      text: '정말로 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      customClass: {
        popup: 'album-wrapper'
      }
    })
    if (result.isConfirmed) {
      try {
        const response = await api.deleteComment({ ...ids, commentId })
        console.log(response)
        if (isRoot) {
          console.log('댓글입니다.')
          if (response.status === 200) {
            swal.fire({
              title: '삭제 완료',
              text: '댓글이 삭제되었습니다.',
              icon: 'success',
              customClass: {
                popup: 'album-wrapper'
              }
            })
            setComments(prevComments => prevComments.filter(com => com.id !== commentId))
          }
        }
        else {
          console.log('대댓글입니다.')
          if (response.status === 200) {
            swal.fire({
              title: '삭제 완료',
              text: '대댓글이 삭제되었습니다.',
              icon: 'success',
              customClass: {
                popup: 'album-wrapper'
              }
            })
            setComments(prevComments => prevComments.map(prev =>
              prev.id === response.data.parentCommentId ?
                { ...prev, replies: prev.replies.filter(rep => rep.id !== commentId) }
                : prev
            ))
          }
        }
      } catch (error) {
        swal.fire({
          title: '삭제 실패',
          text: '댓글 삭제 중 오류가 발생했습니다.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }

  // 회원 댓,대댓 좋/싫
  const likeComment = async (ids, commentId, isLike, isRoot, pId) => {
    if (!isLogin) {
      swal.fire({
        title: '로그인이 필요합니다',
        text: '로그인시 사용 가능한 기능입니다.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    const data = {
      isLikes: isLike
    }
    if (isRoot) {
      console.log('댓글입니다.')
      try {
        const response = await api.commentLike({ ...ids, commentId }, data)
        console.log(response)
        if (response.status === 200) {
          setComments(prevComments => prevComments.map(com =>
            com.id === commentId
              ?
              {
                ...com,
                commentDislikes: response.data.dislikes,
                commentLikes: response.data.likes
              }
              : com
          ))
        }
      } catch (error) {
        console.log(error)
      }
    }
    else {
      console.log('대댓글입니다.')
      try {
        const response = await api.commentLike({ ...ids, commentId }, data)
        console.log(response)
        if (response.status === 200) {
          setComments(prevComments => prevComments.map(prev =>
            prev.id === pId ?
              {
                ...prev, replies: prev.replies.map(rep =>
                  rep.id === commentId
                    ?
                    { 
                      ...rep,
                      commentDislikes: response.data.dislikes,
                      commentLikes: response.data.likes
                    }
                    : rep
                )
              } : prev
          ))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

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
                  <p className={`btn btn-gold ${com.userLiked ? 'active' : ''}`} onClick={() => likeComment(ids, com.id, true, true)}>👍 {com.commentLikes}</p>
                  <p className={`btn btn-gold ${com.userDisliked ? 'active' : ''}`} onClick={() => likeComment(ids, com.id, false, true)}>👎 {com.commentDislikes}</p>
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
                      <p className="btn btn-gold" onClick={() => likeComment(ids, rep.id, true, false, com.id)}>👍 {rep.commentLikes}</p>
                      <p className="btn btn-gold" onClick={() => likeComment(ids, rep.id, false, false, com.id)}>👎 {rep.commentDislikes}</p>
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
      <PostForm postComment={postCommentfunc} isLogin={isLogin} />
    </div>

  )
}

export default PostComment