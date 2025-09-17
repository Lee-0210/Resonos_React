import React, { useState, useEffect } from 'react';
import StatusCards from '../../components/admin/second/StatusCards';
import MenuRows from '../../components/admin/second/MenuRows';
import { getAdminIndex } from '../../apis/admin';
import 'bootstrap/dist/css/bootstrap.min.css';
import QuickMenu from '../../components/admin/first/QuickMenu';
import ThemeToggle from '../../components/admin/first/ThemeToggle';


const AdminContainer = () => {
  // dashboard
  const [stats, setStats] = useState([
    { title: '회원', value: 0 },
    { title: '게시글', value: 0 },
    { title: '신고', value: 0 },
    { title: '블라인드', value: 0 },
  ]);
  // menurow
const menuData = [
  [ // 1번째 줄
    { link: '/admin/members', label: '회원 목록' },
    { link: '/admin/report', label: '게시글/신고' },
    { link: '/admin/music', label: '아티스트/앨범/곡' },
    { link: '#', label: '공연/이벤트' },
  ],
  [ // 2번째 줄
    { link: '#', label: '통계 대시보드' },
    { link: '/admin/role', label: '권한 관리' },
    { link: '/admin/AnP', label: 'API 키/쿼터' },
    { link: '/admin/PolicySetting', label: '설정' },
  ],
  [ // 3번째 줄
    { link: '/admin/badge', label: '조건 관리' },
    { link: '/admin/tags', label: '태그 관리' },
    { link: '/admin/vote', label: '태그 확인' },
    { link: '/admin/report/review', label: '설정' },
  ],
  [ // 4번째 줄
    { link: '/admin/notifications', label: '내용 작성' },
    { link: '/admin/notices', label: '내용 작성' },
    { link: '/admin/qna', label: 'QnA 관리' },
    { link: '/admin/report/review', label: '설정' },
  ]
];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAdminIndex();
        const data = response.data; // axios 반환값 내 실제 데이터
        setStats([
          { title: '회원', value: data.memberCount },
          { title: '게시글', value: data.postCount },
          { title: '신고', value: data.reportCount },
          { title: '블라인드', value: data.blindCount },
        ]);
      } catch (error) {
        console.error('관리자 통계 조회 실패:', error);
        // 필요하면 UI에 에러 표시 로직 추가
      }
    };

    fetchStats();
  }, []);
  return ( 
    <>
        <StatusCards stats={stats} />
        <MenuRows menuData={menuData} />
         <QuickMenu menuData={menuData} />
         <ThemeToggle />
    </>
  ) 
};

export default AdminContainer;
