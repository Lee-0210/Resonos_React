import React, { useState } from 'react'

const ReplyEdit = ({ isLogin, cancel, rep, editReplyf }) => {

  const [editContent, setEditContent] = useState(rep.content)
  const [tempPw, setTempPw] = useState('')


  const handleSubmit = (e, content, replyId) => {
    e.preventDefault();
    const data = {
      content: content,
      ...(!rep.userId && {guestPassword: tempPw} )
    }
    editReplyf(data, replyId)
    setEditContent('')
    setTempPw('')
    cancel()
  }

  return (
    <div className='reply-form'>
      <form>
        {!rep.userId && (
          <div className="for-unlogin">
            <input id="nickname" type="text"
              value={rep.guestNickname} required readOnly />
            <input id="tempPw" type="password"
              placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
          </div>
        )}
        <textarea name="" id="" value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          required></textarea>
        <div className="comment-submit">
          <button type='submit' className='btn btn-gold'
            onClick={(e) => handleSubmit(e, editContent, rep.id)}>수정</button>
          <button className='btn btn-gold' onClick={cancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default ReplyEdit