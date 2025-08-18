import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardTitleCard = ({title}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/community/boards/98/posts/98')
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