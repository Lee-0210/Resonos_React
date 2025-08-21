import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardResultCard = ({rank, board}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${board.id}`)
  }

  return (
    <li onClick={handleNavigate}>
      <span className='board-title focus'>{board?.name}</span>
      {/* <span>{rank}위</span> */}
      <div>
        <span>게시글</span>
        <span className='date'>{board.boardPostCount}</span>
      </div>
    </li>
  )
}

export default BoardResultCard