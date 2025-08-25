import React, { useState } from 'react'


const PostForm = ({ postComment, isLogin }) => {

  const [nick, setNick] = useState('')
  const [tempPw, setTempPw] = useState('')
  const [content, setContent] = useState('')



  const handlePostComment = (e) => {
    e.preventDefault();
    const data = {
      content: content,
      ...(!isLogin ? { guestNickname: nick, guestPassword: tempPw } : {})
    }
    postComment(data)
    setContent('')
    setNick('')
    setTempPw('')
  }

  return (
    <div className="post-form">
      <form onSubmit={handlePostComment}>
        {!isLogin && (
          <div className="for-unlogin">
            <input id="nickname" type="text" value={nick}
              placeholder='닉네임' onChange={(e) => setNick(e.target.value)} required />
            <input id="tempPw" type="password" value={tempPw}
              placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
          </div>
        )}
        <textarea id="content" value={content} required onChange={(e) => setContent(e.target.value)}></textarea>
        <div className="comment-submit">
          <button type='submit' className='btn btn-gold' onClick={(e) => handlePostComment(e)}>댓글 작성</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm