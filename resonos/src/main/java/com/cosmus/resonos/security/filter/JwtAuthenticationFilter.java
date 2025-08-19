package com.cosmus.resonos.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.user.Users;
import com.cosmus.resonos.security.contants.SecurityConstants;
import com.cosmus.resonos.security.provider.JwtProvider;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final JwtProvider jwtProvider;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtProvider jwtProvider) {
      this.authenticationManager = authenticationManager;
      this.jwtProvider = jwtProvider;
      // 필터 URL 경로 설정 : /login
      setFilterProcessesUrl( SecurityConstants.LOGIN_URL );
  }

  /**
   * 🔐 인증 시도 메소드
   * : /login 경로로 (username, password) 요청하면 이 필터에서 로그인 인증을 시도합니다.
   */
  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
  throws AuthenticationException {
    log.info("username : " + request.getParameter("username") );
    log.info("password : " + request.getParameter("password") );
    log.info("rememberMe : " + request.getParameter("rememberMe") );

    // 요청 메시지에서 아이디, 비밀번호 추출
    String username = request.getParameter("username");
    String password = request.getParameter("password");
    String rememberMe = request.getParameter("remember-me");

    // 인증토큰 객체 생성
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
    authToken.setDetails(rememberMe != null && rememberMe.equals("true"));

    // 인증 (로그인)
    Authentication authentication = authenticationManager.authenticate(authToken);
    log.info("attempt 실행");

    log.info("authenticationManager : " + authenticationManager );
    log.info("authentication : " + authentication );
    log.info("인증 여부 isAuthenticated() : " + authentication.isAuthenticated() );

    // 인증 실패
    if( !authentication.isAuthenticated() ) {
        log.info("인증 실패 : 아이디 또는 비밀번호가 일치하지 않습니다.");
        response.setStatus(401);    // 401 Unauthorized : 인증 실패
    }

    // 인증 성공
    return authentication;
  }


  /**
   * ✅ 인증 성공 메소드
   * : attemptAuthentication() 호출 후,
   * 반환된 Authentication 객체가 인증된 것이 확인 되면 호출되는 메소드
   *
   * ➡ 💍 JWT
   * : 로그인 인증에 성공, JWT 토큰 생성
   *    Authorizaion 응답헤더에 jwt 토큰을 담아 응답
   *   { Authorizaion : Bearer + {jwt} }
  */
  @Override
  protected void successfulAuthentication(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain,
      Authentication authentication) throws IOException, ServletException {

    log.info("인증 성공!");
    CustomUser customUser = (CustomUser) authentication.getPrincipal();

    Users user = customUser.getUser();
    log.info("유저 정보 : {}", user);

    // 자동로그인 설정 확인
    boolean rememberMe = Boolean.TRUE.equals(authentication.getDetails());
    log.info("로그인 인증 성공 후 자동 로그인 확인 : {}", rememberMe);

    Long id = user.getId();
    String username = user.getUsername();
    List<String> roles = customUser.getAuthorities()
                                .stream()
                                .map( GrantedAuthority::getAuthority )
                                .collect( Collectors.toList() )
                                ;
    // 💍 JWT 생성
    String jwt = jwtProvider.createToken(String.valueOf(id), username, roles);

    // JWT 쿠키에 저장
    ResponseCookieBuilder builder = ResponseCookie.from("jwt", jwt)
                                          .httpOnly(true)
                                          .secure(true)
                                          .path("/")
                                          .sameSite("Strict");

    if(rememberMe) builder.maxAge(Duration.ofDays(7));

    ResponseCookie cookie = builder.build();
    response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    // Authorization 응답 헤더 세팅
    response.setStatus(200);

    // 👩‍💼 사용자 정보 body 세팅
    ObjectMapper ObjectMapper = new ObjectMapper();
    String jsonString = ObjectMapper.writeValueAsString(user);
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");
    // jsonStrin : "{ 'username' : 'aloha', 'name' : '사용자', ... }"
    PrintWriter printWriter = response.getWriter();
    printWriter.write(jsonString);
    printWriter.flush();
  }
}
