import React, { useEffect, useState } from 'react'
import CommuSearch from '../../components/community/CommuSearch'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as cr from '../../apis/community'

const SearchContainer = () => {

  const [searchedBoard, setSearchedBoard] = useState([])
  const [searchedPost, setSearchedPost] = useState([])
  const [postPagination, setPostPagination] = useState({})
  const [boardPagination, setBoardPagination] = useState({})

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const q = searchParams.get('q');

  const onNavigate = type => {
    navigate(`/community/search/more?type=${type}&q=${q}&page=1`)
  }

  const getSearchResult = async (keyword) => {

    try {
      const response = await cr.searchCommunity(keyword, '', 1)
      if(response.status === 200) {
        console.log(response)
        const data = response.data
        setSearchedBoard(data.searchedCommunities)
        setSearchedPost(data.searchedPosts)
        setPostPagination(data.postPagination)
        setBoardPagination(data.communityPagination)
      }
    } catch(e) {
      console.error('error :', e)
    }
  }

  useEffect(() => {
    getSearchResult(q)
  }, [searchParams])

  return (
    <>
      <Header />
      <div className="container">
        <CommuSearch
          keyword={q}
          onNavigate={onNavigate}
          searchedBoard={searchedBoard}
          searchedPost={searchedPost}
          postPagination={postPagination}
          boardPagination={boardPagination}
        />
      </div>
      <Footer />
    </>
  )
}

export default SearchContainer