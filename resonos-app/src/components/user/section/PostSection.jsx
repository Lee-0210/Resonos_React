import React, { useCallback, useEffect, useRef, useState } from 'react'
import PostCard from '../card/PostCard'

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

const PostSection = ({postList, setPostList, postCount, onSearchCommunityData}) => {

  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 300)

  const offsetRef = useRef(0);
  const limitRef = useRef(20);
  const loadingRef = useRef(false);
  const allLoadedRef = useRef(false);

  const isFirstRender = useRef(true)

  // 스크롤로 트랙 20개씩 추가 요청
  const handleScroll = useCallback(() => {
    if (loadingRef.current || allLoadedRef.current) return
    const container = document.querySelector('.info-section.post')
    const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 150
    if (nearBottom && !loadingRef.current && !allLoadedRef.current) {
      // console.log('데이터 요청')
      onSearchCommunityData(debouncedKeyword, offsetRef, limitRef, loadingRef, allLoadedRef, 'post')
    }
  }, [onSearchCommunityData, debouncedKeyword])

  // 스크롤 함수 추가
  useEffect(() => {
    const container = document.querySelector('.info-section.post');
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => {
      const container = document.querySelector('.info-section.post');
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

  // 키워드 바뀌면 새로 참조할 수 있게 요청 초기화
  useEffect(() => {
    if(isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    offsetRef.current = 0
    allLoadedRef.current = false
    setPostList([])

    onSearchCommunityData(debouncedKeyword, offsetRef, limitRef, loadingRef, allLoadedRef, 'post')
  }, [debouncedKeyword, setPostList])

  return (
    <div className="info-wrapper">
      <div className="info-section">
        <div className='title'>
          <div>
            <h2 className="text-start">내 게시글</h2>
            <span className="count">{postCount}</span>
          </div>
          <div className="text-center position-relative">
            <i className="bi bi-search search-icon position-absolute"></i>
            <input
              id="tr-search"
              type="text"
              className="basic-input"
              name="keyword"
              placeholder="게시글 제목, 내용..."
              onChange={e => setKeyword(e.target.value)}
            />
          </div>
        </div>
        <ul className="ul-list my-board">
          {
            !postList
            ?
            <p className="no-content">작성한 게시글이 없습니다.</p>
            :
            postList?.map(post => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default PostSection