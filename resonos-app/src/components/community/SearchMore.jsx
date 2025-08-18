import React from 'react'
import MoreBoardCard from './card/MoreBoardCard'
import Pagination from '../Pagination/Pagination'
import PostResultCard from './card/PostResultCard'

const SearchMore = ({keyword, type}) => {
  return (
    <main className="commu more">
      {
        keyword == null || keyword == ''
        ?
          <></>
        :
          <h2>검색결과 : "{keyword}"</h2>
      }

      {
        type === 'board'
        ?
        <div className="more-board">
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
          <MoreBoardCard />
        </div>
        :
        <>
        <div className="more-post">
          <ul>
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
            <PostResultCard />
          </ul>
        </div>
        </>
    }

      <Pagination />
    </main>
  )
}

export default SearchMore