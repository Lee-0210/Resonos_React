import React, { useEffect, useState } from 'react'
import WYSIWYG from '../../containers/community/WYSIWYG'
import { useParams } from 'react-router-dom'

function CreateUpdate() {

  const { boardId, postId } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  // 게시판 초기 로딩
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await api.getPostForUpdate({ boardId, postId })
        const data = response.data
        console.log(response.data)
        setPost(data.post)

        if (data.post.createdAt) {
          const date = new Date(data.post.createdAt)
          const formattedDate = fmtDate.formatDateWithSeconds(date)
          setPost(p => ({ ...p, createdAt: formattedDate }))
        }

        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData();

  }, [boardId, postId])

  return (
    <>
    {postId ? (<WYSIWYG post={post} />) : (<WYSIWYG />)}
    </>
  )
}

export default CreateUpdate