import React, { useCallback, useEffect, useRef, useState } from 'react'
import {MySwal} from '../../../apis/alert'

// onChange 이벤트 디바운스
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

const TrackModalCommunity = ({onModal, setOnModal, setMusic, onSearchTrack, trackList, setTrackList}) => {

  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const inputRef = useRef(null)

  const offsetRef = useRef(0);
  const limitRef = useRef(20);
  const loadingRef = useRef(false);
  const allLoadedRef = useRef(false);

  const [selectedTrackIds, setSelectedTrackIds] = useState({})

  // 게시판 대표 음악 설정
  const handleSetMusic = () => {
    setMusic(selectedTrackIds.id)
    setOnModal(false)
  }

  // 스크롤로 트랙 20개씩 추가 요청
  const handleScroll = useCallback(() => {
    if (loadingRef.current || allLoadedRef.current) return
    const container = document.querySelector('.ul-list.modall')
    const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 150

    if (nearBottom && !loadingRef.current && !allLoadedRef.current) {
      onSearchTrack(debouncedKeyword, offsetRef, limitRef, loadingRef, allLoadedRef)
    }

  }, [onSearchTrack, debouncedKeyword])

  // 키워드 state 변경 함수
  const handleSearchTrack = (e) => {
    setKeyword(e.target.value)
  }

  // 선택한 모달 트랙 목록 토글
  const toggleSelectTrack = (id, title) => {
    setSelectedTrackIds({id, title})
  }

  // 스크롤 함수 추가
  useEffect(() => {
    const container = document.querySelector('.ul-list.modall');
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      const container = document.querySelector('.ul-list.modall');
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    }
  }, [handleScroll])

  // 키워드 바뀌면 offset 0 으로 초기화
  useEffect(() => {

    offsetRef.current = 0
    allLoadedRef.current = false
  }, [debouncedKeyword])

  // 키워드 바뀌면 새로 참조할 수 있게 트랙리스트 초기화
  useEffect(() => {
    if (!debouncedKeyword) return

    offsetRef.current = 0
    allLoadedRef.current = false
    setTrackList([])

    onSearchTrack(debouncedKeyword, offsetRef, limitRef, loadingRef, allLoadedRef)
      .finally(() => {
        loadingRef.current = false
      })
  }, [debouncedKeyword, setTrackList])

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setOnModal(false);
      }
    };

    const timeout = setTimeout(() => {
      if(inputRef.current) inputRef.current.focus()
        console.log(inputRef)
    }, 100)

    // ESC 키 이벤트 등록
    window.addEventListener("keydown", handleEsc);

    // 컴포넌트 unmount 시 이벤트 제거
    return () => {
      clearTimeout(timeout)
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onModal]);

  return (
    <>
      <section className={`modal-track ${onModal ? ' action' : ''}`}>
        <button id="close-modal" type="button"
          onClick={() => setOnModal(false)}
        >×
        </button>
        <div className="modal-contents">
          <div className="text-center position-relative">
            <i className="bi bi-search search-icon position-absolute"></i>
            <input
              id="track-search"
              type="text"
              className="modal-input"
              name="keyword"
              placeholder="키워드를 입력하세요."
              onChange={handleSearchTrack}
              ref={inputRef}
            />
          </div>
          <div>
            <div className='d-flex align-items-center mb-1'>
              <p className='modal-title-title'>선택한 트랙</p>
              <button
                className='mybtn-gold-sm'
                onClick={() => setSelectedTrackIds({})}
              >
                취소
              </button>
            </div>
            <ul className='modal-title-list'>
              {selectedTrackIds.title}
            </ul>
          </div>
          <ul className="ul-list modall">
            {trackList.map(track => (
              <li className={`list-item ${selectedTrackIds.id === track.id ? 'selected' : ''}`}
                  key={track.id}
                  onClick={() => toggleSelectTrack(track.id, track.title)}
              >
                <input type="hidden" value={track.id} />
                <img src={track.coverImage} className="follow-img" alt={track.title} />
                <div className="info">
                  <span className="name-album">{track.title}</span>
                  <span className="name-artist">{track.artistName}</span>
                </div>
                <div className="right">
                  <button className="like like-track">
                    {track.liked ? '♥' : ''}
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center btn-area">
            <button id="btn-modal" type="button" className="btn btn-gold" onClick={handleSetMusic}>
              설정하기
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default TrackModalCommunity