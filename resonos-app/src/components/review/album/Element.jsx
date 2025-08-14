import React, { useEffect, useRef } from 'react'
import VoteForm from './VoteForm'
import useRadarChart from '../../../assets/useElementChart'


const Element = ({ album, isArgEmpty, userVote, styles, userId, argValues }) => {
  const canvasRef = useRef(null);
  useRadarChart(canvasRef, argValues, isArgEmpty);

  return (
    <>
      {/* 요소 투표 */}
      <div className={styles.argCard}>
        <div className={styles.chart}>
          {isArgEmpty ? (
            <p className={styles.headline}>아직 아무도 투표하지 않았어요</p>
          ) : (
            <canvas ref={canvasRef}></canvas>
          )}
        </div>
        <div className={styles.argVote} data-album-id={album.id}>
          <div className={styles.voteHeader}>
            <p className={styles.headline}>6요소 평가</p>
          </div>
          {/* 로그인 여부에 따른 투표 UI */}
          {userId !== null ?(
            <VoteForm albumId={album.id} userVote={userVote} />
          ) : (
            <p className={styles.headline} style={{ paddingTop: '35px' }}>
              로그인후 점수투표가 가능합니다
            </p>
          )}
        </div>
      </div>
      {/* 요소 투표 끝 */}
    </>
  )
}

export default Element