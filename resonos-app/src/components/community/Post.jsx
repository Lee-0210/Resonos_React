import React, { useEffect, useState } from 'react'
import PostTitle from './post/PostTitle'
import PostContent from './post/PostContent'
import PostComment from './post/PostComment'
import PostForm from './post/PostForm'
import { useParams } from 'react-router-dom'
import * as api from '../../apis/community'
import TextPressure from '../../assets/TextPressure'
import * as fmtDate from '../../apis/util'
import swal from 'sweetalert2';


const Post = () => {

  const { boardId, postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

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

        if(data.post.createdAt) {
          const date = new Date(data.post.createdAt)
          const formattedDate = fmtDate.formatDateWithSeconds(date)
          setPost(p => ({ ...p, createdAt: formattedDate }))
        }
        if(data.comments) {
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

  const postComment = async (data) => {
    try {
      const response = await api.postComment(data,{boardId, postId})
      console.log(response)
      if(response.status === 201) {
        swal.fire({
          title : '작성 완료',
          text : '댓글이 작성되었습니다.',
          icon : 'success',
          customClass : {
            popup: 'album-wrapper'
          }
        })
        setComments(prevComments => [...prevComments, response.data])
      }
    } catch (error) {
      swal.fire({
        title : '오류',
        text : '댓글 작성 중 오류가 발생했습니다.',
        icon : 'error',
        customClass : {
          popup: 'album-wrapper'
        }
      })
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
          <PostContent post={post} boardId={boardId}/>
          <PostComment comments={comments} commentCount={post.commentCount} />
          <PostForm postComment={postComment} />
        </div>
      </div>
    </>
  )
}

export default Post