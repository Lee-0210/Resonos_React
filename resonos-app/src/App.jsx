import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'; // Tailwind CSS가 포함된 파일을 import
import LoginContextProvider from './contexts/LoginContextProvider';
import Track from './pages/review/Track';
import Album from './pages/review/Album';
import Artist from './pages/review/Artist';
import { ThemeProvider } from './components/admin/toggle/ThemeToggle';
import ThemeRoutes from './ThemeRoutes';
import { useEffect } from 'react';



// 범위 한정 css 적용 - 테스트 진행중

const ForceDarkRoute = ({ children }) => {
  useEffect(() => {
    // 항상 다크 모드 강제 적용
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.className = document.body.className
      .split(' ')
      .filter(c => c !== 'dark-mode' && c !== 'light-mode')
      .concat('dark-mode')
      .join(' ');
  }, []);

  return children;
};

const App = () => {

  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          {/* 리뷰 */}
          <Route path="/artists" element={
            <ForceDarkRoute>
              <Artist />
            </ForceDarkRoute>
          } />
          <Route path="/albums" element={
            <ForceDarkRoute>
              <Album />
            </ForceDarkRoute>
          } />
          <Route path="/tracks" element={
            <ForceDarkRoute>
              <Track />
            </ForceDarkRoute>
          } />
          <Route path='*' element={
            <ThemeProvider>
              <ThemeRoutes />
            </ThemeProvider>
          } />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}

export default App