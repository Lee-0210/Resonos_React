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
  const [album, setAlbum] = useState({});
  const [artist, setArtist] = useState({});
  const [tracks, setTracks] = useState([]);
  const [top5List, setTop5List] = useState([]);
  const [topTrack, setTopTrack] = useState({});

  // 리뷰 및 좋아요 정보
  const [reviews, setReviews] = useState([]);
  const [score, setScore] = useState({});
  const [albumLikeCount, setAlbumLikeCount] = useState(0);
  const [isAlbumLikedByUser, setIsAlbumLikedByUser] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  // 플레이리스트 정보
  const [emptyPlayList, setEmptyPlayList] = useState(true);
  const [playLists, setPlayLists] = useState([]);

  // 앨범 6요소 및 투표 정보
  const [isArgEmpty, setIsArgEmpty] = useState(true);
  const [argValues, setArgValues] = useState({});
  const [userVote, setUserVote] = useState({});

  // 기타 정보
  const [tags, setTags] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState({});
  const [reviewType, setReviewType] = useState("")

  const [loading, setLoading] = useState(false)
  const [newReview, setNewReview] = useState(null)

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
          setIsAlbumLikedByUser(data.isAlbumLikedByUser);
          setHasNext(data.hasNext);

          setEmptyPlayList(data.emptyPlayList);
          setPlayLists(data.playLists);

          setIsArgEmpty(data.isArgEmpty);
          setArgValues(data.argValues);
          setUserVote(data.userVote);

          setTags(data.tags);
          setIsAdmin(data.isAdmin);
          setUserId(data.userId);
          setReviewType(data.reviewType);

          if (data.album.releaseDate) {
            const releaseDate = new Date(album.releaseDate);
            const formattedDate = releaseDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            });
            album.releaseDate = formattedDate;
          }


        } catch (error) {
          console.error('API 호출 실패:', error);
        } finally {
          setLoading(false);
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
        swal.fire('로그인이 필요합니다', '로그인시 사용 가능한 기능입니다.', 'warning')
      } else {
        swal.fire('실패', '좋아요 실패', 'error')
      }
    }
  }

  const handleLikeClick = (userId, album) => {
    toggleLike(userId, album);
  }

  // 리뷰 작성 함수
  const handleSubmitReview = async (reviewForm) => {
    if (!userId) {
      swal.fire('로그인이 필요합니다', '리뷰 작성은 로그인 후 가능합니다.', 'warning');
      return;
    }
    if (!album.id) {
      swal.fire('오류', '앨범 정보를 찾을 수 없습니다.', 'error');
      return;
    }

    try {
      console.log(reviewForm)
      const response = await api.writeAlbumReview(album.id, reviewForm);

      swal.fire('성공', '리뷰가 성공적으로 작성되었습니다.', 'success');
      const updatedResponse = response.data
      setNewReview(updatedResponse.review);
      setScore(updatedResponse.score);
      setReviews(prevReviews => [...prevReviews, updatedResponse.review]);

    } catch (error) {
      console.error('리뷰 작성 실패:', error);
      swal.fire('오류', '리뷰 작성 중 오류가 발생했습니다.', 'error');
    }
  };

  // 리뷰 삭제
  const deleteReview = async (albumId, reviewId) => {
    try {
      const response = await api.deleteAlbumReview(albumId, reviewId);
      console.log(response.data)
      const data = response.data
      swal.fire('성공', '리뷰가 성공적으로 삭제되었습니다.', 'success')
      // 1. 기존 reviews 배열에서 삭제된 리뷰(reviewId)를 제외한 새로운 배열 생성
      setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
      // 2. 서버에서 받은 최신 점수로 상태 업데이트
      setScore(data.score);

    } catch (error) {
      console.error(error)
      swal.fire('실패', '리뷰 삭제 중 오류 발생.', 'error')
    }
  }
  useEffect(() => {
    console.log('isAlbumLikedByUser 상태 변경됨:', isAlbumLikedByUser);
  }, [isAlbumLikedByUser]);

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
          handleSubmitReview={handleSubmitReview} deleteReview={deleteReview} />
        <Element styles={styles} album={album} isArgEmpty={isArgEmpty}
          argValues={argValues} userVote={userVote} userId={userId}
          isAdmin={isAdmin} />
      </div>
    </>
  )
}

export default Album
