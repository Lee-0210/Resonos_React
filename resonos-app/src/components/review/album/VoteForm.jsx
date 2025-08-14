import React, { useState, useEffect } from 'react';

const VoteForm = ({styles, userVote, albumId}) => {
    const [lyric, setLyric] = useState(userVote?.lyric || '평가전');
    const [sound, setSound] = useState(userVote?.sound || '평가전');
    const [melody, setMelody] = useState(userVote?.melody || '평가전');
    const [storytelling, setStorytelling] = useState(userVote?.storytelling || '평가전');
    const [cohesiveness, setCohesiveness] = useState(userVote?.cohesiveness || '평가전');
    const [creativity, setCreativity] = useState(userVote?.creativity || '평가전');

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

    const handleSaveClick = () => {
        // Here you would typically send the data to a backend or parent component
        console.log({ lyric, sound, melody, storytelling, cohesiveness, creativity });
        setIsEditing(false);
    };

    return (
      <>
        <div className="d-flex gap-5">
            <div id="vote-result-view" className={styles.voteResultView}>
                <ul>
                    <li><span>가사 : </span><span id="lyric-view">{lyric}</span></li>
                    <li><span>사운드 : </span><span id="sound-view">{sound}</span></li>
                    <li><span>멜로디 : </span><span id="melody-view">{melody}</span></li>
                    <li><span>스토리텔링 : </span><span id="storytelling-view">{storytelling}</span></li>
                    <li><span>유기성 : </span><span id="cohesiveness-view">{cohesiveness}</span></li>
                    <li><span>독창성 : </span><span id="creativity-view">{creativity}</span></li>
                </ul>
                <button id="edit-btn" className={`btn ${styles.btnGold}`} onClick={handleEditClick}>{userVote === null ? '투표하기' : '수정하기'}</button>
            </div>
            {isEditing && ( // Conditionally render the form when editing
                <form id="vote-form" className={styles.voteForm}>
                    <div className={styles.voteRow}>
                        <label className="vote-label">가사</label>
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
                        <label className="vote-label">사운드</label>
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
                        <label className="vote-label">멜로디</label>
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
                        <label className="vote-label">스토리텔링</label>
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
                        <label className="vote-label">유기성</label>
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
                        <label className="vote-label">독창성</label>
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
                    <button type="button" id="save-btn" className={`btn ${styles.btnGold}`} onClick={handleSaveClick}>저장</button>
                </form>
            )}
        </div>
        <div></div>
      </>
    );
};

export default VoteForm;
