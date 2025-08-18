import React from 'react'
import SearchMore from '../../components/community/SearchMore'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchMoreContainer = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const {keyword, type} = location.state || {}

  return (
    <>
      <Header />
      <div className="container">
        <SearchMore
          keyword={keyword}
          type={type}
        />
      </div>
      <Footer />
    </>
  )
}

export default SearchMoreContainer