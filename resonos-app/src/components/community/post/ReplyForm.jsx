import React, { useState } from 'react'

const ReplyForm = ({ userInfo, cancel, postReply, com }) => {

  const [content, setContent] = useState('')
  const handlePostReply = (e, com, content) => {
    e.preventDefault()
    const data = {
      content : content,
      parentCommentId : com.id
    }
    postReply(data)
    setContent('')
    cancel()
  }

  return (
    <div className='reply-form'>
      <form>
        {!userInfo && (
          <div className="for-unlogin">
            <input id="nickname" type="text" 
            placeholder='ㅇㅇ' required/>
            <input id="tempPw" type="password"
            placeholder='비밀번호' required />
          </div>
        )}
        <textarea onChange={(e) => setContent(e.target.value)} required></textarea>
        <div className="comment-submit">
          <button className='btn btn-gold' onClick={(e) => handlePostReply(e, com, content)}>대댓작성</button>
          <button className='btn btn-gold' onClick={cancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default ReplyForm