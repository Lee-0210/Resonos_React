import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as api from '../../apis/community'
import swal from 'sweetalert2';

const WYSIWYG = ({ post, ids }) => {
  // state 
  const [title, setTitle] = useState('');
  const [guestNick, setGuestNick] = useState('');
  const [tempPw, setTempPw] = useState('');
  const [content, setContent] = useState('');
  const [fileIdList, setFileIdList] = useState([]) // 선택 삭제 id 목록
  const [mainFile, setMainFile] = useState(null)   // 
  const [files, setFiles] = useState(null)

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

  // 게시글 등록 함수 
  const postInsert = async (ids) => {
    const boardId = ids
    const data = {
      content: content,
      title: title,
      ...(isLogin ? {} : { guestNickname: guestNick, guestPassword: tempPw }),
    }
    console.log(data)
    try {
      const response = await api.postInsert(data, boardId)
      console.log(response);
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
      console.log(error)
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
      guestPassword : tempPw
    }
    try {
      const response = await api.postUpdate(data, ids)
      console.log(response);
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
      console.log(error)
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

  // 삭제 확인 
  // const handleDelete = () => {
  //   const check = window.confirm('정말 삭제하시겠습니까?')
  //   if (check) {
  //     onDelete(id)
  //   }
  // }

  // 선택 삭제 핸들러
  // const handleCheckedFileDelete = (id) => {
  //   const check = window.confirm(`선택한 ${fileIdList.length} 개의 파일들을 정말 삭제하시겠습니까?`)
  //   if (check) {
  //     deleteCheckedFiles(fileIdList)
  //     setFileIdList([])
  //   }
  // }

  // ✅ 파일 선택 핸들러
  // const checkFileId = (id) => {
  //   console.log(id);

  //   let checked = false
  //   // 체크 여부 확인
  //   for (let i = 0; i < fileIdList.length; i++) {
  //     const fileId = fileIdList[i];
  //     // 체크⭕ ➡ 체크박스 해제 🟩
  //     if (fileId == id) {
  //       fileIdList.splice(i, 1)
  //       checked = true
  //     }
  //   }

  //   // 체크❌ ➡ 체크박스 지정 ✅
  //   if (!checked) {
  //     fileIdList.push(id)
  //   }
  //   console.log(`체크한 아이디 : ${fileIdList}`);
  //   setFileIdList(fileIdList)
  // }
  // // 파일 삭제
  // const handleFileDelete = (id) => {
  //   const check = window.confirm('정말 삭제하시겠습니까?')
  //   if (check) {
  //     onDeleteFile(id)
  //   }
  // }
  // // 이미지 drag & drop 기능1
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  // 이미지 drag & drop 기능2
  // const customUploadAdapter = (loader) => {
  //   return {
  //     upload() {
  //       return new Promise((resolve, reject) => {
  //         const formData = new FormData();
  //         loader.file.then(async (file) => {
  //           console.log(file);
  //           formData.append("pTable", 'editor');
  //           formData.append("pNo", 0);
  //           formData.append("type", 'SUB');
  //           formData.append("data", file);  //파일 데이터

  //           const headers = {
  //             headers: {
  //               'Content-Type': 'multipart/form-data',
  //             },
  //           };

  //           let response = await fileAPI.upload(formData, headers);
  //           let data = await response.data;
  //           console.log(`data : ${data}`);


  //           // 이미지 렌더링
  //           await resolve({
  //             default: `http://localhost:8080/files/img/${data.id}`
  //           })

  //         });
  //       });
  //     },
  //   };
  // };
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
                <div className="title-box">
                  <p className='subtitle'>비밀번호</p>
                  <input className='styled-form' type="password" id='password'
                    onChange={changeTempPw} />
                </div>
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

                extraPlugins: [uploadPlugin]            // 업로드 플러그인
              }}
              data={content}
              onReady={(editor) => {
                editorRef.current = editor
                if (post?.content) editor.setData(post.content);
              }}
              onChange={(event, editor) => {
                // console.log({ event, editor, data });
                setContent(editor.getData());
              }}
              onBlur={(event, editor) => {
                // console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                // console.log('Focus.', editor);
              }}
            />
          </div>
          {/* 등록시 */}
          {!post && (
            <div className="actions">
              <button className="btn btn-gold" onClick={() => postInsert(ids.boardId)}>등록</button>
              <Link className="btn btn-gold" to={`/community/boards/${ids.boardId}`}>취소</Link>
            </div>
          )}
          {/* 수정시 */}
          {post && (
            <div className="actions">
              <button className="btn btn-gold" onClick={() => postUpdate(ids)}>수정</button>
              <Link className="btn btn-gold" to={`/community/boards/${ids.boardId}/posts/${ids.postId}`}>취소</Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default WYSIWYG