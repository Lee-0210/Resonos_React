import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardRankingCard = ({board, rank}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${board.id}`)
  }

  return (
    <li onClick={handleNavigate}>
      <p className='ellipsis focus'>{board.name}</p><span>{rank + 1}</span>
    </li>
  )
}

export default BoardRankingCard