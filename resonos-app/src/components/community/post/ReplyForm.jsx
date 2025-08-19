import React from 'react'

const ReplyForm = () => {
  return (
    <div className='reply-form'>
      <form>
        {true && (
          <div className="for-unlogin">
            <input id="nickname" type="text" 
            placeholder='ㅇㅇ' required/>
            <input id="tempPw" type="password"
            placeholder='비밀번호' required />
          </div>
        )}
        <textarea name="" id="" required></textarea>
        <div className="comment-submit">
          <button className='btn btn-gold'>댓글 작성</button>
        </div>
      </form>
    </div>
  )
}

export default ReplyForm