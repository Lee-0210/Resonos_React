import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import BoardDetail from '../../components/community/Board'
import * as cr from '../../apis/community'
import { useParams } from 'react-router-dom'

const BoardContainer = () => {

  const params = useParams()

  const getBoardData = async () => {
    try {
      const response = await cr.getBoardData(params.id)
      if(response.status === 200) {
        console.log(response.data)
      }
    } catch (e) {
      console.error('error :', e)
    }
  }

  useEffect(() => {
    getBoardData()
  }, [])
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