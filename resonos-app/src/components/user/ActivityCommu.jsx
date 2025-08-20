import React from 'react'
import CommunityCard from './card/CommunityCard'
import CommentCard from './card/CommentCard'

const ActivityCommu = ({commuList, postList, commentList, utlCommu}) => {
  return (
    <>
      {/* 통계 */}
      <section className="mypage-grid">
        <div className="grid-item">
          <div className="mypage-card">
            <h3>받은 좋아요 (게시글)</h3>
            <span className="count">{utlCommu.postLikes}</span>
          </div>
        </div>
        <div className="grid-item">
          <div className="mypage-card">
            <h3>받은 좋아요 (댓글)</h3>
            <span className="count">{utlCommu.commentLikes}</span>
          </div>
        </div>
      </section>

      {/* 내 게시판 */}
      <div className="info-wrapper">
        <div className="info-section">
          <div className='title'>
            <h2 className="text-start">내 게시판</h2>
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

      {/* 내 게시글 */}
      <div className="info-wrapper">
        <div className="info-section">
          <div className='title'>
            <h2 className="text-start">내 게시글</h2>
          </div>
          <ul className="ul-list my-board">
            {
              !postList
              ?
              <p className="no-content">작성한 게시글이 없습니다.</p>
              :
              postList?.map(() => (
                <li>응애</li>
              ))
            }
          </ul>
        </div>
      </div>

      {/* 내 댓글 */}
      <div className="info-wrapper">
        <div className="info-section">
          <div className='title'>
            <h2 className="text-start">내 댓글</h2>
          </div>
          <ul className="ul-list my-board">
            {
              !commentList
              ?
              <p className="no-content">작성한 댓글이 없습니다.</p>
              :
              commentList?.map(comment => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                />
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default ActivityCommu