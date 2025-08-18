import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardTitleCard = ({item}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${item?.id}`)
  }

  return (
    <li
      onClick={handleNavigate}
    >
      <span className='ellipsis focus'>{item?.name}</span>
    </li>
  )
}

export default BoardTitleCard