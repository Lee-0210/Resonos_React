import React from 'react'

const ReplyForm = ({ userInfo, cancel }) => {
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
        <textarea name="" id="" required></textarea>
        <div className="comment-submit">
          <button className='btn btn-gold'>대댓작성</button>
          <button className='btn btn-gold' onClick={cancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default ReplyForm