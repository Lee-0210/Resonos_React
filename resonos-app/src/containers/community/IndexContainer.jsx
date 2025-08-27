import React, { useEffect, useState } from 'react'
import Index from '../../components/community/Index'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import * as cr from '../../apis/community'

const IndexContainer = () => {

  const [hotPosts, setHotPosts] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const [popularPosts, setPopularPosts] = useState([])
  const [realTimePopularPosts, setRealTimePopularPosts] = useState([])
  const [topCommunities, setTopCommunities] = useState([])
  const [newCommunities, setNewCommunities] = useState([])

  const getCommunityData = async () => {
    try {
      const response = await cr.getIndex()
      if(response.status === 200) {
        const data = response.data
        // console.log(response)
        setHotPosts(data.hotPosts)
        setLatestPosts(data.latestPosts)
        setPopularPosts(data.popularPosts)
        setRealTimePopularPosts(data.realTimePopularPosts)
        setNewCommunities(data.newCommunities)
        setTopCommunities(data.topCommunities)
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
      <Index
        hotPosts={hotPosts}
        latestPosts={latestPosts}
        popularPosts={popularPosts}
        realTimePopularPosts={realTimePopularPosts}
        topCommunities={topCommunities}
        newCommunities={newCommunities}
      />
    </div>
    <Footer />
    </>
  )
}

export default IndexContainer