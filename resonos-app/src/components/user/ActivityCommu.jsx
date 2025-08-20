import React from 'react'
import CommunityCard from './card/CommunityCard'

const ActivityCommu = ({commuList}) => {
  return (
    <>
      {/* 통계 */}
      <section className="mypage-grid">
        <div className="grid-item">
          <div className="mypage-card">
            <h3>받은 좋아요 (게시글)</h3>
            <span className="count">123</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="mypage-card">
            <h3>받은 좋아요 (댓글)</h3>
            <span className="count">123</span>
          </div>
        </div>
      </section>

      {/* 나의 게시판 */}
      <div className="info-wrapper">
        <div className="info-section">
          <div className='title'>
            <h2 className="text-start">나의 게시판</h2>
          </div>
          <ul className="ul-list my-board">
            {
              commuList?.length === 0
              ?
              <p className="no-content">개설한 게시판이 없습니다.</p>
              :
              commuList?.map(list => (
                <CommunityCard
                  community={list}
                />
              ))
            }
          </ul>
        </div>
      </div>

      {/* 나의 게시글 */}
      <div className="info-wrapper">
        <div className="info-section">
          <div className='title'>
            <h2 className="text-start">나의 게시글</h2>
          </div>
          <ul className="ul-list my-board">
          </ul>
        </div>
      </div>

      {/* 나의 댓글 */}
      <div className="info-wrapper">
        <div className="info-section">
          <div className='title'>
            <h2 className="text-start">나의 댓글</h2>
          </div>
          <ul className="ul-list my-board">
          </ul>
        </div>
      </div>
    </>
  )
}

export default ActivityCommu