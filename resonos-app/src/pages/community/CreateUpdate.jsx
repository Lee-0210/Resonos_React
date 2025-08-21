import React, { useEffect, useState } from 'react'
import WYSIWYG from '../../containers/community/WYSIWYG'
import { useParams } from 'react-router-dom'
import * as api from '../../apis/community' 

function CreateUpdate() {

  const { boardId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  // 수정 경로 일시에 post 요청
    useEffect(() => {
      const fetchData = async () => {
        try {
          if(postId) {
            setIsLoading(true)
            const response = await api.getPostData({ boardId, postId })
            const data = response.data.post
            console.log(response.data)
            setPost(data)
          }
          else {
            setPost(null)
          }
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData();
  
    }, [boardId, postId])
  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
    {postId ? (<WYSIWYG post={post} ids={{boardId, postId}}  />) : (<WYSIWYG post={null} ids={{boardId, postId}} />)}
    </>
  )
}

export default CreateUpdate