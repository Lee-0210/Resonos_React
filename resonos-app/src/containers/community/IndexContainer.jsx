import React, { useEffect } from 'react'
import Index from '../../components/community/Index'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import * as cr from '../../apis/community'

const IndexContainer = () => {

  const getCommunityData = async () => {
    try {
      const response = await cr.getIndex()
      if(response.status === 200) {
        console.log(response)
      }
    } catch(e) {
      console.error('error :', e)
    }
  }

  useEffect(() => {
    getCommunityData()
  }, [])

  return (
    <>
    <Header />
    <div className="container">
      <Index />
    </div>
    <Footer />
    </>
  )
}

export default IndexContainer