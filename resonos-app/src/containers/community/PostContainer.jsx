import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Post from '../../pages/community/Post'

const PostContainer = () => {
  return (
    <>
      <Header />
      <div className="post-wrapper">
        <Post />
      </div>
      <Footer />
    </>
  )
}

export default PostContainer