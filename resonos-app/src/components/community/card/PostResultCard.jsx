import React from 'react'
import { useNavigate } from 'react-router-dom'
import {formatDate} from '../../../apis/util'

const PostResultCard = ({post}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${post.community.id}/posts/${post.id}`)
  }

  return (
    <li onClick={handleNavigate}>
      <p className='post-title focus ellipsis'>{post.title}</p>
      <p>{post.content}</p>
      <span className='board-name'>{post.community.name}</span>
      <span className='date'>{formatDate(post.createdAt)}</span>
    </li>
  )
}

export default PostResultCard