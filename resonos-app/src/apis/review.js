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

// 앨범 리뷰 삭제 삭제 후 변경된 점수 리턴
export const deleteAlbumReview = async (albumId, reviewId) => {
  return await api.delete(`/albums/reviews/${reviewId}`,{
    params : {
      id : albumId
    }
  })
}

// 앨범 리뷰 수정
export const updateAlbumReview = async (albumId, id, content, rating) => {
  const data = {id, rating, content}
  return await api.put('/albums/reviews', data, {
    params : {
      id : albumId
    }
  })
}

// 앨범 리뷰 좋아요
export const likeAlbumReview = async (reviewId) => {
  return await api.post(`/albums/reviews/${reviewId}`)
}

// 앨범 리뷰 신고
export const reportAlbumReview = async (reviewId) => {
  return await api.post(`/albums/report/${reviewId}`)
}

// 앨범 리뷰 더보기
export const moreAlbumReview = async (albumId, page) => {
  return await api.get('/albums/reviews/more', {
    params : {
      id : albumId,
      page : page
    }
  })
}

// 앨범 6요소 투표
export const voteElement = async (albumId, element) => {
  return await api.post('/albums/vote', element, {
    params : {
      id : albumId
    }
  })
}

// 트랙 초기 페이지
export const getTrackPage = async (id) => {
  return await api.get('/tracks', {
    params: {
      id: id
    }
  });
}

// 트랙 좋아요
export const toggleTrackLike = async (dto) => {
  return await api.post('/tracks/like', dto)
}

// 트랙 플레이리스트에 추가
export const addTrackToPlaylist = async (plId, trackId) => {
  return await api.post(`/tracks/playlists/${plId}`, null, {
    params : {
      id : trackId
    }
  })
}

// 트랙 리뷰 더보기
export const moreTrackReview = async (trackId, page) => {
  return await api.get('/tracks/more', {
    params : {
      id : trackId,
      page : page
    }
  })
}

// 트랙 리뷰 좋아요
export const likeTrackReview = async (reviewId) => {
  return await api.post(`/tracks/reviews/${reviewId}`)
}

// 트랙 리뷰 신고
export const reportTrackReview = async (reviewId) => {
  return await api.post(`/tracks/report/${reviewId}`)
}

// 트랙 리뷰 작성시 리뷰와 갱신된 점수 반환
export const writeTrackReview = async (trackId, Review) => {
  const data = Review
  return await api.post('/tracks/reviews', data, {
    params : {
      id : trackId
    }
  })
}

// 트랙 리뷰 삭제 후 변경된 점수 리턴
export const deleteTrackReview = async (trackId, reviewId) => {
  return await api.delete(`/tracks/reviews/${reviewId}`,{
    params : {
      id : trackId
    }
  })
}

// 트랙 리뷰 수정
export const updateTrackReview = async (trackId, data) => {
  return await api.put('/tracks/reviews', data, {
    params : {
      id : trackId
    }
  })
}


// 트랙 분위기 투표
export const voteTrackMood = async (dto) => {
  return await api.post('/tracks/vote', dto)
}

// 아티스트 초기 페이지
export const getArtistPage = async (id) => {
  return await api.get('/artists', {
    params : {
      id : id
    }
  })
}

// 아티스트 좋아요
export const toggleArtistLike = async (dto) => {
  return await api.post('/artists/toggle-like', dto)
}

// 아티스트 분위기 투표
export const voteArtistMood = async (dto) => {
  return await api.post('/artists/vote-mood', dto)
}