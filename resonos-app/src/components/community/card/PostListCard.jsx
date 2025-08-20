import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {formatDateNotDay, formatDateNotTime} from '../../../apis/util'
import * as cr from '../../../apis/community'

const PostListCard = ({post, isBoard, showName}) => {

  const navigate = useNavigate()
  const params = useParams()

  const handleNavigate = () => {
    navigate(`/community/boards/${post.community.id}/posts/${post.id}`)
  }

  return (
    <li onClick={handleNavigate}>
      <p>
        <span className='focus ellipsis'>{post?.title}</span>
        <span className='main'>[{post?.commentCount}]</span>
        &nbsp;👍({post?.postLikes})
      </p>
      <div>
        {
          showName
          ?
          <span className='board-name'>{post?.community?.name}</span>
          :
          <></>
        }
        <span className='date'>
          {
            isBoard ? formatDateNotTime(post?.createdAt) : formatDateNotDay(post?.createdAt)
          }
        </span>
      </div>
    </li>
  )
}

export default PostListCard