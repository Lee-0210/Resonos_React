import api from './api';

/* 메인페이지 */
export const getIndex = async () => {
  return api.get('/community/')
}

/* 검색 결과 */
export const searchCommunity = async (keyword) => {
  return api.get(`/community/search?q=${keyword}`)
}

/* 게시판 상세 */
export const getBoardData = async id => {
  return api.get(`/community/boards/${id}`)
}

/* 게시글 상세 */
export const getPostData = async (ids) => {
  return api.get(`/community/boards/${ids.boardId}/posts/${ids.postId}`)
}