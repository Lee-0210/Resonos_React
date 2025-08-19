import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ArtistInfo = ({ styles, artist, albumCount, trackCount,
  userId, isArtistFollowed, followCount, albums,
  likeArtist }) => {

  const handleLikeArtist = (userId, artistId) => {
    const dto = {
      userId: userId,
      artistId: artistId
    }
    likeArtist(dto);
  }

  return (
    <>
      <div className={styles.artistCard}>
        <div className={styles.artistOverall}>
          <div className={styles.artistImg}>
            <img src={artist?.profileImage || ''} alt="" />
          </div>
          <div className={styles.artistInfo}>
            <p className={styles.headline}>{artist.name}</p>
            <p>{`💽앨범 : ${albumCount}`}</p>
            <p>{`🎶곡 : ${trackCount}`}</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button
                type="button"
                id="followArtistBtn"
                className={`btn ${styles['btn-gold']}`}
                data-artist-id={artist.id}
                data-user-id={userId ? userId : 0}
                data-followed={isArtistFollowed}
                onClick={() => handleLikeArtist(userId, artist.id)}
              >
                <span id="followText">
                  {isArtistFollowed ? '팔로우❤️' : '팔로우🤍'}
                </span>
                <span id="followCount">{followCount}</span>
              </button>
            </div>
          </div>
        </div>
        <div className={styles.discoGraphy}>
          <div className={styles.graphyHeader}>
            <p className={styles.headline}>디스코 그래피</p>
          </div>
          {/* Swiper 컨테이너 */}
          <Swiper
            spaceBetween={30}          // 슬라이드 간격(px)
            slidesPerView={3}         // 한 화면에 보일 슬라이드 수
          // navigation
          // pagination={{ clickable: true }}
          className={styles.albumContainer}
          >
            {albums && albums.map((album) => (
              <SwiperSlide key={album.id}>
                <Link to={`/albums?id=${album.id}`}>
                  <div className={styles.album}>
                    <div className={styles.albumImg}>
                      <img src={album.coverImage} alt={album.title} />
                      <span className="center-pin"></span>
                    </div>
                    <div className={styles.albumInfo}>
                      <p className={styles.subtitle}>{album.title}</p>
                      <p>{new Date(album.releaseDate).toLocaleDateString()}</p>
                      <p>{album.label}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ArtistInfo;