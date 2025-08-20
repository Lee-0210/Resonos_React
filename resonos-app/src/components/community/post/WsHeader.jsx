import React from 'react'

const WsHeader = ({ isLogin, changeTitle, changeWriter, changeTempPw, post }) => {
  return (
    <div className="title-and-writer">
      <div className="title-box">
        <p className='subtitle'>제목</p>
        <input className='styled-form' type="text" id='title'
          value={post ? post.title : ''} onChange={changeTitle} />
      </div>
      {!isLogin && (
        <>
          <div className="title-box">
            <p className='subtitle'>작성자</p>
            <input className='styled-form' type="text" id='writer'
            value={post ? (post.userNickname ? post.userNickname : post.guestNickname) : ''}
            onChange={changeWriter} />
          </div>
          <div className="title-box">
            <p className='subtitle'>비밀번호</p>
            <input className='styled-form' type="password" id='password'
            onChange={changeTempPw} />
          </div>
        </>
      )}
    </div>
  )
}

export default WsHeader