import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MoreCard = ({board}) => {

    const navigate = useNavigate()

    const handleNavigate = postId => {
      navigate(`/community/boards/${board.id}/posts/${postId}`)
    }

  return (
    <div className="more-card">
      <h3>
        <Link
          to={`/community/boards/${board.id}`}
          className="main"
        >
          {board.name}
        </Link>
      </h3>
      <ul>
        {
          board?.boardPosts?.map((post, index) => (
            index < 5
            &&
            <li key={post.id} onClick={() => handleNavigate(post.id)}>
              <span>{post.title}</span> <span className="board-name">{post.userNickname}</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default MoreCard