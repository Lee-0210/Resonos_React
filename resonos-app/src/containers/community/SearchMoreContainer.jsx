import React, { useEffect, useRef, useState } from 'react'
import SearchMore from '../../components/community/SearchMore'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useSearchParams } from 'react-router-dom'
import * as cr from '../../apis/community'

const SearchMoreContainer = () => {

  const [searchedBoard, setSearchedBoard] = useState([])
  const [searchedPost, setSearchedPost] = useState([])
  const [pagination, setPagination] = useState({})

  const [searchParams, setSearchParams] = useSearchParams()

  const type = searchParams.get('type')
  const q = searchParams.get('q')
  const page = parseInt(searchParams.get('page')) || 1

  const onPageChange = (pageNum) => {
    setSearchParams(prev => ({
      type,
      q,
      page: pageNum
    }))
  }

  useEffect(() => {

    /* 데이터 요청 */
    const getSearchResult = async () => {

      try {
        const response = await cr.searchCommunity(q, type, page)
        if(response.status === 200) {
          const data = response.data
          // console.log('data :', data)
          if(type === 'board') {
            setSearchedBoard(data.searchedCommunities)
            setPagination(data.communityPagination)
          } else if(type === 'post') {
            setSearchedPost(data.searchedPosts)
            setPagination(data.postPagination)
          }
        }
      } catch(e) {
        console.error('error :', e)
      }
    }

    getSearchResult()

  }, [q, type, page])

  return (
    <>
      <Header />
      <div className="container">
        <SearchMore
          keyword={q}
          type={type}
          searchedBoard={searchedBoard}
          searchedPost={searchedPost}
          pagination={pagination}
          onPageChange={onPageChange}
        />
      </div>
      <Footer />
    </>
  )
}

export default SearchMoreContainer