import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardRankingCard = ({title, rank}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    alert('데이터 주세요')
    // TODO: 게시글 ID 받아와서 navigate
    navigate('/community/boards/98')
  }

  return (
    <li onClick={handleNavigate}>
      <p className='ellipsis focus'>{title}</p><span>{rank}</span>
    </li>
  )
}

export default BoardRankingCard