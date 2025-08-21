import React, { useState } from 'react'

const ReplyForm = ({ cancel, postReply, com, isLogin }) => {

  const [nick, setNick] = useState('')
  const [tempPw, setTempPw] = useState('')
  const [content, setContent] = useState('')

  const handlePostReply = (e, com, content) => {
    e.preventDefault()
    const data = {
      content: content,
      parentCommentId: com.id,
      ...(!isLogin && { guestNickname: nick, guestPassword: tempPw })
    }
    postReply(data)
    setContent('')
    setNick('')
    setTempPw('')
    cancel()
  }

return (
  <div className='reply-form'>
    <form>
      {!isLogin && (
        <div className="for-unlogin">
          <input id="nickname" type="text" value={nick}
            placeholder='ㅇㅇ' onChange={(e) => setNick(e.target.value)} required />
          <input id="tempPw" type="password" value={tempPw}
            placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
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