import React from 'react'
import CommuSearch from '../../components/community/CommuSearch'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useNavigate, useSearchParams } from 'react-router-dom'

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