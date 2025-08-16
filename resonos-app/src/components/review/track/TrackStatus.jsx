import React from 'react';

const TrackStatus = ({ styles, album, top5List, playLists, emptyPlayList }) => {
  return (
    <div className={styles.infoCard}>
      {top5List && top5List.length > 0 && (
        <div className={`${styles.info} ${styles.top5track}`}>
          <p className={styles.headline}>{`${album.title}💽 🔥TOP ${top5List.length}`}</p>
          {top5List.map((tops, index) => (
            <a key={tops.id} href={`/tracks?id=${tops.id}`}>
              <p>{`${index + 1}. ${tops.title}  ${tops.formattedDuration}`}</p>
            </a>
          ))}
        </div>
      )}
      <div className={`${styles.info} ${styles.plList}`}>
        <p id="subtitle">이 트랙을 포함한 플리🎶</p>
        {(emptyPlayList || !playLists || playLists.length === 0) && (
          <>
            <p>해당 음원을 포함한</p>
            <p>플레이리스트를 만들어보세요! 🤩</p>
          </>
        )}
        {playLists && playLists.map(playList => (
          <a key={playList.id} href={`/playlists/${playList.id}`}>
            <p>{`${playList.title} ❤️${playList.likeCount}`}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TrackStatus;
