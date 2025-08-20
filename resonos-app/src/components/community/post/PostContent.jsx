import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginContext } from '../../../contexts/LoginContextProvider';

const PostContent = ({ post }) => {

  const { userInfo, isLogin  } = useContext(LoginContext)


  return (
    <div className="post-content">
      <div className="content">
        {/* <div className="imsi-div"></div>
        <p>임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용임시
          컨텐츠내용임시 컨텐츠내용임시 컨텐츠내용</p> */}
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
        </div>
        {isLogin && userInfo.id === post.userId && (
          <div className="onlywriter">
            <Link className='btn btn-gold' to={`/community/edit/boards/${post.boardId}/posts/${post.postId}`}>수정하기</Link>
            <a className='btn btn-gold' href="#">삭제하기</a>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostContent