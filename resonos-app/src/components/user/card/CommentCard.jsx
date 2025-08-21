import React from 'react'
import { useNavigate } from 'react-router-dom'

const CommentCard = ({comment}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${comment.boardId}/posts/${comment.postId}`)
  }

  return (
    <li
      onClick={handleNavigate}
      className='text-item'
    >
      <p className="sm-title">{comment.title}</p>
      <p className="sm-content">{comment.content}</p>
      <span className="date">{new Date(comment.createdAt).toLocaleString()}</span>
      <span className="like">👍 {comment.likes}</span>
    </li>
  )
}

export default CommentCard