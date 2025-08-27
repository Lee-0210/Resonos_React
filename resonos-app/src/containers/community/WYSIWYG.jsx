import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as api from '../../apis/community'
import swal from 'sweetalert2';
import FreeVote from '../../components/community/card/FreeVote';
import { MySwal } from '../../apis/alert';

const WYSIWYG = ({ post, ids }) => {
  // state
  const [title, setTitle] = useState('');
  const [guestNick, setGuestNick] = useState('');
  const [tempPw, setTempPw] = useState('');
  const [content, setContent] = useState('');
  const [fileIdList, setFileIdList] = useState([]) // 선택 삭제 id 목록
  const [mainFile, setMainFile] = useState(null)   //
  const [files, setFiles] = useState(null)

  const isManager = useRef(false)

  /* 투표 state */
  // 투표 on/off
  const [voteActive, setVoteActive] = useState(() => {
    return post?.vote ? true : false
  })
  // 투표 항목 리스트
  const [voteItems, setVoteItems] = useState(
    post?.vote ? [...post?.vote?.arguments] :
      [
        { id: 1, argNo: 1, content: '항목1' },
        { id: 2, argNo: 2, content: '항목2' }
      ]
  )

  // 투표 제목
  const [voteTitle, setVoteTitle] = useState(() => (
    post ? post?.vote?.title : ''
  ))
  // 투표 종료 일자
  const [closedAt, setClosedAt] = useState(() => (
    post ? post?.vote?.closedAt : ''
  ))

  const editorRef = useRef(null);
  const { userInfo, isLogin } = useContext(LoginContext)
  const navigate = useNavigate()
  // id 가져오기

  // post 값이 바뀌면 state 갱신
  useEffect(() => {
    if (post) {
      setTitle(post.title || '');
      setGuestNick(post.guestNickname || '');
      setContent(post.content || '');
      if (userInfo)
        isManager.current = post.community.creatorId === userInfo.id ? true : false

      // CKEditor가 준비된 상태라면 editor에 내용 설정
      if (editorRef.current) {
        editorRef.current.setData(post.content || '');
      }
    }
  }, [post]);

  // 변경 이벤트 함수
  const changeTitle = (e) => { setTitle(e.target.value) }
  const changeWriter = (e) => { setGuestNick(e.target.value) }
  const changeTempPw = (e) => { setTempPw(e.target.value) }
  const changeContent = (e) => { setContent(e.target.value) }

  // 항목 content 변경 함수
  const onChangeVoteContent = (argNo, e) => {
    const newContent = e.target.value

    setVoteItems(prev =>
      prev.map(item =>
        item.argNo === argNo
          ? { ...item, content: newContent }
          : item
      )
    )
  }

  // 투표 관련 함수
  const addVoteRow = () => {
    if (voteItems.length >= 7) {
      MySwal.fire({
        position: "center",
        icon: "warning",
        title: '항목의 최대 개수는 7개입니다.',
        showConfirmButton: false,
        timer: 800,
        customClass: {
          popup: 'follow-popup',
          icon: 'success-icon',
          title: 'alert-title'
        }
      })
      return
    }
    setVoteItems(prev => {
      const lastOrderNo = prev.length ? prev[prev.length - 1].argNo : 0
      const newId = prev.length ? Math.max(...prev.map(v => v.id)) + 1 : 1
      return [
        ...prev,
        { id: newId, argNo: lastOrderNo + 1, content: `항목${lastOrderNo + 1}` }
      ]
    })
  }

  const deleteVoteRow = (index) => {
    if (voteItems.length <= 2) {
      MySwal.fire({
        position: "center",
        icon: "warning",
        title: '항목의 최소 개수는 2개입니다.',
        showConfirmButton: false,
        timer: 800,
        customClass: {
          popup: 'follow-popup',
          icon: 'success-icon',
          title: 'alert-title'
        }
      })
      return
    }
    setVoteItems(prev => {
      const newArr = prev.filter((_, i) => i !== index)
      return newArr.map((item, i) => ({ ...item, argNo: i + 1 }))
    })
  }


  // 게시글 등록 함수
  const postInsert = async (ids) => {
    const boardId = ids

    const data = {
      content: content,
      title: title,
      ...(isLogin ? {} : { guestNickname: guestNick, guestPassword: tempPw }),
      ...(voteActive
        ? { vote: { title: voteTitle, closedAt, arguments: voteItems } }
        : {}
      ),
      voteActive
    }
    if(!data.content) {
      swal.fire({
        title: '내용을 입력해주세요',
        text: '내용을 입력해주세요',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }

    try {
      const response = await api.postInsert(data, boardId)
      swal.fire({
        title: '작성완료',
        text: '게시글 작성완료',
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      navigate(`/community/boards/${boardId}/posts/${response.data.id}`)
    } catch (error) {
      swal.fire({
        title: '작성실패',
        text: '게시글 작성실패',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 게시글 수정 함수
  const postUpdate = async (ids) => {

    const data = {
      content: content,
      title: title,
      guestNickname: guestNick,
      guestPassword: tempPw,
      ...(voteActive
        ? { vote: { title: voteTitle, closedAt, arguments: voteItems } }
        : {}
      ),
      voteActive,
      manager: isManager.current
    }


    try {
      const response = await api.postUpdate(data, ids)
      swal.fire({
        title: '수정완료',
        text: '게시글 수정완료',
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
      navigate(`/community/boards/${ids.boardId}/posts/${response.data.id}`)
    } catch (error) {
      swal.fire({
        title: '수정실패',
        text: '게시글 수정실패',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }


  return (
    <>
      <Header />
      <div className="wysiwyg-wrapper">
        <div className="ws-wrapper">
          <div className="title-and-writer">
            <div className="title-box">
              <p className='subtitle'>제목</p>
              <input className='styled-form' type="text" id='title'
                value={title} onChange={changeTitle} />
            </div>
            {post ? (
              !post.userId && (
                <>
                  <div className="title-box">
                    <p className='subtitle'>작성자</p>
                    <input className='styled-form' type="text" id='writer'
                      value={guestNick}
                      onChange={changeWriter} />
                  </div>
                  {/* <div className="title-box">
                  <p className='subtitle'>비밀번호</p>
                  <input className='styled-form' type="password" id='password'
                    onChange={changeTempPw} />
                </div> */}
                </>
              )
            ) : (
              !isLogin && (
                <>
                  <div className="title-box">
                    <p className='subtitle'>작성자</p>
                    <input className='styled-form' type="text" id='writer'
                      value={guestNick}
                      onChange={changeWriter} />
                  </div>
                  <div className="title-box">
                    <p className='subtitle'>비밀번호</p>
                    <input className='styled-form' type="password" id='password'
                      onChange={changeTempPw} />
                  </div>
                </>
              )
            )}
          </div>
          <div className="cke">
            <CKEditor
              editor={ClassicEditor}
              config={{
                placeholder: "내용을 입력하세요.",
                toolbar: {
                  items: [
                    'undo', 'redo',
                    '|', 'heading',
                    '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                    '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                    '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                    '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                    '|', 'mediaEmbed',
                  ],
                  shouldNotGroupWhenFull: false
                },
                editorConfig: {
                  height: 500, // Set the desired height in pixels
                },
                alignment: {
                  options: ['left', 'center', 'right', 'justify'],
                },
              }}
              data={content}
              onReady={(editor) => {
                editorRef.current = editor
                if (post?.content) editor.setData(post.content);
              }}
              onChange={(event, editor) => {
                setContent(editor.getData());
              }}
              onBlur={(event, editor) => {
              }}
              onFocus={(event, editor) => {
              }}
            />
          </div>
          {
            voteActive
            &&
            <FreeVote
              voteItems={voteItems}
              addVoteRow={addVoteRow}
              deleteVoteRow={deleteVoteRow}
              setClosedAt={setClosedAt}
              setVoteTitle={setVoteTitle}
              vote={post?.vote}
              onChangeVoteContent={onChangeVoteContent}
            />
          }
          {/* 등록시 */}
          {!post && (
            <div className="actions">
              <button className="btn btn-gold" onClick={() => postInsert(ids.boardId)}>등록</button>
              <Link className="btn btn-gold" to={`/community/boards/${ids.boardId}`}>취소</Link>
              <button
                className="btn btn-gold"
                onClick={() => setVoteActive(!voteActive)}
              >
                {
                  voteActive ? '투표취소' : '투표생성'
                }
              </button>
            </div>

          )}
          {/* 수정시 */}
          {post && (
            <div className="actions">
              <button className="btn btn-gold" onClick={() => postUpdate(ids)}>수정</button>
              <Link className="btn btn-gold" to={`/community/boards/${ids.boardId}/posts/${ids.postId}`}>취소</Link>
              <button
                className="btn btn-gold"
                onClick={() => {
                  setVoteActive(!voteActive)
                }}
              >
                {voteActive ? '투표취소' : '투표생성'}
              </button>
              {!post.userId && (
                <div className="title-box">
                  <h4>비밀번호</h4>
                  <input className='styled-form' type="password" id='password'
                    onChange={changeTempPw} required/>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default WYSIWYG