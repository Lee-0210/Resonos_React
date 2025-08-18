import React from 'react'
import PostTitle from './post/PostTitle'
import PostContent from './post/PostContent'
import PostComment from './post/PostComment'
import PostForm from './post/PostForm'


const Post = () => {
  return (
    <>
      <div className="post-wrapper">
        <div className="container">
          <PostTitle />
          <PostContent />
          <PostComment />
          <PostForm />
        </div>
      </div>
    </>
  )
}

export default Post