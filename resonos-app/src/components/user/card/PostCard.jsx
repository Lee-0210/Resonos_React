import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostCard = ({post}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${post.communityId}/posts/${post.id}`)
  }
  return (
    <li
      onClick={handleNavigate}
      className='text-item'
    >
      <p className="sm-title">{post.title}</p>
      <p className="sm-content">{new DOMParser().parseFromString(post.content, 'text/html').body.textContent}</p>
      <span className="date">{new Date(post.createdAt).toLocaleString()}</span>
      <span className="like">👍 {post.postLikes}</span>
    </li>
  )
}

export default PostCard