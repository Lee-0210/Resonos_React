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
      
    </div>
  );
};

export default TrackStatus;
