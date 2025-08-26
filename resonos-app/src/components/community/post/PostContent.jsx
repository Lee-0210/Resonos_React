import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import VoteChart from '../card/VoteChart';
import VoteArguments from '../card/VoteArguments';

const PostContent = ({ post, swal, api, isLogin, userInfo, initVote,
  ids, deletePost, reportPost, isManager }) => {

  const [openPw, setOpenPw] = useState(false)
  const [tempPw, setTempPw] = useState(null)
  const [likeCount, setLikeCount] = useState(post.postLikes || 0)
  const [dislikeCount, setDislikeCount] = useState(post.postDislikes || 0)
  const [liked, setLiked] = useState(post.userLiked || false)
  const [disliked, setDisliked] = useState(post.userDisliked || false)
  const [voting, setVoting] = useState(false)
  const [vote, setVote] = useState(initVote)
  const [selectedId, setSelectedId] = useState(null)
  const [isVoted, setIsVoted] = useState(initVote.hasUserVoted || false)


  // 투표
  const contributeVote = async (data) => {
    try {
      const res = await api.contributeVote(data)
      if (res.status === 201) {
        swal.fire({
          title: '투표 완료',
          text: '투표가 성공적으로 완료되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        setVote(res.data.vote)
      }
    } catch (error) {
      swal.fire({
        title: '투표 실패',
        text: '투표 처리중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  const openVote = () => {
    if (!isLogin) {
      swal.fire({
        title: '로그인이 필요합니다',
        text: '로그인시 사용 가능한 기능입니다.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    setVoting(!voting)
  }

  const handleVote = (e) => {
    e.preventDefault();
    if (!selectedId) {
      swal.fire({
        title: '취소 되었습니다.',
        text: '항목을 선택후 투표가 가능합니다.',
        icon: 'warning',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      return
    }
    const data = {
      argId: selectedId,
      userId: userInfo.id
    }
    contributeVote(data)
    setSelectedId(null)
    setVoting(!voting)
  }

  const isDelete = () => {
    setOpenPw(!openPw)
  }
  const postDelete = (isLogged) => {
    deletePost(tempPw, ids, isLogged)
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
        isLikes: isLike
      }
      postLike(ids, data, isLike)
    }
  }
  const postLike = async (ids, data, isLike) => {
    try {
      const response = await api.postLike(ids, data)
      if (response.status === 200) {
        setLikeCount(response.data.likes)
        setDislikeCount(response.data.dislikes)
        if (isLike) {
          // 좋아요 버튼을 누른 경우
          setLiked(prev => !prev);
          setDisliked(false);
        } else {
          // 싫어요 버튼을 누른 경우
          setDisliked(prev => !prev);
          setLiked(false);
        }
      }
    } catch (error) {
      swal.fire({
        title: '좋아요 실패',
        text: '좋아요 처리 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
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
      {vote && !voting && !vote.isComplete && (
        <div className="vote-view">
          <p className='headline'>투표명 : {vote.title}</p>
          <p>투표 기간 : {vote.closedAt} 까지</p>
          <VoteChart vote={vote} />
          <div className="vote-view-util">
            <button className='btn btn-gold' onClick={openVote}>{isVoted ? '재투표하기' : '투표하기'}</button>
          </div>
        </div>
      )}
      {voting && (
        <div className="vote-view">
          <form action="" className='vote-form' onSubmit={handleVote}>
            {vote.arguments.map((arg, index) => <VoteArguments key={index} arg={arg} selectedId={selectedId} onChange={setSelectedId} />)}
            <button type='submit' className='btn btn-gold'>투표완료</button>
          </form>
        </div>
      )}
      {vote && !voting && vote.isComplete && (
        <div className="vote-view">
          <VoteChart vote={vote} />
        </div>
      )}
      <div className="post-util">
        <div className="anybody">
          {isLogin ? (
            <>
              <div className={`like btn btn-gold ${liked ? 'active' : ''}`} onClick={() => handlePostLike(ids, true)}>
                <p>👍</p>
                <p>{likeCount}</p>
              </div>
              <div className={`dislike btn btn-gold ${disliked ? 'active' : ''}`} onClick={() => handlePostLike(ids, false)}>
                <p>👎</p>
                <p>{dislikeCount}</p>
              </div>
              <button className="report btn btn-gold" onClick={() => reportPost(ids)}>🚨</button>
            </>
          ) : (
            <>
              <div className="like btn btn-gold" onClick={() => handlePostLike(ids, true)}>
                <p>👍</p>
                <p>{post.postLikes}</p>
              </div>
              <div className="dislike btn btn-gold" onClick={() => handlePostLike(ids, false)}>
                <p>👎</p>
                <p>{post.postDislikes}</p>
              </div>
            </>
          )}
        </div>
        {
          isManager.current
            ?
            <div className="onlywriter">
              <Link className='btn btn-gold' to={`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`}>수정하기</Link>
              <button className='btn btn-gold' href="#" onClick={() => postDelete(true)}>삭제하기</button>
            </div>
            :
            isLogin && userInfo.id === post.userId ? (
              <div className="onlywriter">
                <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
                <Link className='btn btn-gold' to={`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`}>수정하기</Link>
                <button className='btn btn-gold' href="#" onClick={() => postDelete(true)}>삭제하기</button>
              </div>
            )
              :
              !post.userId && (
                <div className="onlywriter">
                  <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
                  <Link className='btn btn-gold' to={`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`}>수정하기</Link>
                  <button className='btn btn-gold' href="#" onClick={() => isDelete()}>{openPw ? '취소' : '삭제하기'}</button>
                  {openPw && (
                    <>
                      <input type="password" placeholder="비밀번호를 입력해주세요." onChange={(e) => setTempPw(e.target.value)} />
                      <button className='btn btn-gold' onClick={() => postDelete(false)}>삭제</button>
                    </>
                  )}
                </div>
              )
        }

        {isLogin ? (
          userInfo.id !== post.userId && (
            <div className="onlywriter">
              <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
            </div>
          )
        ) : (
          post.userId && (
            <div className="onlywriter">
              <Link className='btn btn-gold' to={`/community/boards/${ids.boardId}`}>목록으로</Link>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default PostContent