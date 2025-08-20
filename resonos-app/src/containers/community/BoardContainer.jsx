import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import BoardDetail from '../../components/community/Board'
import * as cr from '../../apis/community'
import * as ur from '../../apis/user'
import { useParams, useSearchParams } from 'react-router-dom'
import TrackModalCommunity from '../../components/user/modal/TrackModalCommunity'
import { LoginContext } from '../../contexts/LoginContextProvider'

const BoardContainer = () => {

  const {userInfo} = useContext(LoginContext)
  const [searchParams, setSearchParams] = useSearchParams()

  // 트랙
  const [onModal, setOnModal] = useState(false)
  const [trackList, setTrackList] = useState([])

  // 게시판
  const [board, setBoard] = useState()
  const [posts, setPosts] = useState([])
  const [postPagination, setPostPagination] = useState({})
  const [notices, setNotices] = useState([])
  const [noticePagination, setNoticePagination] = useState({})
  const [onButton, setOnButton] = useState(false)

  // 페이지
  const pPage = searchParams?.get('pPage') || 1
  const nPage = searchParams?.get('nPage') || 1

  const isManager = useRef(false)

  const params = useParams()

  const onChangePostPage = pageNum => {
    setSearchParams(prev => ({
      nPage,
      pPage: pageNum
    }))
  }

  const onChangeNoticePage = pageNum => {
    setSearchParams(prev => ({
      pPage,
      nPage: pageNum
    }))
  }


  // 한줄소개 업데이트 요청
  const onUpdate = async description => {
    try {
      const response = await cr.updateDescription(params.id, description)
      if(response.status === 200) {
        setBoard(prev => ({
          ...prev,
          description: response.data
        }))
        setOnButton(false)
      }
    } catch(e) {
      console.error('error :', e)
    }
  }

  // 게시판 대표음악 설정
  const setMusic = async (trackId) => {
    try {
      const response = await cr.changeTrack(board.id, trackId)
      if(response.status === 200) {
        setBoard(prev => ({
          ...prev,
          trackId: response.data
        }))
      }
    } catch(e) {
      console.error('error :', e)
    }
  }

  // 트랙 검색, 요청 함수
  const onSearchTrack = async (keyword, offsetRef, limitRef, loadingRef, allLoadedRef) => {
    console.log(keyword)
    if (loadingRef.current || allLoadedRef.current) return

    loadingRef.current = true

    try {
      const { data } = await ur.searchTracks({
        keyword,
        offset: offsetRef.current,
        limit: limitRef.current
      })

      console.log(data)

      setTrackList(prev => {
        const existingIds = new Set(prev.map(t => t.id))
        const filteredData = data.filter(t => !existingIds.has(t.id))
        return [...prev, ...filteredData]
      })

      offsetRef.current += limitRef.current

      console.log(offsetRef.current)

      if (data.length < limitRef.current) {
        allLoadedRef.current = true
      }
    } catch (err) {
      console.error(err)
    } finally {
      loadingRef.current = false
    }
  }

  // 게시판에 대한 요청
  const getBoardData = async () => {
    try {
      const response = await cr.getBoardData(params.id, pPage, nPage)
      if(response.status === 200) {
        const data = response.data
        console.log(data)
        setBoard(data.community)
        setPosts(data.posts)
        setNotices(data.notices)
        setPostPagination(data.postPagination)
        setNoticePagination(data.noticePagination)
        if(userInfo)
          isManager.current = data.community.creatorId === userInfo.id
      }
    } catch (e) {
      console.error('error :', e)
    }
  }

  // 마운트 시 데이터 요청
  useEffect(() => {
    getBoardData()
  }, [pPage, nPage])

  return (
    <>
      <Header />
      <div className="container">
        <BoardDetail
          setOnModal={setOnModal}
          isManager={isManager}
          board={board}
          posts={posts}
          notices={notices}
          postPagination={postPagination}
          noticePagination={noticePagination}
          onButton={onButton}
          setOnButton={setOnButton}
          onUpdate={onUpdate}
          onChangePostPage={onChangePostPage}
          onChangeNoticePage={onChangeNoticePage}
        />
        <TrackModalCommunity
          onModal={onModal}
          setOnModal={setOnModal}
          setMusic={setMusic}
          onSearchTrack={onSearchTrack}
          trackList={trackList}
          setTrackList={setTrackList}
        />
      </div>
      <Footer />
    </>
  )
}

export default BoardContainer