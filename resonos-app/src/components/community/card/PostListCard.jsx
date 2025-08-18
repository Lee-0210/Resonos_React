import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {formatDate} from '../../../apis/util'
import * as cr from '../../../apis/community'

const PostListCard = ({post}) => {

  const navigate = useNavigate()
  const params = useParams()

  const handleNavigate = () => {
    // TODO: 게시글 ID 받아와서 navigate
    // alert('데이터 주세요')
    navigate('/community/boards/1/posts/1')
  }

  useEffect(() => {

  }, [])

  return (
    <li onClick={handleNavigate}>
      <p>
        <span className='focus ellipsis'>{post?.title}</span>
        <span className='main'>[150]</span>
        &nbsp;❤️(20)
      </p>
      <div>
        <span className='board-name'>게시판이름</span>
        <span className='date'>{formatDate(post?.createdAt)}</span>
      </div>
    </li>
  )
}

export default PostListCard