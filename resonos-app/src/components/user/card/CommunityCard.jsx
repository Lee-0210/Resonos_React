import React from 'react'
import { useNavigate } from 'react-router-dom'

const CommunityCard = ({community}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${community?.id}`)
  }

  return (
    <li
      onClick={handleNavigate}
      className='text-item'
    >
      <p className="sm-title">{community.name}</p>
      <p className="sm-content">{community.description}</p>
    </li>
  )
}

export default CommunityCard