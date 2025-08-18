import React from 'react'
import { useNavigate } from 'react-router-dom'

const BoardListCard = ({title, date}) => {

  const navigate = useNavigate()

  const handleNavigate = () => {
    // TODO: 게시글 ID 받아와서 navigate
    // alert('데이터 주세요')
    navigate('/community/boards/1/posts/1')
  }

  return (
    <li onClick={handleNavigate}>
      <p>
        <span className='focus ellipsis'>{title}</span>
        <span className='main'>[150]</span>
        &nbsp;❤️(20)
      </p>
      <div>
        <span className='board-name'>게시판이름</span>
        <span className='date'>{date != null ? date : '1998-02-10 10:10:10'}</span>
      </div>
    </li>
  )
}

export default BoardListCard