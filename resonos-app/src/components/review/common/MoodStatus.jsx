import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useMoodChart from '../../../assets/useMoodChart';

const MoodStatus = ({ styles, isMoodEmpty, tags, userId, artist, track,
              userVotedMoodId, moodLabels, moodValues, voteMood }) => {
  const chartRef = useRef(null);

  const [selectedMoodId, setSelectedMoodId] = useState(userVotedMoodId)

  useEffect(() => {
    setSelectedMoodId(userVotedMoodId)
  }, [userVotedMoodId])
  
  const handleMoodVote = (userId,artistId,selectedMoodId) => {
    const dto = {
      userId: userId,
      artistId: artistId,
      mood: selectedMoodId
    }
    voteMood(dto)
  }

  useMoodChart(chartRef, moodLabels, moodValues);

  return (
    <>
      {/* 분위기 */}
      <div className={styles.moodCard}>
        <div className={styles.chart}>
          {isMoodEmpty ? (
            <p className={styles.subtitle}>아직 아무도 분위기에 투표하지 않았어요 😅</p>
          ) : (
            <canvas id="hexRadarChart" ref={chartRef} style={{ width: '100%', maxWidth: '400px', height: 'auto' }}></canvas>
          )}
        </div>
        <div className={styles.moodVote}>
          <div className={styles.voteHeader}>
            <p className={styles.headline}>Mood Tags</p>
          </div>
          <div
            className={styles.moods}
            data-user-id={userId != null ? userId : 0}
            data-artist-id={artist.id}
            data-track-id={track.id}
            id="moodVoteContainer"
          >
            {tags && tags.map(tag => (
              <label
                key={tag.id}
                className={`btn ${styles.btnGold} ${styles.moodOption} ${selectedMoodId === tag.id ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="moodVote"
                  value={tag.id}
                  checked={selectedMoodId === tag.id}
                  onChange={() => setSelectedMoodId(tag.id)}
                  hidden
                />
                <span>{tag.name}</span>
              </label>
            ))}
          </div>
          {userId && (
            <button className={`btn ${styles['btn-gold']}`}
              onClick={()=>handleMoodVote(userId,artist.id,selectedMoodId)} id="submitMoodVote">
              투표하기
            </button>
          )}
        </div>
        <div className={styles.albumMoods}>
          <p className={styles.headline}>분위기로 노래찾기</p>
          {isMoodEmpty != null && !isMoodEmpty ? (
            <div className={styles.moodList}>
              {moodLabels.map(topMood => (
                <Link
                  key={topMood}
                  to={`/search?q=#${topMood}`}
                  className={`btn ${styles['btn-gold']}`}>
                  {`#${topMood}`}
                </Link>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--main-color)' }} id="noVoteMessage">
              아직 아무도 분위기에 투표하지 않았어요 😅
            </p>
          )}
        </div>
      </div>
      {/* 분위기 끝 */}
    </>
  );
};

export default MoodStatus;