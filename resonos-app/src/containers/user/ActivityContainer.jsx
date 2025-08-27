import React, { useEffect, useState } from 'react'
import Activity from '../../components/user/Activity'
import * as ur from '../../apis/user'
import {MySwal} from '../../apis/alert'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import MypageTab from '../../components/user/MypageTab';
import ActivityCommu from '../../components/user/ActivityCommu';

const ActivityContainer = () => {

  /* 리뷰 데이터 */
  const [utl, setUtl] = useState({});
  const [countAReview, setCountAReview] = useState();
  const [countLaReview, setCountLaReview] = useState();
  const [countLtReview, setCountLtReview] = useState();
  const [countTReview, setCountTReview] = useState();
  const [aReviewList, setAReviewList] = useState([]);
  const [laReviewList, setLaReviewList] = useState([]);
  const [tReviewList, setTReviewList] = useState([]);
  const [ltReviewList, setLtReviewList] = useState([]);

  /* 커뮤니티 데이터 */
  const [boardList, setBoardList] = useState([])
  const [boardCount, setBoardCount] = useState()
  const [postList, setPostList] = useState([])
  const [postCount, setPostCount] = useState()
  const [commentList, setCommentList] = useState([])
  const [commentCount, setCommentCount] = useState()
  const [utlCommu, setUtlCommu] = useState({})

  const [user, setUser] = useState({});
  const [lastPath, setLastPath] = useState();
  const [active, setActive] = useState(true)

  const navigate = useNavigate()


  // 커뮤니티 활동 검색, 요청 함수
  const onSearchCommunityData = async (keyword, offsetRef, limitRef, loadingRef, allLoadedRef, type) => {

    loadingRef.current = true

    try {
      const { data } = await ur.loadMoreUserCommunityData({
        keyword,
        offset: offsetRef.current,
        limit: limitRef.current,
        type
      })

      // console.log('data :', data)

      switch(type) {
        case 'board':
          setBoardList(prev => {
            const existingIds = new Set(prev.map(board => board.id))
            const filteredData = data.filter(board => !existingIds.has(board.id))
            return [...prev, ...filteredData]
          })
          break;
        case 'post':
          setPostList(prev => {
            const existingIds = new Set(prev.map(post => post.id))
            const filteredData = data.filter(post => !existingIds.has(post.id))
            return [...prev, ...filteredData]
          })
          break;
        case 'comment':
          setCommentList(prev => {
            const existingIds = new Set(prev.map(comment => comment.id))
            const filteredData = data.filter(comment => !existingIds.has(comment.id))
            return [...prev, ...filteredData]
          })
          break;
        default:
          break;
      }

      offsetRef.current += limitRef.current

      if (data.length < limitRef.current) {
        allLoadedRef.current = true
      }
    } catch (err) {
      console.error(err)
    } finally {
      loadingRef.current = false
    }
  }

  // 리뷰 검색, 요청 함수
  const onSearchReview = async (keyword, offsetRef, limitRef, loadingRef, allLoadedRef, type) => {
    if (loadingRef.current || allLoadedRef.current) return

    loadingRef.current = true

    try {
      const { data } = await ur.loadMoreUserReviews({
        keyword,
        offset: offsetRef.current,
        limit: limitRef.current,
        type
      })

      switch(type) {
        case 'ar':
          setAReviewList(prev => {
            const existingIds = new Set(prev.map(t => t.id))
            const filteredData = data.filter(t => !existingIds.has(t.id))
            return [...prev, ...filteredData]
          })
          break;
        case 'lar':
          setLaReviewList(prev => {
            const existingIds = new Set(prev.map(t => t.id))
            const filteredData = data.filter(t => !existingIds.has(t.id))
            return [...prev, ...filteredData]
          })
          break;
        case 'tr':
          setTReviewList(prev => {
            const existingIds = new Set(prev.map(t => t.id))
            const filteredData = data.filter(t => !existingIds.has(t.id))
            return [...prev, ...filteredData]
          })
          break;
        case 'ltr':
          setLtReviewList(prev => {
            const existingIds = new Set(prev.map(t => t.id))
            const filteredData = data.filter(t => !existingIds.has(t.id))
            return [...prev, ...filteredData]
          })
          break;
        default:
          break;
      }

      offsetRef.current += limitRef.current

      if (data.length < limitRef.current) {
        allLoadedRef.current = true
      }
    } catch (err) {
      console.error(err)
    } finally {
      loadingRef.current = false
    }
  }

  // 유저의 커뮤니티 데이터 요청
  const getUsersCommunity = async () => {
    try {
      const response = await ur.getUserCommunity()
      if(response.status === 200) {
        const data = response.data
        // console.log('data :', data)
        setBoardList(data.boardList)
        setBoardCount(data.boardCount)
        setPostList(data.postList)
        setPostCount(data.postCount)
        setCommentList(data.commentList)
        setCommentCount(data.commentCount)
        setUtlCommu(data.utl)
      }
    } catch(e) {
      console.error('error :', e)
    }
  }

  // 유저의 리뷰 데이터 요청
  const getUsersReviews = async () => {
    try {
      const response = await ur.getUserReviews()
      if(response.status === 200) {
        const data = response.data
        // console.log('data :', data)
        setUtl(data.utl);
        setCountAReview(data.countAReview);
        setCountLaReview(data.countLaReview);
        setCountLtReview(data.countLtReview);
        setCountTReview(data.countTReview);
        setAReviewList(data.aReviewList);
        setLaReviewList(data.laReviewList);
        setLtReviewList(data.ltReviewList);
        setTReviewList(data.tReviewList);
        setUser(data.user);
        setLastPath(data.lastPath);
      }
    } catch(e) {
      if(e.status === 401) {
        MySwal.fire({
          position: "center",
          icon: "warning",
          title: "로그인이 필요한 서비스입니다.",
          showConfirmButton: false,
          timer: 800,
          customClass: {
            popup: 'follow-popup',
            icon: 'success-icon',
            title: 'alert-title'
          }
        })
        setTimeout(() => {
          navigate('/login')
        }, 900)
      }
      console.log('error :', e)
    }
  }

  // 마운트 시 초기 데이터 요청
  useEffect(() => {
    if(active == true)
      getUsersReviews()
    else
      getUsersCommunity()
  }, [active])

  return (
    <>
      <Header />
      <div className="container">
        <main className="con con-activity position-relative">
          {/* 왼쪽 리모컨 */}
          <MypageTab lastPath={lastPath}/>

          {/* 전환 탭 */}
          <div className="tab-area">
            <button
              className={`${active ? 'active' : ''}`}
              type="button"
              onClick={() => setActive(true)}
              >리뷰</button>
            <button
              className={`${!active ? 'active' : ''}`}
              type="button"
              onClick={() => setActive(false)}
            >커뮤니티</button>
          </div>
          {
            active
            ?
            <Activity
              utl={utl}
              countAReview={countAReview}
              countLaReview={countLaReview}
              countLtReview={countLtReview}
              countTReview={countTReview}
              aReviewList={aReviewList}
              laReviewList={laReviewList}
              ltReviewList={ltReviewList}
              tReviewList={tReviewList}
              setAReviewList={setAReviewList}
              setLaReviewList={setLaReviewList}
              setLtReviewList={setLtReviewList}
              setTReviewList={setTReviewList}
              user={user}
              onSearchReview={onSearchReview}
            />
            :
            <ActivityCommu
              boardList={boardList}
              setBoardList={setBoardList}
              boardCount={boardCount}
              postList={postList}
              setPostList={setPostList}
              postCount={postCount}
              commentList={commentList}
              setCommentList={setCommentList}
              commentCount={commentCount}
              utlCommu={utlCommu}
              onSearchCommunityData={onSearchCommunityData}
            />
          }
        </main>
      </div>
      <Footer />
    </>
  )
}

export default ActivityContainer