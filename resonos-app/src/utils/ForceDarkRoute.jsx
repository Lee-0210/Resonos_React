import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../components/admin/toggle/ThemeToggle';

const ForceDarkRoute = ({ children }) => {
  const { theme, setTheme, userTheme } = useTheme();
  const location = useLocation();

  const reviewPaths = [
    '/artists', '/albums', '/tracks', '/list/main',
    '/list/new-albums', '/list/hot-albums', '/list/new-tracks',
    '/list/hot-tracks', '/list/new-playlists', '/list/hot-playlists',
    '/search', '/search/artists', '/search/albums', '/search/tracks',
    '/search/users', '/search/playlists'
  ];

  useEffect(() => {
    if (reviewPaths.includes(location.pathname)) {
      if (theme !== 'dark') setTheme('dark');       // 강제 다크
    } else {
      if (theme !== userTheme) setTheme(userTheme); // 복원
    }
  }, [location.pathname, theme, userTheme]);

  return children;
};

export default ForceDarkRoute;
