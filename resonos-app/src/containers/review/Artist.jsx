import React, { useEffect, useState } from 'react'
import * as api from '../../apis/review'
import styles from './Artist.module.css'
import TextPressure from '../../assets/TextPressure';
import { useSearchParams } from 'react-router-dom';
import ArtistInfo from '../../components/review/artist/ArtistInfo';
import ArtistTop7 from '../../components/review/artist/ArtistTop7';
import ArtistRecent from '../../components/review/artist/ArtistRecent';
import MoodStatus from '../../components/review/common/MoodStatus';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

const Artist = () => {

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  // 아티스트 기본 정보
  const [artist, setArtist] = useState(null);

  // 팔로우 정보
  const [isArtistFollowed, setIsArtistFollowed] = useState(false);
  const [followCount, setFollowCount] = useState(0);

  // 앨범 정보
  const [albums, setAlbums] = useState([]);
  const [albumCount, setAlbumCount] = useState(0);

  // 트랙 정보
  const [trackCount, setTrackCount] = useState(0);
  const [top7Tracks, setTop7Tracks] = useState([]);
  const [track, setTrack] = useState(null);

  // 분위기 정보
  const [userVotedMoodId, setUserVotedMoodId] = useState(null);
  const [isMoodEmpty, setIsMoodEmpty] = useState(true);
  const [moodLabels, setMoodLabels] = useState([]);
  const [moodValues, setMoodValues] = useState([]);
  const [moodStats, setMoodStats] = useState([]);

  // 리뷰 정보
  const [recentReviews, setRecentReviews] = useState([]);

  // 유저id
  const [userId, setUserId] = useState(0)

  // 태그 정보
  const [allTags, setAllTags] = useState([]);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 컴포넌트가 마운트될 때, 또는 artistId가 변경될 때 API를 호출합니다.
    const fetchData = async () => {
      try {
        setLoading(true); // 로딩 상태 시작

        const response = await api.getArtistPage(id);
        const data = response.data;
        console.log(data)

        // API 응답 데이터를 각각의 useState에 설정
        setArtist(data.artist);
        setIsArtistFollowed(data.artistFollowed);
        setFollowCount(data.followCount);
        setAlbums(data.albums);
        setAlbumCount(data.albumCount);
        setTrackCount(data.trackCount);
        setTop7Tracks(data.top7Tracks);
        setTrack(data.track);
        setUserVotedMoodId(data.userVotedMoodId);
        setIsMoodEmpty(data.moodEmpty);
        setMoodLabels(data.moodLabels);
        setMoodValues(data.moodValues);
        setMoodStats(data.moodStats);
        setRecentReviews(data.recentReviews);
        setAllTags(data.allTags);
        setUserId(data.userId);

      } catch (err) {
        console.error("Failed to fetch artist data:", err);
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, [id]);

  // 아티스트 좋아요
  const likeArtist = async (dto) => {
    try {
      const response = await api.toggleArtistLike(dto);
      console.log(response.data)
      setIsArtistFollowed(response.data.followed);
      setFollowCount(response.data.count)
    } catch (error) {
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
    }
  }

  // 아티스트 분위기 투표
  const voteMood = async (dto) => {
    const artistDTO = { ...dto, artistId: id }
    try {
      const response = await api.voteArtistMood(artistDTO)
      console.log(response.data)
      const data = response.data
      if (data != null) {
        setUserVotedMoodId(data.votedMoodId)
        setMoodLabels(data.labels)
        setMoodValues(data.values)
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
      <ArtistInfo styles={styles} artist={artist} albumCount={albumCount}
        trackCount={trackCount} userId={userId} isArtistFollowed={isArtistFollowed}
        followCount={followCount} albums={albums} likeArtist={likeArtist} />
      <ArtistTop7 styles={styles} artist={artist} top7Tracks={top7Tracks}
        track={track} />
      <ArtistRecent styles={styles} artist={artist} recentReviews={recentReviews} />
      <MoodStatus styles={styles} isMoodEmpty={isMoodEmpty} tags={allTags} userId={userId}
        artist={artist} track={track} userVotedMoodId={userVotedMoodId}
        moodLabels={moodLabels} moodValues={moodValues} moodStats={moodStats}
        voteMood={voteMood} />
    </div>
  )
}

export default Artist