import React from 'react'
import PostListCard from './card/PostListCard'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router-dom'

const BoardDetail = ({setOnModal, isManager}) => {
  return (
    <main className="commu board">
      {/* 상단 */}
      <div className='top'>
        {/* 음악 재생 */}
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3>매니저의 추천곡 🎵</h3>
            {
              isManager.current
              ?
              <button onClick={() => setOnModal(true)}>설정</button>
              :
              <></>
            }
          </div>
          <iframe
            src={`https://open.spotify.com/embed/track/010ZkIVv6Ay5vqqHVCCiKB?utm_source=generator`}
            width="100%"
            height="150"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
        {/* 게시판 정보 */}
        <div className="board-info">
          <h3>게시판 정보 📝</h3>
          <div>
            <span>매니저</span>
            <p className='ellipsis'>
              <Link className="main" to="/users/2">한지용</Link>
            </p>
          </div>
          <div>
            <span>생성일</span>
            <p className='ellipsis'>2025-08-14</p>
          </div>
          <div>
            <span>한줄소개</span>
            <p className='ellipsis'>비정한 세상 피토하는 음악</p>
          </div>
        </div>
      </div>
      {/* 게시글 목록 */}
      <div className="post-list">
        <h3>최근 게시글 📃</h3>
          <ul>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
            <PostListCard title={'게시글 제목'}/>
          </ul>
        <Pagination />
      </div>
      {/* 하단 */}
      <div className="notice-area">
        <h3>공지사항 & 이벤트 📢 </h3>
          <ul>
            <PostListCard title={'게시글 제목'} />
            <PostListCard title={'게시글 제목'} />
            <PostListCard title={'게시글 제목'} />
            <PostListCard title={'게시글 제목'} />
            <PostListCard title={'게시글 제목'} />
            <Pagination />
          </ul>
      </div>
    </main>
  )
}

export default BoardDetail