🔧 기술 스택 (Tech Stack)
## 🛠 기술 스택
- **Backend**: Spring Boot (MVC, Security)
- **Database**: MyBatis (DB 매퍼)
- **Frontend**: React (SPA, Vite)
- **UI**: Tailwind CSS, Bootstrap5, CKEditor5, Chart.js
- **Auth**: JWT, Spring Security, OAuth2 소셜 로그인 (Kakao, Naver, Google)
- **Infra**: REST API 서버, 내장 Tomcat
- **External API**: Spotify, YouTube API
- **Scheduler**: 자동화 배지 지급


📝 주요 기능 (Features)
1. 커뮤니티 (Community Board)
- 게시판 생성/조회/삭제
- 게시판 별 대표 음악(track) 설정 (Spotify 연동)
- 게시판 소개글 수정 (관리자/매니저 권한)

3. 게시글 (Post)
- 회원/비회원 게시글 작성
- 썸네일, 대표 음악 ID 지원
- 게시글 수정/삭제 (권한 및 비밀번호 기반 검증)
- 게시글 조회: 조회수 증가 로직 (쿠키 / 세션 기반 중복 방지)
- 게시글 신고 (로그인 필요), 관리자 검토 프로세스 포함

3. 댓글 (Comment)
- 회원/비회원 댓글 작성 및 수정/삭제
- 대댓글(트리 구조) 지원
- 댓글 좋아요/싫어요 기능
- 비로그인 사용자는 닉네임+비밀번호 기반 관리 (암호화 저장)

4. 투표 (Vote)
- 게시글에 투표 생성 가능 (항목 2~7개 제한)
- 투표 종료일 지정 (최소 3시간 이후)
- 투표 진행/완료 상태 관리
- 사용자 투표 여부 체크 (중복 방지)
- 투표 결과 그래프(Chart.js 시각화)

5. 좋아요 / 싫어요 (LikesDislikes)
- 게시글 및 댓글 단위 좋아요/싫어요
- 회원 단위 Reaction 중복 방지 처리

6. 검색 & 메인 페이지
- 커뮤니티/게시글 통합 검색 (더보기/페이징 기능)
- 메인 페이지 위젯:
- 화제글(조회수 상위)
- 최신글, 인기글 (좋아요/댓글 기반), 실시간 인기글 (72시간 기준), 게시판 순위 (글 수 기준 Top7), 신설 게시판

7. 관리자(Admin) 기능
- 사용자 관리, 회원 권한 변경
- 배지, 태그, 정책, 신고 내역 관리

🚀 향후 확장성 (Roadmap)
- 실시간 기능 강화
- WebSocket(STOMP) 기반 투표 실시간 반영
- 실시간 댓글 알림 / 채팅 기능
- 추천/개인화 서비스
- 게시판/게시글 추천 알고리즘 (최근 활동 기반)
- 유저 취향 기반 음악/게시글 추천 (Spotify API 활용 가능)
- 게시판/커뮤니티 팔로우 기능
- 신고 게시글 자동 처리 룰 (스팸 필터링)
- 관리자용 대시보드에 실시간 분석(Charts, Graphs)









![Image](https://github.com/user-attachments/assets/bd669b2b-1996-4467-b3a7-971e9b7a52ff)
![Image](https://github.com/user-attachments/assets/debc3d7d-cff3-41d2-be44-3083f9f3065d)
![Image](https://github.com/user-attachments/assets/73b99852-8607-432e-968e-11d8e3b2d4c0)
![Image](https://github.com/user-attachments/assets/eaa059af-b884-4823-bcc8-e5ea78c81775)
![Image](https://github.com/user-attachments/assets/d6db5e23-0cf5-493f-8f18-db62633ff622)
![Image](https://github.com/user-attachments/assets/472c9b1d-1547-48da-b859-474c7da30082)
![Image](https://github.com/user-attachments/assets/2d9ccfbb-8b94-42b1-bf53-2f70743b3712)
![Image](https://github.com/user-attachments/assets/d3f1204d-08c1-440a-84ab-8980edb639e9)
![Image](https://github.com/user-attachments/assets/f6753838-afe2-4250-95c6-5814b66dc9ee)
![Image](https://github.com/user-attachments/assets/7c49e4ce-648a-4de3-91e2-ca0c89b5abae)
![Image](https://github.com/user-attachments/assets/61812d19-a8bf-4eda-8d38-c594871ecb7c)
![Image](https://github.com/user-attachments/assets/f61cf7dd-5cb5-4c13-877d-af821a97abdf)
![Image](https://github.com/user-attachments/assets/d61c8135-15bc-477f-b373-b5d491b02eb7)
![Image](https://github.com/user-attachments/assets/62a4397b-c81c-4b67-aa55-6b65ba378a01)
![Image](https://github.com/user-attachments/assets/3099e6ae-f832-480a-b30d-f97a92b62cda)
![Image](https://github.com/user-attachments/assets/9f70da41-0782-4498-b6c3-5a8dfb5b1405)
![Image](https://github.com/user-attachments/assets/07b4ddbb-511d-408f-b868-9d01b736a7cb)
![Image](https://github.com/user-attachments/assets/570a8ef7-f862-4cec-8f70-ea2533460edd)
![Image](https://github.com/user-attachments/assets/cf5b65db-2c7b-43e5-8fd5-a4fee978c828)
![Image](https://github.com/user-attachments/assets/918050b9-8f21-41b1-aefd-b2ca0862e53c)
![Image](https://github.com/user-attachments/assets/2c368398-9205-4968-9b51-8e09e93e20c5)
![Image](https://github.com/user-attachments/assets/4b48a2c1-7b9f-4051-a8d4-a5e34f65e7c5)
![Image](https://github.com/user-attachments/assets/a811649f-9672-4f85-bae8-9e57be375c32)
![Image](https://github.com/user-attachments/assets/30e56cde-440a-4bcb-920d-25946f52a065)
![Image](https://github.com/user-attachments/assets/b2c07274-14cb-4fa3-a331-3da87996227a)
![Image](https://github.com/user-attachments/assets/e17768cd-8d1b-4f8a-a214-1f18de7f2aa4)

![Image](https://github.com/user-attachments/assets/1db7cba2-b2e1-4a8b-8219-71e2be0d2c3b)
![Image](https://github.com/user-attachments/assets/456c31a0-96d5-4bde-89f3-00395cc8d809)
![Image](https://github.com/user-attachments/assets/4642f5e3-44f7-4fc4-9461-50b69f11b4bf)
![Image](https://github.com/user-attachments/assets/b3983335-6cb6-4d8f-af89-510f89e7ee47)
![Image](https://github.com/user-attachments/assets/ac5d15cd-a34c-4b00-9008-75427cc1a562)
![Image](https://github.com/user-attachments/assets/79bad710-510f-4739-96c7-87105e4bf81a)
