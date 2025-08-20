import React from 'react'
import MoreBoardCard from './card/MoreBoardCard'
import Pagination from '../Pagination/Pagination'
import PostResultCard from './card/PostResultCard'

const SearchMore = ({keyword, type, searchedBoard, searchedPost, pagination, onPageChange}) => {

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
          {
            searchedBoard?.map(board => (
              <MoreBoardCard
                key={board.id}
                board={board}
              />
            ))
          }
        </div>
        :
        <>
        <div className="more-post">
          <ul>
            {
              searchedPost?.map(post => (
                <PostResultCard
                  key={post.id}
                  post={post}
                />
              ))
            }
          </ul>
        </div>
        </>
    }

      <Pagination pagination={pagination} onPageChange={onPageChange} />
    </main>
  )
}

export default SearchMore