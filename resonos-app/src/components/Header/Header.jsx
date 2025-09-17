import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { LoginContext } from '../../contexts/LoginContextProvider';
import $ from 'jquery';
import { MySwal } from '../../apis/alert'
import { logout } from '../../apis/user';
import { useTheme } from '../admin/toggle/ThemeToggle';

const Header = () => {
  const location = useLocation();
  const { isLogin, userInfo, path } = useContext(LoginContext)
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const allowedPaths = ["/community", "/join", "/login"];
  const showToggle = allowedPaths.some(path =>
    location.pathname.includes(path)
  );

  useEffect(() => {
    const mainMenu = $(".menu-group > .header-menu-wrapper");
    // mouseenter
    mainMenu.on("mouseenter", () => {
      $(".sub").stop(true, true).slideDown();
    });

    // mouseleave
    mainMenu.on("mouseleave", () => {
      $(".sub").stop(true, true).slideUp();
    });

    // cleanup
    return () => {
      mainMenu.off("mouseenter");
      mainMenu.off("mouseleave");
    };
  }, []);

  // 로그인 버튼 클릭 시 현재 페이지 기억
  useEffect(() => {
    const loginButton = document.getElementById('login');
    if (loginButton) {
      loginButton.addEventListener('click', e => {
        e.preventDefault();
        sessionStorage.setItem('returnTo', location.pathname + location.search);
        navigate('/login')
        // window.location.href = '/login';
      });
    }
  }, [location]);

  // 검색 유효성 검사
  const validateSearch = (e) => {
    e.preventDefault();
    const trimmed = searchValue.trim();

    if (trimmed.length === 0) {
      alert("검색어를 입력하세요.");
      return;
    }

    if (path === 'community')
      navigate(`/community/search?q=${encodeURIComponent(trimmed)}`);
    else
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: "로그아웃 하시겠습니까?",
      html: '<p class="alert-text">자동 로그인이 해제됩니다.</p>',
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      reverseButtons: false,
      customClass: {
        popup: 'follow-popup',
        icon: 'warning-icon',
        title: 'alert-title',
        text: 'alert-text',
        confirmButton: 'alert-button',
        cancelButton: 'alert-cancle-button'
      }
    })

    if (result.isConfirmed) {
      await fetch('/logout', { method: 'POST', credentials: 'include' });
      logout()
      sessionStorage.removeItem('isLogin');
      sessionStorage.removeItem('roles');
      sessionStorage.removeItem('userInfo');
      localStorage.removeItem('rememberId');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('username');
      window.location.href = '/login';
    }
  }

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg py-0">
        <div className="container-fluid" style={{ maxWidth: '1440px' }}>
          <div className="d-flex justify-content-start align-items-center">
            {/* 위치 바꾸기
                            TODO: 컨테이너에서 prpos 내려줘야 함
                        */}
            {
              path !== 'community'
                ?
                <>
                  <Link className="navbar-brand d-flex align-items-center" to="/list/main">
                    <img src="/img/resonosPlusLogo.png" alt="Main Page Logo" className="header-logo-img" />
                  </Link>
                  <Link className="navbar-brand d-flex align-items-center" to="/community">
                    <img src="/img/resonosLogo.png" alt="Sub Page Logo" className="header-logo-img-sub" />
                  </Link>
                </>
                :
                <>
                  <Link className="navbar-brand d-flex align-items-center" to="/community">
                    <img src="/img/resonosLogo.png" alt="Main Page" className="header-logo-img" />
                  </Link>
                  <Link className="navbar-brand d-flex align-items-center" to="/list/main">
                    <img src="/img/resonosPlusLogo.png" alt="LogoSub Page Logo" className="header-logo-img-sub" />
                  </Link>
                </>
            }
            <div className="menu-group d-flex position-relative ms-5">

              {
                path !== 'community'
                  ?
                  <>
                    {/* 앨범 메뉴 + 하단 메뉴 */}
                    <li className="header-menu-wrapper">
                      <Link to="/list/new-albums" className="submenu-item" style={{ fontSize: '1.6rem', color: 'var(--text-color)' }}>앨범</Link>
                      <ul className="header-submenu d-flex flex-column justify-content-center">
                        <li className="header-menu-wrapper sub"><Link to="/list/new-albums">최신 앨범</Link></li>
                        <li className="header-menu-wrapper sub"><Link to="/list/hot-albums">인기 앨범</Link></li>
                      </ul>
                    </li>

                    {/* 트랙 메뉴 + 하단 메뉴 */}
                    <li className="header-menu-wrapper position-relative">
                      <Link to="/list/new-tracks" className="submenu-item" style={{ fontSize: '1.6rem', color: 'var(--text-color)' }}>트랙</Link>
                      <ul className="header-submenu d-flex flex-column justify-content-center">
                        <li className="header-menu-wrapper sub"><Link to="/list/new-tracks">최신 트랙</Link></li>
                        <li className="header-menu-wrapper sub"><Link to="/list/hot-tracks">인기 트랙</Link></li>
                      </ul>
                    </li>

                    {/* 플레이리스트 메뉴 + 하단 메뉴 */}
                    <li className="header-menu-wrapper position-relative">
                      <Link to="/list/new-playlists" className="submenu-item" style={{ fontSize: '1.6rem', color: 'var(--text-color)' }}>플레이리스트</Link>
                      <ul className="header-submenu d-flex flex-column justify-content-center">
                        <li className="header-menu-wrapper sub"><Link to="/list/new-playlists">최신 플레이리스트</Link></li>
                        <li className="header-menu-wrapper sub"><Link to="/list/hot-playlists">인기 플레이리스트</Link></li>
                      </ul>
                    </li>
                  </>
                  :
                  <>
                    <li className="header-menu-wrapper position-relative">
                      <Link
                        to="/community/search/more?type=board&q=&page=1"
                      >
                        전체 게시판
                      </Link>
                    </li>
                  </>
              }
              <li className="header-menu-wrapper position-relative">
                <Link to="/todo/1:1문의">
                  1:1문의
                </Link>
              </li>
            </div>
          </div>

          <div className="d-flex justify-content-end align-items-center header-gap mt-4 mb-4 gap-4" id="mainNav">

            <form className="position-relative d-flex align-items-center mb-0" style={{ width: '300px' }} onSubmit={validateSearch}>
              <input
                type="search"
                name="q"
                className="form-control search-box"
                placeholder={`${path === 'community' ? '게시판, 게시글...' : '앨범, 트랙, 아티스트...'}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button type="submit" className="btn p-0 border-0 bg-transparent header-search-btn"
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
                <i className="bi bi-search header-search-icon"></i>
              </button>
            </form>

            <div className="navbar-nav d-flex flex-row justify-content-end align-items-center header-gap gap-3">
              {!isLogin ? (
                // 비로그인 상태
                <>
                  <div className="nav-item ms-lg-2">
                    <Link id="toLogin" to="/login" className="btn btn-outline-gold">로그인</Link>
                  </div>
                  <div className="nav-item ms-2">
                    <Link to="/join" className="btn btn-outline-gold">회원가입</Link>
                  </div>
                </>
              ) : (
                // 로그인 상태
                <>
                  <div className="dropdown">
                    <a href="#" className="nav-link p-0" data-bs-toggle="dropdown" aria-expanded="false" style={{ lineHeight: 0 }}>
                      <i className="bi bi-bell-fill" style={{ fontSize: '24px', color: '#B1B1B1' }}></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" style={{ background: '#181C23' }}>
                      <li><a className="dropdown-item" href="#">알림1</a></li>
                      <li><a className="dropdown-item" href="#">알림2</a></li>
                      <li><a className="dropdown-item" href="#">알림3</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="/users/notifications">전체 알림 보기</Link></li>
                    </ul>
                  </div>
                  <div className="flex-shrink-0 dropdown profile-dropdown">
                    <a href="#" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={userInfo?.profileImage || "/img/profileImg.png"} alt="프로필 이미지" width="32" height="32" className="rounded-circle" />
                    </a>
                    <ul className="dropdown-menu text-small shadow" style={{ background: '#181C23' }}>
                      <li><Link className="dropdown-item" to="/users/mypage">마이페이지</Link></li>
                      <li><Link className="dropdown-item" to="/users/notifications/status">환경설정</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <form action="/logout" method="post">
                          <button type="button" className="dropdown-item" onClick={handleLogout}>로그아웃</button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            {/* <ThemeToggle /> */}
            {showToggle && (
              <button
                className="btn"
                onClick={toggleTheme}>
                <span style={{ fontSize: '16px' }}>
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header >
  )
}

export default Header
