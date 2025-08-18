import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MoreCard = ({board}) => {

    const navigate = useNavigate()

    const handleNavigate = () => {
      navigate('/community/boards/98/posts/98')
    }

  return (
    <div className="more-card">
      <h3>
        <Link
          to={`/community/boards/98`}
          className="main"
        >
          게시판 이름
        </Link>
      </h3>
      <ul>
        <li onClick={handleNavigate}>
          <span>게시글 제목</span> <span className="board-name">작성자명</span>
        </li>
        <li>
          <span>게시글 제목</span> <span className="board-name">작성자명</span>
        </li>
        <li>
          <span>게시글 제목</span> <span className="board-name">작성자명</span>
        </li>
        <li>
          <span>게시글 제목</span> <span className="board-name">작성자명</span>
        </li>
        <li>
          <span>게시글 제목</span> <span className="board-name">작성자명</span>
        </li>
      </ul>
    </div>
  )
}

export default MoreCard