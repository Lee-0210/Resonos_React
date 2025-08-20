import React from 'react'

const WsHeader = ({ isLogin }) => {
  return (
    <div className="title-and-writer">
      <div className="title-box">
        <p className='subtitle'>제목</p>
        <input className='styled-form' type="text" id='title' />
      </div>
      {!isLogin && (
        <>
          <div className="title-box">
            <p className='subtitle'>작성자</p>
            <input className='styled-form' type="text" id='writer' />
          </div>
          <div className="title-box">
            <p className='subtitle'>비밀번호</p>
            <input className='styled-form' type="password" id='password' />
          </div>
        </>
      )}
    </div>
  )
}

export default WsHeader