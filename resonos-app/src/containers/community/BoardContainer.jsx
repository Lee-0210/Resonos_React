import React, { useContext, useEffect, useRef, useState } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import BoardDetail from '../../components/community/Board'
import * as cr from '../../apis/community'
import * as ur from '../../apis/user'
import { useParams } from 'react-router-dom'
import TrackModalCommunity from '../../components/user/modal/TrackModalCommunity'
import { LoginContext } from '../../contexts/LoginContextProvider'

const BoardContainer = () => {

  const {userInfo} = useContext(LoginContext)

  // 트랙
  const [onModal, setOnModal] = useState(false)
  const [trackList, setTrackList] = useState([])

  // 게시판
  const [board, setBoard] = useState()
  const [posts, setPosts] = useState([])
  const [notices, setNotices] = useState([])

  const isManager = useRef(false)

  const params = useParams()

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
      const response = await cr.getBoardData(params.id)
      if(response.status === 200) {
        const data = response.data
        console.log(data)
        setBoard(data.community)
        setPosts(data.posts)
        setNotices(data.notices)
        isManager.current = data.community.creatorId === userInfo.id
      }
    } catch (e) {
      console.error('error :', e.response)
    }
  }

  // 마운트 시 데이터 요청
  useEffect(() => {
    getBoardData()
  }, [])

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