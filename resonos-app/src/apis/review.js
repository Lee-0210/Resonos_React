import api from "./api"

// 앨범 초기 페이지
export const getAlbumPage = async (id) => {
  // `get` 요청의 두 번째 인자로 `params`를 전달하여 쿼리 매개변수를 설정합니다.
  return await api.get('/albums', {
    params: {
      id: id
    }
  });
};

// 앨범 좋아요시 좋아요 여부와 좋아요 수 리턴
export const toggleLike = async (userId, albumId) => {
  const data = {
    userId: userId,
    albumId: albumId
  };
  return await api.post(`/albums/like`, data)
}

// 앨범 리뷰 작성시 리뷰와 갱신된 점수 반환
export const writeAlbumReview = async (albumId, Review) => {
  const data = Review
  return await api.post('/albums/reviews', data, {
    params : {
      id : albumId
    }
  })
}

// 리뷰 삭제 삭제 후 변경된 점수 리턴
export const deleteAlbumReview = async (albumId, reviewId) => {
  return await api.delete(`/albums/reviews/${reviewId}`,{
    params : {
      id : albumId
    }
  })
}

// 앨범 리뷰 수정
export const updateAlbumReview = async (albumId, content, rating) => {
  const data = {content, rating}
  return await api.put('/albums/reviews', data, {
    params : {
      id : albumId
    }
  })
}

// 앨범 리뷰 더보기


// 트랙 초기 페이지
export const getTrackPage = async (id) => {
  return await api.get('/tracks', {
    params: {
      id: id
    }
  });
}


// 아티스트 초기 페이지
export const getArtistPage = async (id) => {
  return await api.get('/artists', {
    params : {
      id : id
    }
  })
}