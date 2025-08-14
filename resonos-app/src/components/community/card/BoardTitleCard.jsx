import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardTitleCard = ({title}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    // TODO: 게시글 ID 받아와서 navigate
    alert('데이터 주세요')
  }

  return (
    <li
      onClick={handleNavigate}
    >
      <span className='ellipsis focus'>{title}</span>
    </li>
  )
}

export default BoardTitleCard