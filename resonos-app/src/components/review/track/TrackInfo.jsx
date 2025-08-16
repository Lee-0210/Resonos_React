import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoScore from '../common/InfoScore';
import Swal from 'sweetalert2';

const TrackInfo = ({ styles, track, album, artist, score,
          userId, isTrackLikedByUser, trackLikeCount, toggleLike,
          addTrackToPlaylist, userPlaylist }) => {

  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  // 트랙 좋아요
  const handleTrackLike = (userId, trackId) => {
    toggleLike(userId, trackId)
  }

  // ✅ 플레이리스트 추가 모달 및 로직
  const handleAddPlayList = () => {
    // 유저 플레이리스트가 없으면 모달 표시 후 종료
    if (!userPlaylist || userPlaylist.length === 0) {
      Swal.fire({
        title: "플레이리스트가 없습니다.",
        text: "먼저 플레이리스트를 만들어주세요.",
        icon: "warning",
      });
      return;
    }

    // select 태그에 들어갈 HTML 옵션 생성
    const optionsHtml = userPlaylist.map(pl =>
      `<option value="${pl.id}">${pl.title}</option>`
    ).join('');

    Swal.fire({
      title: '플레이리스트에 추가하기',
      html: `
        <select id="swal-playlist-select" class="swal2-select">
          ${optionsHtml}
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        // 모달창에서 선택된 플레이리스트 ID 가져오기
        const selectElement = document.getElementById('swal-playlist-select');
        const playlistId = selectElement.value;
        if (!playlistId) {
          Swal.showValidationMessage('플레이리스트를 선택해주세요.');
          return false;
        }
        return playlistId;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // ✅ 선택된 플레이리스트 ID를 상태에 저장하고, 부모 컴포넌트 함수 호출
        setSelectedPlaylistId(result.value);
        addTrackToPlaylist(result.value, track.id);
      }
    });
  };


  return (
    <>
      {/* 트랙 카드 */}
      <div className={styles.songCard}>
        <div className={styles.songOverall}>
          <div className={styles.songImg}>
            <img src={album.coverImage} alt="" />
            <span className={styles.centerPin}></span>
          </div>
        </div>
        <div className={styles.songInfo}>
          <p className={styles.headline}>{track.title}</p>
          <p>{new Date(album.releaseDate).toLocaleDateString()}</p>
          <Link to={`/artists?id=${artist.id}`}>
            <p>{artist.name}</p>
          </Link>
          <Link to={`/albums?id=${album.id}`}>
            <p>{`${album.title}💽의 ${track.trackNo}th track`}</p>
          </Link>
          <div className="review-section">
            <InfoScore score={score} />
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="button"
              id="likeTrackBtn"
              className={`btn ${styles['btn-gold']}`}
              data-track-id={track.id}
              data-user-id={userId != null ? userId : 0}
              data-liked={isTrackLikedByUser}
              onClick={() => handleTrackLike(userId, track.id)}
            >
              <span id="likeText">{isTrackLikedByUser ? '좋아요❤️' : '좋아요🤍'}</span>
              <span id="likeCount">{trackLikeCount}</span>
            </button>
            <div className={`btn ${styles['btn-gold']}`} 
            id="addToPlaylistBtn" data-track-id={track.id}
            onClick={handleAddPlayList}>
              저장 💾
            </div>
          </div>
        </div>
      </div>
      {/* 트랙 카드 끝 */}
    </>
  );
};

export default TrackInfo;
