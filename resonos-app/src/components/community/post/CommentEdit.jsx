import React, { useState } from 'react'

const CommentEdit = ({ userInfo, cancel, com, editComment }) => {

  const [editContent, setEditContent] = useState(com.content)

  const handleEditComment = (e, content, commentId) => {
    e.preventDefault();
    editComment({content}, commentId)
  }

  return (
    <div className='reply-form'>
      <form>
        {!userInfo && (
          <div className="for-unlogin">
            <input id="nickname" type="text"
              value={'ㅇㅇ'} required readOnly />
          </div>
        )}
        <textarea name="" id="" value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          required></textarea>
        <div className="comment-submit">
          <button type='submit' className='btn btn-gold' 
              onClick={(e) => handleEditComment(e, editContent, com.id)}>수정</button>
          <button className='btn btn-gold' onClick={cancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default CommentEdit