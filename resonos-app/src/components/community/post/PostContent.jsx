import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostContent = ({ post, swal, api, isLogin, userInfo, ids, deletePost, reportPost }) => {

  const [openPw, setOpenPw] = useState(false)
  const [tempPw, setTempPw] = useState(null)
  const [likeCount, setLikeCount] = useState(post.postLikes || 0)
  const [dislikeCount, setDislikeCount] = useState(post.postDislikes || 0)

  const isDelete = () => {
    setOpenPw(!openPw)
  }
  const postDelete = (isLogged) => {
    deletePost(tempPw, isLogged)
    setTempPw('')
    setOpenPw(false)
  }
  const handlePostLike = (ids, isLike) => {
    if (!isLogin) {
      swal.fire({
        title: '로그인이 필요합니다',
        text: '로그인시 사용 가능한 기능입니다.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
    else {
      const data = {
        isLikes : isLike
      }
      postLike(ids,data)
    }
  }
  const postLike = async (ids,data) => {
    try {
      const response = await api.postLike(ids,data)
      console.log(response)
      if (response.status === 200) {
        if (data.isLikes) {
          setLikeCount(prev => prev + 1)
        } else {
          setDislikeCount(prev => prev + 1)
        }
      }
    } catch (error) {
      console.log(error)
    }
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
              <div className="like btn btn-gold" onClick={() => handlePostLike(ids, true)}>
                <p>👍</p>
                <p>{likeCount}</p>
              </div>
              <div className="dislike btn btn-gold"onClick={() => handlePostLike(ids, false)}>
                <p>👎</p>
                <p>{dislikeCount}</p>
              </div>
              <button className="report btn btn-gold" onClick={() => reportPost(ids)}>🚨</button>
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
            <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
            <Link className='btn btn-gold' to={`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`}>수정하기</Link>
            <button className='btn btn-gold' href="#" onClick={() => deletePost(ids, true)}>삭제하기</button>
          </div>
        )}
        {!post.userId && (
          <div className="onlywriter">
            <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
            <Link className='btn btn-gold' to={`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`}>수정하기</Link>
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
            <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent