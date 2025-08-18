import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const WYSIWYG = () => {
  // state 
  const [title, setTitle] = useState('')
  const [writer, setWriter] = useState('')
  const [content, setContent] = useState('')
  const [fileIdList, setFileIdList] = useState([]) // 선택 삭제 id 목록
  const [mainFile, setMainFile] = useState(null)   // 
  const [files, setFiles] = useState(null)

  //FeState(second)
  // 변경 이벤트 함수 
  const changeTitle = (e) => { setTitle(e.target.value) }
  const changeWriter = (e) => { setWriter(e.target.value) }
  const changeContent = (e) => { setContent(e.target.value) }

  // id 가져오기 
  const { id } = useParams()

  // 게시글 수정 함수 
  const onSumbit = () => {
    const data = {
      'id': id,
      'title': title,
      'writer': writer,
      'content': content
    }
    const headers = { 'Content-Type': 'application/json' }

    // TODO : onInsert() 전달 받아서 호출 
    onUpdate(data, headers)
  }

  // useEffect(() => {
  //   if (board) {
  //     setTitle(board.title)
  //     setWriter(board.writer)
  //     setContent(board.content)
  //   }
  // }, [board])

  // 삭제 확인 
  const handleDelete = () => {
    const check = window.confirm('정말 삭제하시겠습니까?')
    if (check) {
      onDelete(id)
    }
  }

  // 선택 삭제 핸들러
  const handleCheckedFileDelete = (id) => {
    const check = window.confirm(`선택한 ${fileIdList.length} 개의 파일들을 정말 삭제하시겠습니까?`)
    if (check) {
      deleteCheckedFiles(fileIdList)
      setFileIdList([])
    }
  }

  // ✅ 파일 선택 핸들러
  const checkFileId = (id) => {
    console.log(id);

    let checked = false
    // 체크 여부 확인
    for (let i = 0; i < fileIdList.length; i++) {
      const fileId = fileIdList[i];
      // 체크⭕ ➡ 체크박스 해제 🟩
      if (fileId == id) {
        fileIdList.splice(i, 1)
        checked = true
      }
    }

    // 체크❌ ➡ 체크박스 지정 ✅
    if (!checked) {
      fileIdList.push(id)
    }
    console.log(`체크한 아이디 : ${fileIdList}`);
    setFileIdList(fileIdList)
  }
  // 파일 삭제
  const handleFileDelete = (id) => {
    const check = window.confirm('정말 삭제하시겠습니까?')
    if (check) {
      onDeleteFile(id)
    }
  }
  // 이미지 drag & drop 기능1
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
              <input className='styled-form' type="text" id='title' />
            </div>
            <div className="title-box">
              <p className='subtitle'>작성자</p>
              <input className='styled-form' type="text" id='writer' />
            </div>
            <div className="title-box">
              <p className='subtitle'>비밀번호</p>
              <input className='styled-form' type="password" id='password' />
            </div>
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
              // data={board.content}         // ⭐ 기존 컨텐츠 내용 입력 (HTML)
              onReady={editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
                setContent(data);
              }}
              onBlur={(event, editor) => {
                console.log('Blur.', editor);
              }}
              onFocus={(event, editor) => {
                console.log('Focus.', editor);
              }}
            />
          </div>
          <div className="actions">
            <button className="btn btn-gold">등록</button>
            <button className="btn btn-gold">수정</button>
            <button className="btn btn-gold">삭제</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default WYSIWYG