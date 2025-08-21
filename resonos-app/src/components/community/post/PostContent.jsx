import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostContent = ({ post, isLogin, userInfo, boardId, postId, deletePost, reportPost }) => {

  const [openPw, setOpenPw] = useState(false)
  const [tempPw, setTempPw] = useState(null)

  const isDelete = () => {
    setOpenPw(!openPw)
  }
  const postDelete = (isLogged) => {
    deletePost(tempPw,isLogged)
    setTempPw('')
    setOpenPw(false)
  }

  return (
    <div className="post-content">
      <div className="content">
        <CKEditor editor={ClassicEditor}
          data={post.content}           // 조회할 데이터 컨텐츠 
          disabled={true}
          config={{
            toolbar: [],
          }}
        />
      </div>
      <div className="post-util">
        <div className="anybody">
          {isLogin ? (
            <>
              <div className="like btn btn-gold">
                <p>👍</p>
                <p>{post.postLikes}</p>
              </div>
              <div className="dislike btn btn-gold">
                <p>👎</p>
                <p>{post.postDislikes}</p>
              </div>
              <button className="report btn btn-gold" onClick={() => reportPost({boardId,postId})}>🚨</button>
            </>
          ) : (
            <>
              <div className="like btn btn-gold">
                <p>👍</p>
                <p>{post.postLikes}</p>
              </div>
              <div className="dislike btn btn-gold">
                <p>👎</p>
                <p>{post.postDislikes}</p>
              </div>
            </>
          )}
        </div>
        {isLogin && userInfo.id === post.userId && (
          <div className="onlywriter">
            <Link className='btn btn-gold' to={`/community/boards/${boardId}`}>목록으로</Link>
            <Link className='btn btn-gold' to={`/community/edit/boards/${boardId}/posts/${postId}`}>수정하기</Link>
            <button className='btn btn-gold' href="#" onClick={() => deletePost({ boardId, postId },true)}>삭제하기</button>
          </div>
        )}
        {!post.userId && (
          <div className="onlywriter">
            <Link className='btn btn-gold' to={`/community/boards/${boardId}`}>목록으로</Link>
            <Link className='btn btn-gold' to={`/community/edit/boards/${boardId}/posts/${postId}`}>수정하기</Link>
            <button className='btn btn-gold' href="#" onClick={() => isDelete()}>{openPw ? '취소' : '삭제하기'}</button>
            {openPw && (
              <>
                <input type="text" onChange={(e) => setTempPw(e.target.value)} />
                <button className='btn btn-gold' onClick={() => postDelete(false)}>삭제</button>
              </>
            )}
          </div>
        )}
        {!isLogin && post.userId && (
          <div className="onlywriter">
            <Link className='btn btn-gold' to={`/community/boards/${boardId}`}>목록으로</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent