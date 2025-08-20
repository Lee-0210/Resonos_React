import React from 'react'

const CommentEdit = ({ userInfo, cancel }) => {
  return (
    <div className='reply-form'>
      <form>
        {!userInfo && (
          <div className="for-unlogin">
            <input id="nickname" type="text" 
            value={'ㅇㅇ'} required readOnly />
          </div>
        )}
        <textarea name="" id="" required></textarea>
        <div className="comment-submit">
          <button className='btn btn-gold'>수정</button>
          <button className='btn btn-gold' onClick={cancel}>취소</button>
        </div>
      </form>
    </div>
  )
}

export default CommentEdit