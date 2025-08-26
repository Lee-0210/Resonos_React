import React from 'react'
import './style.css'
import PostListCard from './card/PostListCard'
import BoardRankingCard from './card/BoardRankingCard'
import BoardTitleCard from './card/BoardTitleCard'
import { Link } from 'react-router-dom'
import PostTitleCard from './card/PostTitleCard'

const Index = ({hotPosts, latestPosts, popularPosts, realTimePopularPosts, topCategories, newCategories, topCommunities, newCommunities}) => {

  return (
    <main className='commu index'>
      {/* 화제글 */}
      <div className='main-news'>
        {
          hotPosts.map(hotPost => (
            <Link
              to={`boards/${hotPost.community.id}/posts/${hotPost.id}`} key={hotPost.id}
            >
              <img src={hotPost.thumbnailUrl} alt="썸네일" />
              <p>{hotPost.title}</p>
            </Link>
          ))
        }
      </div>
        <div className='bottom'>
          <div className="left">
          {/* 최신글 */}
          <div className='post-area'>
            <h3>최신글</h3>
            <ul>
              {
                latestPosts.map(post => (
                  <PostListCard
                    key={post.id}
                    post={post}
                    showName={true}
                  />
                ))
              }
            </ul>
          </div>
          {/* 인기글 */}
          <div className='post-area'>
            <h3>인기글</h3>
            <ul>
              {
                popularPosts.map(post => (
                  <PostListCard
                    key={post.id}
                    post={post}
                    isBoard={true}
                    showName={true}
                  />
                ))
              }
            </ul>
          </div>
          {/* 이미지 갤러리 */}
          {/* <div className='post-area'>
            <h3>갤러리</h3>
            <ul>
              <PostListCard title={'갤러리 게시글 제목'} />
              <PostListCard title={'갤러리 게시글 제목'} />
              <PostListCard title={'갤러리 게시글 제목'} />
              <PostListCard title={'갤러리 게시글 제목'} />
              <PostListCard title={'갤러리 게시글 제목'} />
            </ul>
          </div> */}
        </div>
        <div className="right">
          {/* 실시간 인기글 */}
          <div className='right-card'>
            <h3>실시간 인기글</h3>
            <ul>
              {
                realTimePopularPosts.map(post => (
                  <PostTitleCard key={post.id} item={post} />
                ))
              }
            </ul>
          </div>
          {/* 게시판 순위 */}
          <div className='right-card ranking'>
            <h3>게시판 순위 Top7</h3>
            <ul>
              {
                topCommunities.map((board, index) => (
                  <BoardRankingCard
                    key={board.id}
                    board={board}
                    rank={index}
                  />
                ))
              }
            </ul>
          </div>
          {/* 신설 게시판 */}
          <div className='right-card'>
            <h3>신설 게시판</h3>
            <ul>
              {
                newCommunities.map(board => (
                  <BoardTitleCard item={board} key={board.id} />
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Index