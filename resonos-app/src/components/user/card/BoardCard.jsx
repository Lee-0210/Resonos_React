import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardCard = ({board}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${board?.id}`)
  }

  return (
    <li
      onClick={handleNavigate}
      className='text-item'
    >
      <p className="sm-title">{board.name}</p>
      <p className="sm-content">{board.description}</p>
    </li>
  )
}

export default BoardCard