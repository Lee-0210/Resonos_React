import React from 'react'

const PostTitle = ({ post }) => {
  return (
    <div className="post-info">
      <div className="title">
        <p className='headline'>{post.title}</p>
      </div>
      <div className="writer-and-date">
        <p>{(post.userNickname ? post.userNickname : post.guestNickname)}</p>
        <p>{post.createdAt}</p>
        <p>조회수 : {post.views}</p>
      </div>
    </div>
  )
}

export default PostTitle