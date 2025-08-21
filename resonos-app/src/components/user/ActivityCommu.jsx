import React from 'react'
import CommunityCard from './card/BoardCard'
import CommentCard from './card/CommentCard'
import CommentSection from './section/CommentSection'
import PostSection from './section/PostSection'
import BoardSection from './section/BoardSection'

const ActivityCommu = ({boardList, setBoardList, boardCount, postList, setPostList, commentList, utlCommu, onSearchCommunityData, setCommentList, postCount, commentCount}) => {
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
      <BoardSection
        boardList={boardList}
        setBoardList={setBoardList}
        boardCount={boardCount}
        onSearchCommunityData={onSearchCommunityData }
      />

      {/* 내 게시글 */}
      <PostSection
        postList={postList}
        setPostList={setPostList}
        postCount={postCount}
        onSearchCommunityData={onSearchCommunityData}
      />

      {/* 내 댓글 */}
      <CommentSection
        commentList={commentList}
        setCommentList={setCommentList}
        commentCount={commentCount}
        onSearchCommunityData={onSearchCommunityData}
      />
    </>
  )
}

export default ActivityCommu