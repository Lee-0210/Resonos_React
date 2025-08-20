import React from 'react'
import PostResultCard from './card/PostResultCard'
import BoardResultCard from './card/BoardResultCard'

const CommuSearch = ({keyword, onNavigate, searchedBoard, searchedPost}) => {

  const handleNavigate = type => {
    onNavigate(type)
  }

  return (
    <main className='commu search'>
      <h2>검색결과 : "{keyword}"</h2>
      {/* 게시판 결과 */}
      <div>
        <h3>게시판 검색 결과</h3><span className='count'>192건</span>
        <div className="board-result">
          <ul>
            {
              searchedBoard.length === 0
              ?
              <p className="no-content">검색된 결과가 없습니다.</p>
              :
              searchedBoard?.map(board => (
                <BoardResultCard
                  key={board.id}
                  board={board}
                  rank={6}
                />
              ))
            }
          </ul>
          <button onClick={()=>handleNavigate('board')}>더보기 &gt;</button>
        </div>
      </div>
      {/* 게시글 결과 */}
      <div>
        <h3>게시글 검색 결과</h3><span className='count'>192건</span>
        <div className="post-result">
          <ul>
            {
              searchedPost.length === 0
              ?
              <p className="no-content">검색된 결과가 없습니다.</p>
              :
              searchedPost?.map(post => (
                <PostResultCard
                  key={post.id}
                  post={post}
                />
              ))
            }
          </ul>
          <button onClick={()=>handleNavigate('post')}>더보기 &gt;</button>
        </div>
      </div>

    </main>
  )
}

export default CommuSearch