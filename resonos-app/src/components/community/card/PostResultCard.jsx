import React from 'react'

const PostResultCard = () => {
  return (
    <li>
      <p className='post-title focus ellipsis'>게시글 제목</p>
      <p>내용</p>
      <span className='board-name'>게시판 이름</span>
      <span className='date'>2025-08-15 10:20:30</span>
    </li>
  )
}

export default PostResultCard