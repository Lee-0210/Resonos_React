import React from 'react'
import WYSIWYG from '../../containers/community/WYSIWYG'
import { useParams } from 'react-router-dom'

function CreateUpdate() {

  const { boardId, postId } = useParams();
  const [post, setPost] = useState(null);

  // useEffect(() => {
  //   // postId가 있으면 수정 모드 → 기존 데이터 로드
  //   if (postId) {
  //     fetch(`/api/boards/${boardId}/posts/${postId}`)
  //       .then((res) => res.json())
  //       .then((data) => setPost(data));
  //   } else {
  //     // postId 없으면 등록 모드 → 빈 기본값
  //     setPost({ title: "", content: "" });
  //   }
  // }, [boardId, postId]);

  return (
    <>
    {postId ? (<WYSIWYG post={post} />) : (<WYSIWYG />)}
    </>
  )
}

export default CreateUpdate