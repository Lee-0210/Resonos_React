import React from 'react'
import PostListCard from './card/PostListCard'
import Pagination from '../Pagination/Pagination'
import { Link } from 'react-router-dom'
import {formatDateNotTime} from '../../apis/util'

const BoardDetail = ({setOnModal, isManager, board, posts, notices}) => {
  return (
    <main className="commu board">
      {/* 상단 */}
      <div className='top'>
        {/* 음악 재생 */}
        <div className='relative'>
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
          {
            board?.trackId == null || board?.trackId == ''
            ?
            <p className='no-content'>대표음악이 없습니다.</p>
            :
            <iframe
            src={`https://open.spotify.com/embed/track/${board.trackId}?utm_source=generator`}
              width="100%"
              height="150"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          }
        </div>
        {/* 게시판 정보 */}
        <div className="board-info">
          <h3>[ {board?.name} ] 게시판</h3>
          <div>
            <span>매니저</span>
            <p className='ellipsis'>
              <Link className="main" to={`/users/${board?.creatorId}`}>한지용</Link>
            </p>
          </div>
          <div>
            <span>생성일</span>
            <p className='ellipsis'>{formatDateNotTime(board?.createdAt)}</p>
          </div>
          <div>
            <span>한줄소개</span>
            <p className='ellipsis'>{board?.description}</p>
          </div>
        </div>
      </div>
      {/* 게시글 목록 */}
      <div className="post-list">
        <h3>게시글 📃</h3>
        <ul>
          {
            posts.length === 0
            ?
            <p className="no-content">작성된 글이 없습니다.</p>
            :
            posts?.map(post => (
              <PostListCard
                key={post.id}
                isBoard={true}
                post={post}
              />
            ))
          }
        </ul>
        <Pagination />
      </div>
      {/* 하단 */}
      <div className="notice-area">
        <h3>공지사항 & 이벤트 📢 </h3>
        <ul>
          {
            notices.length !== 0
            ?
            notices?.map(notice => (
              <PostListCard
                key={notice.id}
                isBoard={true}
                post={notice}
              />
            ))
            :
            <p className="no-content">작성된 글이 없습니다.</p>
          }
        </ul>
        <Pagination />
      </div>
    </main>
  )
}

export default BoardDetail