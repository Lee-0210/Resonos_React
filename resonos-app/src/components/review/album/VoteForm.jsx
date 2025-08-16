import React, { useState, useEffect } from 'react';

const VoteForm = ({ styles, userVote, voteElement }) => {
  const [lyric, setLyric] = useState(userVote?.lyric ?? 0);
  const [sound, setSound] = useState(userVote?.sound ?? 0);
  const [melody, setMelody] = useState(userVote?.melody ?? 0);
  const [storytelling, setStorytelling] = useState(userVote?.storytelling ?? 0);
  const [cohesiveness, setCohesiveness] = useState(userVote?.cohesiveness ?? 0);
  const [creativity, setCreativity] = useState(userVote?.creativity ?? 0);

  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit mode



  const handleSliderChange = (e, setter) => {
    setter(parseInt(e.target.value));
  };

  const handleNumberChange = (e, setter) => {
    let val = parseInt(e.target.value) || 0;
    val = Math.max(0, Math.min(100, val));
    setter(val);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (e, userVote) => {
    e.preventDefault();
    const element = {
      userId: userVote.userId,
      lyric: lyric,
      sound: sound,
      melody: melody,
      storytelling: storytelling,
      cohesiveness: cohesiveness,
      creativity: creativity,
      albumId: userVote.albumId
    }
    voteElement(element);
    setIsEditing(false);
  };

  return (
    <>
      <div className="d-flex gap-5">
        <div id="vote-result-view" className={styles.voteResultView}>
          <ul>
            <li><span>스토리텔링 : </span><span id="storytelling-view">{userVote === null ? '평가전' : storytelling}</span></li>
            <li><span>멜로디 : </span><span id="melody-view">{userVote === null ? '평가전' : melody}</span></li>
            <li><span>유기성 : </span><span id="cohesiveness-view">{userVote === null ? '평가전' : cohesiveness}</span></li>
            <li><span>가사 : </span><span id="lyric-view">{userVote === null ? '평가전' : lyric}</span></li>
            <li><span>사운드 : </span><span id="sound-view">{userVote === null ? '평가전' : sound}</span></li>
            <li><span>독창성 : </span><span id="creativity-view">{userVote === null ? '평가전' : creativity}</span></li>
          </ul>
          <button id="edit-btn" className={`btn ${styles.btnGold}`} onClick={handleEditClick}>{userVote === null ? '투표하기' : '수정하기'}</button>
        </div>
        {isEditing && ( // Conditionally render the form when editing
          <form id="vote-form" className={`${styles.voteForm} ${styles.active}`}>
            <div className={styles.voteRow}>
              <label className={styles.voteLabel}>스토리텔링</label>
              <input
                type="range"
                id="storytelling-slider"
                name="storytelling"
                min="0"
                max="100"
                value={storytelling}
                onChange={(e) => handleSliderChange(e, setStorytelling)}
                style={{ verticalAlign: 'middle' }}
              />
              <input
                type="number"
                id="storytelling-input"
                name="storytellingInput"
                min="0"
                max="100"
                value={storytelling}
                onChange={(e) => handleNumberChange(e, setStorytelling)}
              />
              <br />
            </div>
            <div className={styles.voteRow}>
              <label className={styles.voteLabel}>멜로디</label>
              <input
                type="range"
                id="melody-slider"
                name="melody"
                min="0"
                max="100"
                value={melody}
                onChange={(e) => handleSliderChange(e, setMelody)}
                style={{ verticalAlign: 'middle' }}
              />
              <input
                type="number"
                id="melody-input"
                name="melodyInput"
                min="0"
                max="100"
                value={melody}
                onChange={(e) => handleNumberChange(e, setMelody)}
              />
              <br />
            </div>
            <div className={styles.voteRow}>
              <label className={styles.voteLabel}>유기성</label>
              <input
                type="range"
                id="cohesiveness-slider"
                name="cohesiveness"
                min="0"
                max="100"
                value={cohesiveness}
                onChange={(e) => handleSliderChange(e, setCohesiveness)}
                style={{ verticalAlign: 'middle' }}
              />
              <input
                type="number"
                id="cohesiveness-input"
                name="cohesivenessInput"
                min="0"
                max="100"
                value={cohesiveness}
                onChange={(e) => handleNumberChange(e, setCohesiveness)}
              />
              <br />
            </div>
            <div className={styles.voteRow}>
              <label className={styles.voteLabel}>가사</label>
              <input
                type="range"
                id="lyric-slider"
                name="lyric"
                min="0"
                max="100"
                value={lyric}
                onChange={(e) => handleSliderChange(e, setLyric)}
                style={{ verticalAlign: 'middle' }}
              />
              <input
                type="number"
                id="lyric-input"
                name="lyricInput"
                min="0"
                max="100"
                value={lyric}
                onChange={(e) => handleNumberChange(e, setLyric)}
              />
              <br />
            </div>
            <div className={styles.voteRow}>
              <label className={styles.voteLabel}>사운드</label>
              <input
                type="range"
                id="sound-slider"
                name="sound"
                min="0"
                max="100"
                value={sound}
                onChange={(e) => handleSliderChange(e, setSound)}
                style={{ verticalAlign: 'middle' }}
              />
              <input
                type="number"
                id="sound-input"
                name="soundInput"
                min="0"
                max="100"
                value={sound}
                onChange={(e) => handleNumberChange(e, setSound)}
              />
              <br />
            </div>
            <div className={styles.voteRow}>
              <label className={styles.voteLabel}>독창성</label>
              <input
                type="range"
                id="creativity-slider"
                name="creativity"
                min="0"
                max="100"
                value={creativity}
                onChange={(e) => handleSliderChange(e, setCreativity)}
                style={{ verticalAlign: 'middle' }}
              />
              <input
                type="number"
                id="creativity-input"
                name="creativityInput"
                min="0"
                max="100"
                value={creativity}
                onChange={(e) => handleNumberChange(e, setCreativity)}
              />
              <br />
            </div>
            <button type="button" id="save-btn" className={`btn ${styles.btnGold}`} onClick={(e) => handleSaveClick(e, userVote)}>저장</button>
          </form>
        )}
      </div>
      <div></div>
    </>
  );
};

export default VoteForm;
