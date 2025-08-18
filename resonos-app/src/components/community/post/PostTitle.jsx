import React from 'react'

const PostTitle = ({ title, date, writer }) => {
  return (
    <div className="post-info">
      <div className="title">
        <p className='headline'>{title}</p>
      </div>
      <div className="writer-and-date">
        <p>{writer}</p>
        <p>{date}</p>
      </div>
    </div>
  )
}

export default PostTitle