import api from './api';

/* 메인페이지 */
export const getIndex = async () => {
  return api.get('/community/')
}

/* 검색 결과 */
export const searchCommunity = async (keyword, type, page) => {
  return api.get(`/community/search?query=${keyword}&type=${type}&page=${page}`)
}

/* 게시판 상세 */
export const getBoardData = async (id, pPage, nPage) => {
  return api.get(`/community/boards/${id}?pPage=${pPage}&nPage=${nPage}`)
}


/* 게시판 트랙 변경 함수 */
export const changeTrack = async (boardId, trackId) => {
  return api.put(`/community/${boardId}/tracks`, { trackId }, {
    headers: { "Content-Type": "application/json" },
  })
}

/* 게시판 한줄소개 업데이트 함수 */
export const updateDescription = async (boardId, description) => {
  return api.put(`/community/${boardId}/intro`, {
    description
  })
}


// 게시글댓 ==================================

// 게시글 조회
export const getPostData = async (ids) => {
  return api.get(`/community/boards/${ids.boardId}/posts/${ids.postId}`)
}
// 게시글 댓 페이지네이션 조회
export const getPostDataWithPage = async (ids,page) => {
  return api.get(`/community/boards/${ids.boardId}/posts/${ids.postId}`, {
    params : {
      page : page,
    }
  })
}
// 회원, 비회원 게시글 댓글 달기 O
export const postComment = async (data, ids) => {
  return api.post(`/community/boards/${ids.boardId}/posts/${ids.postId}/comments`, data)
}
// 회원, 비회원 게시글 댓글 수정 O
export const editComment = async (data, ids) => {
  return api.put(`/community/boards/${ids.boardId}/posts/${ids.postId}/comments/${ids.commentId}`, data)
}
// 회원, 비회원 게시글 대댓 달기 O
export const postReply = async (data, ids) => {
  return api.post(`/community/boards/${ids.boardId}/posts/${ids.postId}/comments`, data)
}
// 회원, 비회원 게시글 대댓 수정 O
export const editReply = async (data, ids) => {
  return api.put(`/community/boards/${ids.boardId}/posts/${ids.postId}/comments/${ids.commentId}`, data)
}
// 비회원 댓,대댓글 삭제 O
export const deleteUnlogComment = async (data, ids) => {
  return api.delete(`/community/boards/${ids.boardId}/posts/${ids.postId}/comments/${ids.commentId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}
// 게시글 회원 댓,대댓글 삭제 O
export const deleteComment = async (ids) => {
  return api.delete(`/community/boards/${ids.boardId}/posts/${ids.postId}/comments/${ids.commentId}`)
}
// 게시글 ==================

// 회원, 비회원 게시글 등록 O
export const postInsert = async (data, boardId) => {
  return api.post(`/community/create/boards/${boardId}`, data)
}
// 회원, 비회원 게시글 수정
export const postUpdate = async (data, ids) => {
  return api.put(`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`, data)
}
// 게시글 삭제 O
export const deletePost = async (data, ids) => {
  return api.delete(`/community/edit/boards/${ids.boardId}/posts/${ids.postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    data
  })
}

// 게시글 신고 O
export const reportPost = async (ids, obj) => {
  return api.post(`/community/report/boards/${ids.boardId}/posts/${ids.postId}`, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
// 좋아요 싫어요 ========
// /community/likes-dislikes/boards/{communityId}/posts/{postId}
// + /comments/{commentId}
export const postLike = async (ids,data) => {
  return api.post(`/community/likes-dislikes/boards/${ids.boardId}/posts/${ids.postId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
export const commentLike = async (ids,data) => {
  return api.post(`/community/likes-dislikes/boards/${ids.boardId}/posts/${ids.postId}/comments/${ids.commentId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}
// 투표하기
export const contributeVote = async (data) => {
  return api.post(`/vote_status`, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
}


