import React, { useContext, useState } from 'react'
import { LoginContext } from '../../../contexts/LoginContextProvider'


const PostForm = ({ postComment }) => {

  const [nick, setNick] = useState('')
  const [tempPw, setTempPw] = useState('')
  const [content, setContent] = useState('')


  const isLogin = sessionStorage.getItem('isLogin')
  const {userInfo} = useContext(LoginContext)
  console.log(userInfo)

  const handlePostComment = (e) => {
    e.preventDefault();
    if(isLogin) {
      const data = {
        content : content,
        userNickname : userInfo?.nickname
      }
      console.log(data)
      postComment(data)
    }
    else {
      const data = {
        content : content,
        guestNickname : nick,
        guestPassword : tempPw
      }
      postComment(data)
    }

    setContent('')
    setNick('')
    setTempPw('')
  }

  return (
    <div className="post-form">
      <form onSubmit={handlePostComment}>
        {!isLogin && (
          <div className="for-unlogin">
            <input id="nickname" type="text" 
            placeholder='ㅇㅇ' onChange={(e) => setNick(e.target.value)} required/>
            <input id="tempPw" type="password"
            placeholder='비밀번호' onChange={(e) => setTempPw(e.target.value)} required />
          </div>
        )}
        <textarea id="content" value={content} required onChange={(e) => setContent(e.target.value)}></textarea>
        <div className="comment-submit">
          <button type='submit'  className='btn btn-gold'>댓글 작성</button>
        </div>
      </form>
    </div>
  )
}

export default PostForm