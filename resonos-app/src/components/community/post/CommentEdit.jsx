import React, { useState } from 'react'

const CommentEdit = ({ userInfo, cancel, com, editComment }) => {

  const [editContent, setEditContent] = useState(com.content)

  const handleEditComment = (e, content, commentId) => {
    e.preventDefault();
    console.log(content, commentId)
    editComment({content}, commentId)
    console.log("함수실행함")
    setEditContent('')
    cancel()
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