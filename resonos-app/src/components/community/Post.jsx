import React, { useContext, useEffect, useState } from 'react'
import PostTitle from './post/PostTitle'
import PostContent from './post/PostContent'
import PostComment from './post/PostComment'
import PostForm from './post/PostForm'
import { useParams } from 'react-router-dom'
import * as api from '../../apis/community'
import TextPressure from '../../assets/TextPressure'
import * as fmtDate from '../../apis/util'
import swal from 'sweetalert2';
import { LoginContext } from '../../contexts/LoginContextProvider'


const Post = () => {

  const { boardId, postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

  const { userInfo, isLogin } = useContext(LoginContext)

  // 게시판 초기 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await api.getPostData({ boardId, postId })
        const data = response.data
        console.log(response.data)
        setPost(data.post)
        setComments(data.comments)

        if (data.post.createdAt) {
          const date = new Date(data.post.createdAt)
          const formattedDate = fmtDate.formatDateWithSeconds(date)
          setPost(p => ({ ...p, createdAt: formattedDate }))
        }
        if (data.comments) {
          const formatted = data.comments.map((com) => ({
            ...com, createdAt: fmtDate.formatDateWithSeconds(com.createdAt),
            replies: com.replies ? com.replies.map((rep) => ({
              ...rep, createdAt: fmtDate.formatDateWithSeconds(rep.createdAt),
            })) : [],
          }))
          setComments(formatted)
        }

        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();

  }, [boardId, postId])

  // 댓글 작성
  const postComment = async (data) => {
    try {
      const response = await api.postComment(data, { boardId, postId })
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
        setComments(prevComments => [...prevComments, response.data])
      }
    } catch (error) {
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
    try {
      const response = await api.editComment(data, { boardId, postId, commentId })
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
    try {
      const response = await api.postReply(data, { boardId, postId })
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
            { ...prev, replies: [...prev.replies, response.data] }
            : prev
        ))
      }
    } catch (error) {
      swal.fire({
        title: '등록 실패',
        text: '댓글 작성 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 대댓글 수정
  const editReply = async (data, commentId) => {
    try {
      const response = await api.editReply(data, { boardId, postId, commentId })
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
      console.log(error)
    }
  }

  // 비회원 댓글 삭제
  const deleteUnlogComment = async (pw, commentId, isRoot) => {
    const data = {
      guestPassword: pw
    }
    try {
      const response = await api.deleteUnlogComment(data, { boardId, postId, commentId })
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
    }
  }

  // 회원 댓글 삭제
  const deleteComment = async (commentId, isRoot) => {
    const result = await swal.fire({
      title: '삭제 확인',
      text: '정말로 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      customClass: {
        popup: 'album-wrapper'
      }
    })
    if (result.isConfirmed) {
      try {
        const response = await api.deleteComment({ boardId, postId, commentId })
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


  if (isLoading) {
    return (
      <div style={{ position: 'relative', height: '300px' }}>
        <TextPressure
          text="LOADING...!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
    )
  }
  return (
    <>
      <div className="post-wrapper">
        <div className="container">
          <PostTitle title={post.title} date={post.createdAt} writer={post.userNickname} />
          <PostContent post={post} boardId={boardId} isLogin={isLogin} userInfo={userInfo} />
          <PostComment comments={comments} commentCount={post.commentCount}
            editComment={editComment} postReply={postReply} editReplyf={editReply}
            isLogin={isLogin} userInfo={userInfo} deleteComment={deleteComment}
            deleteUnlogComment={deleteUnlogComment} />
          <PostForm postComment={postComment} isLogin={isLogin} />
        </div>
      </div>
    </>
  )
}

export default Post