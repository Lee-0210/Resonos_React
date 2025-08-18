import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {formatDate} from '../../../apis/util'
import * as cr from '../../../apis/community'

const PostListCard = ({post}) => {

  const navigate = useNavigate()
  const params = useParams()

  const handleNavigate = () => {
    navigate(`/community/boards/${post.community.id}/posts/${post.id}`)
  }

  useEffect(() => {

  }, [])

  return (
    <li onClick={handleNavigate}>
      <p>
        <span className='focus ellipsis'>{post?.title}</span>
        <span className='main'>[150]</span>
        &nbsp;❤️(20)
      </p>
      <div>
        <span className='board-name'>{post?.community?.name}</span>
        <span className='date'>{formatDate(post?.createdAt)}</span>
      </div>
    </li>
  )
}

export default PostListCard