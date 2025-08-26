import React, { useState } from 'react'

const CommentEdit = ({ isLogin, cancel, com, editComment }) => {

  const [editContent, setEditContent] = useState(com.content)
  const [tempPw, setTempPw] = useState('')

  const handleEditComment = (e, content, commentId) => {
    e.preventDefault();
    const data = {
      content: content,
      guestPassword: tempPw
    }
    if (isLogin) {
      editComment(data, commentId)
      setEditContent('')
      cancel()
    }
    else {
      editComment(data, commentId)
      setEditContent('')
      setTempPw('')
      cancel()
    }
  }

  return (
    <div className='reply-form'>
      <form>
        {!com.userId && (
          <div className="for-unlogin">
            <input id="nickname" type="text"
              value={com.guestNickname} required readOnly />
              <input id="tempPw" type="password"
              placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
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