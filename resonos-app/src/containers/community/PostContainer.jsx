import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import PostDetail from '../../components/community/Post'

const PostContainer = () => {
  return (
    <>
      <Header />
      <div className="post-wrapper">
        <PostDetail />
      </div>
      <Footer />
    </>
  )
}

export default PostContainer