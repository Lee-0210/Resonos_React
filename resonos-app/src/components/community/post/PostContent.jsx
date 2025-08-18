import React from 'react'
import { Link } from 'react-router-dom'

const PostContent = () => {
  return (
    <div className="post-content">
      <div className="content">
        <div className="imsi-div"></div>
        <p>임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용</p>
      </div>
      <div className="post-util">
        <div className="anybody">
          <div className="like btn btn-gold">
            <p>👍</p>
            <p>123</p>
          </div>
          <div className="dislike btn btn-gold">
            <p>👎</p>
            <p>12</p>
          </div>
          <div className="report btn btn-gold">
            <p>🚨</p>
          </div>
        </div>
        <div className="onlywriter">
          <Link className='btn btn-gold' to='/community/edit/boards/1/posts/1'>수정하기</Link>
          <a className='btn btn-gold' href="#">삭제하기</a>
        </div>
      </div>
    </div>
  )
}

export default PostContent