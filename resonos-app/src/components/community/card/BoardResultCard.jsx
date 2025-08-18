import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardResultCard = ({rank}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/community/boards/98')
  }

  return (
    <li onClick={handleNavigate}>
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