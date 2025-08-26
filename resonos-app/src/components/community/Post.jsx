import React, { useContext, useEffect, useRef, useState } from 'react'
import PostTitle from './post/PostTitle'
import PostContent from './post/PostContent'
import PostComment from './post/PostComment'
import PostForm from './post/PostForm'
import { useNavigate, useParams } from 'react-router-dom'
import * as api from '../../apis/community'
import TextPressure from '../../assets/TextPressure'
import * as fmtDate from '../../apis/util'
import swal from 'sweetalert2';
import { LoginContext } from '../../contexts/LoginContextProvider'


const Post = () => {

  const { boardId, postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [pagination, setPagination] = useState(null)
  const [vote, setVote] = useState(null)

  const [isLoading, setIsLoading] = useState(true)

  const { userInfo, isLogin } = useContext(LoginContext)

  const isManager = useRef(false)
  console.log('isManager :', isManager)

  const navigate = useNavigate()


  // 게시판 초기 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await api.getPostData({ boardId, postId })
        const data = response.data
        console.log('data :', data)
        setPost(data.post)
        setComments(data.comments)
        setPagination(data.commentsPagination)
        setVote(data.vote)

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
        if(userInfo)
          isManager.current = data.post.community.creatorId === userInfo.id

        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();

  }, [boardId, postId])


  // 회원, 비회원 게시글 삭제
  const deletePost = async (pw, ids, isLogged) => {
    if (!isLogged && !pw) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '비밀번호를 입력해주세요.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }

    const data = {
      guestPassword: pw,
      manager: isManager.current
    }
    console.log('data :', data)
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
        const response = await api.deletePost(data, ids)
        console.log(response)
        swal.fire({
          title: '삭제 완료',
          text: '게시글이 성공적으로 삭제되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        navigate(`/community/boards/${boardId}`)
      } catch (error) {
        console.log(error)
        swal.fire({
          title: '삭제 실패',
          text: '게시글 삭제 중 오류가 발생했습니다.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }

  // 게시글 신고
  const reportPost = async (ids) => {
    const result = await swal.fire({
      title: '신고 확인',
      text: '정말로 신고하시겠습니까?',
      confirmButtonText: '신고',
      cancelButtonText: '취소',
      showCancelButton: true,
      customClass: {
        popup: 'album-wrapper'
      }
    })
    if (result.isConfirmed) {
      try {
        const response = await api.reportPost(ids)
        console.log(response)
        swal.fire({
          title: '신고 완료',
          text: '게시글이 신고되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      } catch (error) {
        console.log(error)
        swal.fire({
          title: '신고 실패',
          text: '게시글 신고 중 오류가 발생했습니다.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }

  // 투표
  const contributeVote = async (data) => {
    try {
      const res = await api.contributeVote(data)
      console.log(res)
      swal.fire({
        title: '투표 완료',
        text: '투표가 성공적으로 완료되었습니다.',
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    } catch (error) {
      console.log(error)
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
          <PostTitle post={post} />
          <PostContent post={post} ids={{ boardId, postId }} swal={swal}
            isLogin={isLogin} userInfo={userInfo} api={api} initVote={vote}
            deletePost={deletePost} reportPost={reportPost} contributeVote={contributeVote}
            isManager={isManager}
          />
          <PostComment ids={{ boardId, postId }} swal={swal}
            initComments={comments} navigate={navigate}
            isLogin={isLogin} userInfo={userInfo} pagination={pagination} />
        </div>
      </div>
    </>
  )
}

export default Post