import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './index.css'; // Tailwind CSS가 포함된 파일을 import
import AdminIndex from './pages/admin/Index';
import Tailwindtest from './tailwind/Test';
import Home from './pages/Home';
import Login from './pages/Login';
import Mypage from './pages/user/Mypage';
import AdminMembers from './pages/admin/AdminMembersPage';
import AdminMemberDetail from './pages/admin/AdminMemberDetail';
import Edit from './pages/user/Edit';
import Join from './pages/Join';
import AdminTest from './pages/admin/TestContainer'
import Playlist from './pages/user/Playlist';
import PlaylistDetail from './pages/user/PlaylistDetail';
import CreatePlaylist from './pages/user/CreatePlaylist';
import AdminReportsContainer from './pages/admin/AdminReportsPage';
import AdminMusicContainer from './containers/admin/AdminMusicContainer';
import Activity from './pages/user/activity';
import AdminRoleManagePage from './pages/admin/AdminRoleManagePage';
import AdminAnPManagePage from './pages/admin/AdminAnPManagePage';
import AdminPnSManagePage from './pages/admin/AdminPnSManagePage'
import AdminBadgeManagePage from './pages/admin/AdminBadgeManagePage';
import BadgeUsersPage from './pages/admin/BadgeUsersPage';
import AdminTagManagePage from './pages/admin/AdminTagManagePage';
import VoteStatsPage from './pages/admin/VoteStatsPage';
import ReviewReportManagePage from './pages/admin/ReviewReportManagePage';
import AdminNotificationPage from './pages/admin/AdminNotificationPage';
import Notification from './pages/user/Notification';
import LikedMusic from './pages/user/LikedMusic';
import FollowArtist from './pages/user/FollowArtist';
import FollowUser from './pages/user/FollowUser';
import AdminNoticePage from './pages/admin/AdminNoticePage';
import AdminQnAPage from './pages/admin/AdminQnAPage';
import AdminLayout from './layouts/AdminLayout'; // /admin 경로 css 전역으로 적용
import Badge from './pages/user/Badge';
import Security from './pages/user/Security';
import SetNotification from './pages/user/SetNotification';
import FindId from './pages/user/FindId';
import FindPw from './pages/user/FindPw';
import Index from './pages/community/Index';
import Board from './pages/community/Board';
import CommuSearch from './pages/community/CommuSearch';
import SearchMore from './pages/community/SearchMore';
import Post from './pages/community/Post';
import CreateUpdate from './pages/community/CreateUpdate';
import App3 from './components/websocket/App3';

const ThemeRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Tailwindtest />} />


      {/* 공용 */}
      <Route path='/login' element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/find-id" element={<FindId />} />
      <Route path="/find-pw" element={<FindPw />} />
      {/* 유저 */}
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/users/:id" element={<Mypage />} />
      <Route path="/users/edit" element={<Edit />} />
      <Route path="/users/activities" element={<Activity />} />
      <Route path="/users/notifications" element={<Notification />} />
      <Route path="/users/playlists" element={<Playlist />} />
      <Route path="/users/:id/playlists" element={<Playlist />} />
      <Route path="/playlists/new" element={<CreatePlaylist />} />
      <Route path="/playlists/:id" element={<PlaylistDetail />} />
      <Route path="/users/liked-music" element={<LikedMusic />} />
      <Route path="/users/:id/liked-music" element={<LikedMusic />} />
      <Route path="/users/follow-artists" element={<FollowArtist />} />
      <Route path="/users/:id/follow-artists" element={<FollowArtist />} />
      <Route path="/users/follow-users" element={<FollowUser />} />
      <Route path="/users/:id/follow-users" element={<FollowUser />} />
      <Route path="/users/badges" element={<Badge />} />
      <Route path="/users/security" element={<Security />} />
      <Route path="/users/notifications/status" element={<SetNotification />} />

      {/* 관리자 - 유저 관리 경로 */}
      <Route path="/admin" element={<AdminLayout><AdminIndex /></AdminLayout>} />
      <Route path="/admin/members" element={<AdminLayout><AdminMembers /></AdminLayout>} />
      <Route path="/admin/members/logs" element={<AdminLayout><AdminMemberDetail /></AdminLayout>} />
      <Route path="/admin/test" element={<AdminLayout><AdminTest /></AdminLayout>} />
      <Route path="/admin/report" element={<AdminLayout><AdminReportsContainer /></AdminLayout>} />
      <Route path="/admin/music" element={<AdminLayout><AdminMusicContainer /></AdminLayout>} />
      <Route path="/admin/role" element={<AdminLayout><AdminRoleManagePage /></AdminLayout>} />
      <Route path="/admin/AnP" element={<AdminLayout><AdminAnPManagePage /></AdminLayout>} />
      <Route path="/admin/PolicySetting" element={<AdminLayout><AdminPnSManagePage /></AdminLayout>} />
      <Route path="/admin/Badge" element={<AdminLayout><AdminBadgeManagePage /></AdminLayout>} />
      <Route path="/admin/badge/:badgeId/users" element={<AdminLayout><BadgeUsersPage /></AdminLayout>} />
      <Route path="/admin/tags" element={<AdminLayout><AdminTagManagePage /></AdminLayout>} />
      <Route path="/admin/vote" element={<AdminLayout><VoteStatsPage /></AdminLayout>} />
      <Route path="/admin/report/review" element={<AdminLayout><ReviewReportManagePage /></AdminLayout>} />
      <Route path="/admin/notifications" element={<AdminLayout><AdminNotificationPage /></AdminLayout>} />
      <Route path="/admin/notices" element={<AdminLayout><AdminNoticePage /></AdminLayout>} />
      <Route path="/admin/qna" element={<AdminLayout><AdminQnAPage /></AdminLayout>} />
      <Route path="/admin/app3" element={<AdminLayout><App3 /></AdminLayout>} />

      {/* 자유 커뮤니티 */}
      {/* 커뮤니티 url 은 /community 로 시작 */}
      <Route path="/community" element={<Index />} />
      <Route path="/community/boards/:id" element={<Board />} />
      <Route path="/community/search" element={<CommuSearch />} />
      <Route path='/community/boards/:boardId/posts/:postId' element={<Post />} />
      <Route path='/community/edit/boards/:boardId/posts/:postId' element={<CreateUpdate />} />
      <Route path='/community/create/boards/:boardId' element={<CreateUpdate />} />
      <Route path="/community/search/more" element={<SearchMore />} />
    </Routes>
  )
}

export default ThemeRoutes