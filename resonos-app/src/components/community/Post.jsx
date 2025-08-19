import React, { useEffect, useState } from 'react'
import PostTitle from './post/PostTitle'
import PostContent from './post/PostContent'
import PostComment from './post/PostComment'
import PostForm from './post/PostForm'
import { useParams } from 'react-router-dom'
import * as api from '../../apis/community'
import TextPressure from '../../assets/TextPressure'
import * as fmtDate from '../../apis/util'


const Post = () => {

  const { boardId, postId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);

  const [isLoading, setIsLoading] = useState(true)

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
          <PostContent content={post.content} likes={post.postLikes} dislikes={post.postDislikes}
                      boardId={boardId} postId={postId} />
          <PostComment comments={comments} commentCount={post.commentCount} />
          <PostForm />
        </div>
      </div>
    </>
  )
}

export default Post