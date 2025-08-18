import React from 'react'
import { Link } from 'react-router-dom'

const MoreCard = ({board}) => {
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
        <li>
          <span>게시글 제목</span> <span className="board-name">작성자명</span>
        </li>
      </ul>
    </div>
  )
}

export default MoreCard