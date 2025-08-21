import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const PostContent = ({ post, isLogin, userInfo, boardId, postId }) => {



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
              <div className="report btn btn-gold">
                <p>🚨</p>
              </div>
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
            <a className='btn btn-gold' href="#">삭제하기</a>
          </div>
        )}
        {!post.userId && (
          <div className="onlywriter">
            <Link className='btn btn-gold' to={`/community/boards/${boardId}`}>목록으로</Link>
            <Link className='btn btn-gold' to={`/community/edit/boards/${boardId}/posts/${postId}`}>수정하기</Link>
            <a className='btn btn-gold' href="#">삭제하기</a>
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