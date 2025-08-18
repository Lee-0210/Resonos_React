import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import * as api from "../../apis/review"
import styles from './Track.module.css'
import TrackInfo from '../../components/review/track/TrackInfo';
import MvAndStreaming from '../../components/review/common/MvAndStreaming';
import Review from '../../components/review/common/Review';
import MoodStatus from '../../components/review/common/MoodStatus';
import TextPressure from '../../assets/TextPressure';
import TrackStatus from '../../components/review/track/TrackStatus';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const Track = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // DTO의 모든 필드를 개별 useState로 분리
  const [track, setTrack] = useState(null);
  const [album, setAlbum] = useState(null);
  const [top5List, setTop5List] = useState([]);
  const [artist, setArtist] = useState(null);
  const [score, setScore] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [userVotedMoodId, setUserVotedMoodId] = useState(null);
  const [moodStats, setMoodStats] = useState([]);
  const [moodLabels, setMoodLabels] = useState([]);
  const [moodValues, setMoodValues] = useState([]);
  const [isMoodEmpty, setIsMoodEmpty] = useState(true);
  const [trackLikeCount, setTrackLikeCount] = useState(0);
  const [emptyPlayList, setEmptyPlayList] = useState(true);
  const [playLists, setPlayLists] = useState([]);
  const [tags, setTags] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isTrackLikedByUser, setIsTrackLikedByUser] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [reviewType, setReviewType] = useState("");
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(2)

  useEffect(() => {
    const fetchTrackData = async () => {
      setLoading(true);
      try {
        const response = await api.getTrackPage(id);
        console.log(response.data);
        const data = response.data;

        // 가져온 데이터를 각각의 상태에 설정합니다.
        setTrack(data.track);
        setAlbum(data.album);
        setTop5List(data.top5List);
        setArtist(data.artist);
        setScore(data.score);
        setReviews(data.reviews);
        setHasNext(data.hasNext);
        setUserVotedMoodId(data.userVotedMoodId);
        setMoodStats(data.moodStats);
        setMoodLabels(data.moodLabels);
        setMoodValues(data.moodValues);
        setIsMoodEmpty(data.moodEmpty);
        setTrackLikeCount(data.trackLikeCount);
        setEmptyPlayList(data.emptyPlayList);
        setPlayLists(data.playLists);
        setTags(data.tags);
        setIsAdmin(data.admin);
        setIsTrackLikedByUser(data.trackLikedByUser);
        setUserPlaylist(data.userPlaylist);
        setUserId(data.userId);
        setReviewType(data.reviewType);

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false);
      }
    };
    fetchTrackData();
  }, [id]);

  // 트랙 좋아요
  const toggleLike = async (userId, trackId) => {
    const dto = {
      userId: userId,
      trackId: trackId
    }
    try {
      const response = await api.toggleTrackLike(dto);
      const data = response.data
      console.log(response.data)
      setIsTrackLikedByUser(data.liked);
      setTrackLikeCount(data.count)
    } catch (error) {
      if (error.response.data === 'User is null') {
        swal.fire('로그인이 필요합니다', '로그인시 사용 가능한 기능입니다.', 'warning')
      }
    }
  }

  // 트랙 플레이리스트 추가
  const addTrackToPlaylist = async (plId, trackId) => {
    try {
      console.log(plId, trackId)
      const response = await api.addTrackToPlaylist(plId, trackId)
      console.log(response.data)

    } catch (error) {
      if (error.response.data === 'User is null') {
        swal.fire('로그인이 필요합니다', '로그인시 사용 가능한 기능입니다.', 'warning')
      }
      else {
        swal.fire('실패', '플레이리스트에 이미 있거나 오류가 발생했습니다.', 'error')
      }
    }
  }

  // 리뷰 더보기
  const loadMoreReviews = async (page) => {
    try {
      const response = await api.moreTrackReview(id, page);
      console.log(response.data)
      const data = response.data
      setReviews(prevReviews => [...prevReviews, ...data.review]);
      setPage(page + 1)
      setHasNext(data.hasNext);
    } catch (error) {

    }
  }

  // 리뷰 좋아요
  const toggleReviewLike = async (reviewId) => {
    try {
      const response = await api.likeTrackReview(reviewId)
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
      if (error.response.data === 'User is null') {
        swal.fire('로그인이 필요합니다', '로그인시 사용 가능한 기능입니다.', 'warning')
      } else {
        swal.fire('실패', '좋아요 실패', 'error')
      }
    }
  }

  // 리뷰 신고
  const reportReview = async (reviewId) => {
    try {
      const response = await api.reportTrackReview(reviewId)
      const data = response.data
      console.log(response.data)
      swal.fire('신고 완료', `해당 리뷰의 신고 건수는 ${data}건 입니다`, 'success')
    } catch (error) {
      if (error.response.data === 'User is null') {
        swal.fire('로그인이 필요합니다', '로그인시 사용 가능한 기능입니다.', 'warning')
      } else {
        swal.fire('실패', '신고 실패', 'error')
      }
    }
  }

  // 리뷰 등록
  const handleSubmitReview = async (reviewForm) => {
    if (!userId) {
      swal.fire('로그인이 필요합니다', '리뷰 작성은 로그인 후 가능합니다.', 'warning');
      return;
    }
    if (!track.id) {
      swal.fire('오류', '트랙 정보를 찾을 수 없습니다.', 'error');
      return;
    }
    try {
      const response = await api.writeTrackReview(track.id, reviewForm);
      console.log(response.data)
      swal.fire('성공', '리뷰가 성공적으로 작성되었습니다.', 'success');
      const updatedResponse = response.data
      setScore(updatedResponse.score);
      setReviews(prevReviews => [...prevReviews, updatedResponse.review]);
    } catch (error) {
      console.error('리뷰 작성 실패:', error);
      swal.fire('오류', '리뷰 작성 중 오류가 발생했습니다.', 'error');
    }

  }

  // 리뷰 삭제
  const deleteReview = async (trackId, reviewId) => {
    const result = await swal.fire({
      title: '정말 삭제하시겠습니까?',
      text: '삭제된 리뷰는 복구할 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    })
    if (result.isConfirmed) {
      try {
        const response = await api.deleteTrackReview(trackId, reviewId)
        console.log(response.data)
        const data = response.data
        swal.fire('성공', '리뷰가 성공적으로 삭제되었습니다.', 'success')
        setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
        setScore(data.score)
      } catch (error) {
        console.error(error)
        swal.fire('실패', '리뷰 삭제 중 오류 발생.', 'error')
      }
    }
  }

  // 트랙 분위기 투표
  const voteMood = async (dto) => {
    const trackDTO = { ...dto, trackId: id }
    try {
      const response = await api.voteTrackMood(trackDTO)
      console.log(response.data)
      const data = response.data
      if (data != null) {
        setUserVotedMoodId(data.votedMoodId)
        setMoodLabels(data.labels)
        setMoodValues(data.values)
        setIsMoodEmpty(false)
      }
      swal.fire('성공', '투표가 성공적으로 저장되었습니다.', 'success')
    } catch (error) {

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
    <div className={styles.taWrapper}>
      <TrackInfo styles={styles} track={track} album={album} artist={artist} score={score}
        userId={userId} isTrackLikedByUser={isTrackLikedByUser} trackLikeCount={trackLikeCount}
        toggleLike={toggleLike} userPlaylist={userPlaylist}
        addTrackToPlaylist={addTrackToPlaylist} />
      <MvAndStreaming styles={styles} tracks={null} track={track} />
      <Review styles={styles} reviews={reviews} hasNext={hasNext} userId={userId}
        score={score} isAdmin={isAdmin} album={album} track={track} reviewType={reviewType}
        loadMoreReviews={loadMoreReviews} page={page} toggleReviewLike={toggleReviewLike}
        reportReview={reportReview} deleteReview={deleteReview} handleSubmitReview={handleSubmitReview} />
      <MoodStatus styles={styles} isMoodEmpty={isMoodEmpty} tags={tags}
        userId={userId} artist={artist} track={track} moodValues={moodValues}
        moodStats={moodStats} userVotedMoodId={userVotedMoodId} moodLabels={moodLabels}
        voteMood={voteMood} />
      <TrackStatus styles={styles} top5List={top5List} album={album}
        emptyPlayList={emptyPlayList} playLists={playLists} />
    </div>
  )
}

export default Track