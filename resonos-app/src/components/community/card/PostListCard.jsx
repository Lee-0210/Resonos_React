import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {formatDateNotDay} from '../../../apis/util'
import * as cr from '../../../apis/community'

const PostListCard = ({post}) => {

  const navigate = useNavigate()
  const params = useParams()

  const handleNavigate = () => {
    navigate(`/community/boards/${post.community.id}/posts/${post.id}`)
  }

  useEffect(() => {

  }, [])

  return (
    <li onClick={handleNavigate}>
      <p>
        <span className='focus ellipsis'>{post?.title}</span>
        <span className='main'>[150]</span>
        &nbsp;👍({post?.postLikes})
      </p>
      <div>
        <span className='board-name'>{post?.community?.name}</span>
        <span className='date'>{formatDateNotDay(post?.createdAt)}</span>
      </div>
    </li>
  )
}

export default PostListCard