import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css'; // Tailwind CSS가 포함된 파일을 import
import LoginContextProvider from './contexts/LoginContextProvider';
import { ThemeProvider } from './components/admin/toggle/ThemeToggle';
import { useEffect } from 'react';
import ForceDarkRoute from './utils/ForceDarkRoute';
import ReviewRoutes from './ReviewRoutes';
import ThemeRoutes from './ThemeRoutes';



const AppContent = () => {
  const location = useLocation();

  // ReviewRoutes에 해당하는 경로
  const reviewPaths = [
    '/artists', '/albums', '/tracks', '/list/main',
    '/list/new-albums', '/list/hot-albums', '/list/new-tracks',
    '/list/hot-tracks', '/list/new-playlists', '/list/hot-playlists',
    '/search', '/search/artists', '/search/albums', '/search/tracks',
    '/search/users', '/search/playlists'
  ];

  // 현재 경로가 ReviewRoutes인지 확인
  const isReviewRoute = reviewPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {isReviewRoute ? <ReviewRoutes /> : <ThemeRoutes />}
    </>
  );
};

const App = () => {

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <ThemeProvider>
          <ForceDarkRoute>
            <Routes>
              <Route path="/*" element={<AppContent />} />
            </Routes>
          </ForceDarkRoute>
        </ThemeProvider>
      </LoginContextProvider>
    </BrowserRouter>
  )
}

export default App