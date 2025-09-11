import React, { useState, useEffect, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';

// 테마 컨텍스트 생성
const ThemeContext = createContext();

// 테마 프로바이더 컴포넌트
export const ThemeProvider = ({ children }) => {

  // const location = useLocation();

  // 초기 테마 상태 (localStorage에서 불러오거나 기본값은 'dark')
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme || 'dark';
    }
    return 'dark';
  });

  // useEffect(() => {
  //   const forceDarkRoutes = ["/albums", "/tracks", "/artists"];
  //   if (forceDarkRoutes.includes(location.pathname)) {
  //     if (theme !== "dark") {
  //       setTheme("dark");
  //       window.location.reload();
  //     }
  //   }
  // }, [location.pathname, theme]);

  // 테마 변경 시 HTML에 적용하고 localStorage에 저장
  useEffect(() => {
    // HTML 요소에 data-theme 속성 설정
    document.documentElement.setAttribute('data-theme', theme);

    // body 클래스 업데이트 (기존 클래스 유지하면서 테마 클래스만 변경)
    const currentClasses = document.body.className
      .split(' ')
      .filter(cls => cls !== 'dark-mode' && cls !== 'light-mode');

    const newClasses = [...currentClasses, `${theme}-mode`];

    document.body.className = newClasses.join(' ').trim();

    // localStorage에 저장
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);


  // 테마 토글 함수
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 테마 훅
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// 토글 버튼 컴포넌트
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        border: '1px solid var(--main-color)',
        background: 'none',
        color: 'var(--main-color)',
        borderRadius: '30px',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'var(--main-color)';
        e.target.style.color = 'var(--background-color)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'none';
        e.target.style.color = 'var(--main-color)';
      }}
    >
      <span style={{ fontSize: '16px' }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

// 메인 앱 컴포넌트
const App = () => {
  const { theme } = useTheme();

  // 인라인 CSS 변수 정의 (실제로는 외부 CSS 파일에서 가져옴)
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
:root {
  --main-color: #D4B97F;
  --silver-color: #fffbe6;
  --background-color: #181C23;
  --text-color: #fff;
  --card-bg: #181C23;
  --card-border: #D4B97F;
  --border-color: #2b2f36;
  --hover-bg: rgba(255, 255, 255, 0.04);

  /* 추가 변수 */
  --font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  --font-size-base: 16px;
  --font-size-large: 1.25rem;
  --font-size-small: 0.875rem;

  --btn-bg: var(--main-color);
  --btn-color: var(--text-color);
  --btn-hover-bg: #b5995e;

  --header-bg: var(--card-bg);
  --header-color: var(--main-color);

  --link-color: var(--main-color);
  --link-hover-color: #c9ab6d;

  --shadow-color: rgba(0, 0, 0, 0.25);
  --box-shadow: 0 4px 6px var(--shadow-color);
  --border-radius: 8px;
    --font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
  --font-size-base: 16px;
  --font-size-large: 1.25rem;
  --font-size-small: 0.875rem;

  --btn-background: var(--main-color);
  --btn-color: var(--text-color);
  --btn-border-radius: 6px;
  --btn-hover-background: #b3995d;

  --link-color: var(--main-color);
  --link-hover-color: #c7ad75;

  --card-padding: 1rem;
  --card-border-radius: 10px;
  --card-box-shadow: 0 4px 6px rgba(0,0,0,0.25);

  --border-width: 1px;
  --border-style: solid;

  --shadow-color: rgba(0,0,0,0.3);
  --transition-duration: 0.3s;
}

html[data-theme='light'] {
  --main-color: rgb(162, 99, 245);
  --silver-color: #333;
  --background-color: #f8f9fa;
  --commu-backColor: #f3f3f3ff;
  --text-color: #000!important;
  --card-bg: #ffffff;
  --card-border: #ddd;
  --border-color: #ccc;
  --hover-bg: rgba(0, 0, 0, 0.05);

  /* 마이페이지 */
  --card-color: #fff;
  --card-color2: #d3d3d3ff;

  /* 같은 방식으로 light 테마 변수를 오버라이드 */
  --btn-bg: var(--main-color);
  --btn-color: var(--text-color);
  --btn-hover-bg: #a17600;

  --header-bg: var(--card-bg);
  --header-color: var(--main-color);

  --link-color: var(--main-color);
  --link-hover-color: #866f00;

  --shadow-color: rgba(0, 0, 0, 0.15);
  --box-shadow: 0 4px 6px var(--shadow-color);
  --border-radius: 8px;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0;
  font-family: var(--font-family);
  font-size: var(--font-size-base);
}

/* 버튼 기본 스타일 */
button {
  background-color: var(--btn-bg);
  color: var(--btn-color);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

/* 헤더 스타일 */
header {
  background-color: transparent ;
  color: var(--header-color);
}

/* a 링크 스타일 */
a {
  color: var(--link-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--link-hover-color);
  text-decoration: underline;
}

/* 카드 컴포넌트 스타일 */
.card {
  background-color: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.card:hover {
  background-color: var(--hover-bg);
  border-color: var(--main-color);
}
  /* 폼 스타일 */
form {
  background-color: var(--card-bg);
  border-radius: var(--border-radius);
}

/* 입력창 스타일 */
input[type="text"],
input[type="email"],
input[type="password"],
textarea,
select {
  width: 100%;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  color: var(--text-color);
  font-size: var(--font-size-base);
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus,
textarea:focus,
select:focus {
  border-color: var(--main-color);
  outline: none;
}

/* 라벨 스타일 */
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}

/* 상태 메시지 (에러, 성공) */
.message {
  font-size: var(--font-size-small);
  margin-top: -0.5rem;
  margin-bottom: 1rem;
}

.message.error {
  color: red;
}

.message.success {
  color: var(--main-color);
}

/* 네비게이션 바 (예시) */
nav {
  background-color: transparent;
  border-bottom: 1px solid var(--card-border);
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

nav a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

nav a:hover {
  color: var(--main-color);
}

/* 반응형 그리드 예시 */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem 0;
}
.p { 
    color: var(--main-color);

}

    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <ThemeToggle />
  );
};

// 최종 앱을 ThemeProvider로 감싸기
const AppWithTheme = () => {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
};

export default AppWithTheme;