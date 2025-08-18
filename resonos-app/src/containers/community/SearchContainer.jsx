import React, { useEffect } from 'react'
import CommuSearch from '../../components/community/CommuSearch'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as cr from '../../apis/community'

const SearchContainer = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const q = searchParams.get('q');

  const onNavigate = type => {
    navigate("/community/search/more", {
      state: {
        keyword: q,
        type
      }
    })
  }

  const getSearchResult = async (keyword) => {

    try {
      const response = await cr.searchCommunity(keyword)
      if(response.status === 200) {
        console.log(response)
      }
    } catch(e) {
      console.error('error :', e)
    }
  }

  useEffect(() => {
    getSearchResult(q)
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        <CommuSearch
          keyword={q}
          onNavigate={onNavigate}
        />
      </div>
      <Footer />
    </>
  )
}

export default SearchContainer