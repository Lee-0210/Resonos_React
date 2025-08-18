import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostTitleCard = ({item}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate(`/community/boards/${item?.community?.id}/posts/${item?.id}`)
  }

  return (
    <li onClick={handleNavigate}>
      <span className='ellipsis focus'>{item?.title}</span>
    </li>
  )
}

export default PostTitleCard