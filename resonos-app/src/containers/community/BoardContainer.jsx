import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import BoardDetail from '../../components/community/Board'

const BoardContainer = () => {
  return (
    <>
      <Header />
      <div className="container">
        <BoardDetail />
      </div>
      <Footer />
    </>
  )
}

export default BoardContainer