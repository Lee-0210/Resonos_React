import React, { useEffect, useRef, useState } from 'react'
import SearchMore from '../../components/community/SearchMore'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import * as cr from '../../apis/community'

const SearchMoreContainer = () => {

  const [searchedBoard, setSearchedBoard] = useState([])
  const [searchedPost, setSearchedPost] = useState([])
  const [pagination, setPagination] = useState({})

  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [keyword, setKeyword] = useState(() => {
    return location.state?.keyword || localStorage.getItem("keyword") || ""
  })

  const [type, setType] = useState(() => {
    return location.state?.type || localStorage.getItem("type") || ""
  })

  const page = parseInt(searchParams.get('page')) || 1

  const onPageChange = (pageNum) => {
    setSearchParams({ page: pageNum })
  }

  useEffect(() => {

    /* 데이터 요청 */
    const getSearchResult = async () => {
      localStorage.setItem("type", type)
      localStorage.setItem("keyword", keyword)

      try {
        const response = await cr.searchCommunity(keyword, type, page)
        if(response.status === 200) {
          console.log('200임')
          const data = response.data
          console.log('data :', data)
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

  }, [keyword, type, page])

  return (
    <>
      <Header />
      <div className="container">
        <SearchMore
          keyword={localStorage.getItem('keyword')}
          type={localStorage.getItem('type')}
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