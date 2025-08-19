import React, { useEffect, useState } from 'react'
import * as api from "../../apis/review"
import { Link, useParams, useSearchParams } from 'react-router-dom'
import styles from './Album.module.css'
import AlbumInfo from '../../components/review/album/AlbumInfo';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import AlbumStatus from '../../components/review/album/AlbumStatus';
import MvAndStreaming from '../../components/review/common/MvAndStreaming';
import Review from '../../components/review/common/Review';
import TextPressure from '../../assets/TextPressure';
import Element from '../../components/review/album/Element';



const Album = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // 앨범 기본 정보
  const [album, setAlbum] = useState(null);
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [top5List, setTop5List] = useState([]);
  const [topTrack, setTopTrack] = useState(null);

  // 리뷰 및 좋아요 정보
  const [reviews, setReviews] = useState([]);
  const [score, setScore] = useState(null);
  const [albumLikeCount, setAlbumLikeCount] = useState(0);
  const [isAlbumLikedByUser, setIsAlbumLikedByUser] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // 플레이리스트 정보
  const [emptyPlayList, setEmptyPlayList] = useState(true);
  const [playLists, setPlayLists] = useState([]);

  // 앨범 6요소 및 투표 정보
  const [isArgEmpty, setIsArgEmpty] = useState(true);
  const [argValues, setArgValues] = useState(null);
  const [userVote, setUserVote] = useState(null);

  // 기타 정보
  const [tags, setTags] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reviewType, setReviewType] = useState("")

  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(2)

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        console.log('API 호출 시작, ID:', id);
        try {
          setLoading(true);
          // axios 응답 객체 전체를 받음
          const response = await api.getAlbumPage(id);
          // console.log(await albumApi.albumPage(id))
          // 실제 데이터는 response.data에 들어있음
          const data = response.data;
          console.log('API 응답 데이터:', data);

          // 응답 데이터를 기반으로 각 상태 업데이트
          setAlbum(data.album);
          setArtist(data.artist);
          setTracks(data.tracks);
          setTop5List(data.top5List);
          setTopTrack(data.topTrack);

          setReviews(data.reviews);
          setScore(data.score);
          setAlbumLikeCount(data.albumLikeCount);
          setIsAlbumLikedByUser(data.albumLikedByUser);
          setHasNext(data.hasNext);

          setEmptyPlayList(data.emptyPlayList);
          setPlayLists(data.playLists);

          setIsArgEmpty(data.argEmpty);
          setArgValues(data.argValues);
          setUserVote(data.userVote);

          setTags(data.tags);
          setIsAdmin(data.admin);
          setUserId(data.userId);
          setReviewType(data.reviewType);

          if (data.album && data.album.releaseDate) {
            const releaseDate = new Date(data.album.releaseDate);
            const formattedDate = releaseDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            setAlbum(prevAlbum => ({
              ...prevAlbum,
              releaseDate: formattedDate
            }));
          }


        } catch (error) {
          console.error('API 호출 실패:', error);
        } finally {
          setLoading(false);
          console.log('페이지 데이터 로딩 완료');
        }
      }
    };

    fetchData();
  }, [id]);




  // 앨범 좋아요
  const toggleLike = async (userId, album) => {
    try {
      const response = await api.toggleLike(userId, album.id);
      console.log(response.data)
      setIsAlbumLikedByUser(response.data.liked);
      setAlbumLikeCount(response.data.count)
    } catch (error) {
      console.error(error);
      if (error.response.data === 'User is null') {
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
        swal.fire({
          title: '실패',
          text: '서버오류.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }

  const handleLikeClick = (userId, album) => {
    toggleLike(userId, album);
  }

  // 리뷰 작성
  const handleSubmitReview = async (reviewForm) => {
    try {
      console.log(reviewForm)
      const response = await api.writeAlbumReview(album.id, reviewForm);

      const updatedResponse = response.data
      setScore(updatedResponse.score);
      setReviews(prevReviews => [...prevReviews, updatedResponse.review]);
      swal.fire({
        title: '성공',
        text: '리뷰가 성공적으로 작성되었습니다.',
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    } catch (error) {
      console.error(error);
      if (error.response.data === 'User is null') {
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
        swal.fire({
          title: '실패',
          text: '서버오류.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  };

  // 리뷰 삭제
  const deleteReview = async (albumId, reviewId) => {
    const result = await swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '삭제된 리뷰는 복구할 수 없습니다.',
      icon: 'warning',
      customClass: {
        popup: 'album-wrapper'
      },
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    })
    if (result.isConfirmed) {
      try {
        const response = await api.deleteAlbumReview(albumId, reviewId);
        console.log(response.data)
        const data = response.data
        swal.fire({
          title: '성공',
          text: '리뷰가 성공적으로 삭제되었습니다.',
          icon: 'success',
          customClass: {
            popup: 'album-wrapper'
          }
        })
        // 1. 기존 reviews 배열에서 삭제된 리뷰(reviewId)를 제외한 새로운 배열 생성
        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
        // 2. 서버에서 받은 최신 점수로 상태 업데이트
        setScore(data.score);

      } catch (error) {
        console.error(error)
        swal.fire({
          title: '오류',
          text: '리뷰 삭제 중 오류가 발생했습니다.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }

  // 리뷰 수정
  const updateReview = async (reviewForm) => {
    try {
      const reponse = await api.updateAlbumReview(id, reviewForm.id, reviewForm.content, reviewForm.rating);
      const data = reponse.data
      console.log(data)
      setReviews(prevReviews => prevReviews.map(review =>
        review.id === data.review.id
          ? { ...review, content: data.review.content, rating: data.review.rating }
          : review
      ));
      setScore(data.score)
      swal.fire({
        title: '성공',
        text: '리뷰가 성공적으로 수정되었습니다.',
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    } catch (error) {
      console.error(error)
      swal.fire({
        title: '오류',
        text: '리뷰 수정 중 오류가 발생했습니다.',
        icon: 'error',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    }
  }

  // 리뷰 더보기
  const loadMoreReviews = async (page) => {
    try {
      const response = await api.moreAlbumReview(id, page);
      console.log(response.data)
      const data = response.data
      setReviews(prevReviews => [...prevReviews, ...data.review]);
      setPage(page + 1)
      setHasNext(data.hasNext);
    } catch (error) {
      console.error(error)
    }
  }

  // 리뷰 좋아요
  const toggleReviewLike = async (reviewId) => {
    try {
      const response = await api.likeAlbumReview(reviewId)
      const data = response.data
      console.log(response)
      setReviews(prevReviews => prevReviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review, likes: data.likeCount,
            isLikedByCurrentUser: data.liked
          }
        }
        return review
      }))
    } catch (error) {
      console.error(error);
      if (error.response.data === 'User is null') {
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
        swal.fire({
          title: '실패',
          text: '서버오류.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }
  // 리뷰 신고
  const reportReview = async (reviewId) => {
    try {
      const response = await api.reportAlbumReview(reviewId)
      const data = response.data
      console.log(response)
      swal.fire({
        title: '신고 완료',
        text: `해당 리뷰의 신고 건수는 ${data.reportCount}건 입니다`,
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    } catch (error) {
      console.error(error);
      if (error.response.data === 'User is null') {
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
        swal.fire({
          title: '실패',
          text: '서버오류.',
          icon: 'error',
          customClass: {
            popup: 'album-wrapper'
          }
        })
      }
    }
  }

  // 6요소 투표
  const voteElement = async (element) => {
    try {
      const response = await api.voteElement(id, element);
      const data = response.data
      console.log(data)
      setUserVote(data.userArg)
      setArgValues(data.avgArg)
      if (data.userArg != null) {
        setIsArgEmpty(false)
      }
      swal.fire({
        title: '성공',
        text: '투표가 성공적으로 저장되었습니다.',
        icon: 'success',
        customClass: {
          popup: 'album-wrapper'
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div style={{ position: 'relative', height: '300px' }}>
        <TextPressure
          text="LOADING...!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ff0000"
          minFontSize={36}
        />
      </div>
    )
  }
  return (
    <>
      <div className={styles.albumWrapper}>
        <AlbumInfo handleLikeClick={handleLikeClick} styles={styles}
          album={album} artist={artist} score={score}
          isAlbumLikedByUser={isAlbumLikedByUser} albumLikeCount={albumLikeCount}
          tracks={tracks} userId={userId} />
        <MvAndStreaming styles={styles} tracks={tracks} track={topTrack} />
        <AlbumStatus styles={styles} album={album}
          top5List={top5List} isArgEmpty={isArgEmpty}
          argValues={argValues} emptyPlayList={emptyPlayList}
          playLists={playLists} />
        <Review styles={styles} reviews={reviews} hasNext={hasNext} userId={userId}
          score={score} isAdmin={isAdmin} album={album} reviewType={reviewType} track={null}
          handleSubmitReview={handleSubmitReview} deleteReview={deleteReview}
          loadMoreReviews={loadMoreReviews} page={page} updateReview={updateReview}
          toggleReviewLike={toggleReviewLike} reportReview={reportReview} />
        <Element styles={styles} album={album} isArgEmpty={isArgEmpty}
          argValues={argValues} userVote={userVote} userId={userId}
          isAdmin={isAdmin} voteElement={voteElement} />
      </div>
    </>
  )
}

export default Album
