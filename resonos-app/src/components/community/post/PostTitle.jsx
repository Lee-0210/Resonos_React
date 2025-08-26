import React from 'react'
import { Link } from 'react-router-dom'

const PostTitle = ({ post }) => {
  return (
    <div className="post-info">
      <h2 className="board-name">
        <Link to={`/community/boards/${post.communityId}`}>
          {post.community.name}
        </Link>
        <hr />
      </h2>
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