import React from 'react'

const BoardResultCard = ({rank}) => {
  return (
    <li>
      <span className='board-title focus'>게시판 이름</span>
      <span>{rank}위</span>
      <div>
        <span>게시글</span>
        <span className='date'>85,300</span>
      </div>
    </li>
  )
}

export default BoardResultCard