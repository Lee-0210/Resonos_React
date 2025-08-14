import React from 'react'
import PostResultCard from './card/PostResultCard'
import BoardResultCard from './card/BoardResultCard'

const CommuSearch = ({keyword, onNavigate}) => {

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
            <BoardResultCard rank={6}/>
            <BoardResultCard rank={32}/>
            <BoardResultCard rank={7}/>
            <BoardResultCard rank={74}/>
            <BoardResultCard rank={14}/>
            <BoardResultCard rank={436}/>
            <BoardResultCard rank={164}/>
            <BoardResultCard rank={45}/>
            <BoardResultCard rank={174}/>
            <BoardResultCard rank={181}/>
          </ul>
          <button onClick={()=>handleNavigate('board')}>더보기 &gt;</button>
        </div>
      </div>
      {/* 게시글 결과 */}
      <div>
        <h3>게시글 검색 결과</h3><span className='count'>192건</span>
        <div className="post-result">
          <ul>
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
          </ul>
          <button onClick={()=>handleNavigate('post')}>더보기 &gt;</button>
        </div>
      </div>

    </main>
  )
}

export default CommuSearch