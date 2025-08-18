import React from 'react'

const PostForm = () => {
  return (
    <div className="post-form">
      <form>
        <textarea name="" id="" required></textarea>
        <div className="comment-submit">
          <button className='btn btn-gold'>댓글 작성</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm