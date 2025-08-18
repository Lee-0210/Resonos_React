package com.cosmus.resonos.mapper.community;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.BoardPost;

@Mapper
public interface BoardPostMapper {
    // 전체 조회
    public List<BoardPost> list() throws Exception;
    // 조회
    public BoardPost select(Long id) throws Exception;
    // 삽입
    public int insert(BoardPost post) throws Exception;
    // 수정
    public int update(BoardPost post) throws Exception;
    // 삭제
    public int delete(Long id) throws Exception;
    // 커뮤니티
    public List<BoardPost> findByCommunity(Long communityId) throws Exception;
    // 어드민 통계용
    public int countAll() throws Exception;
    // 게시글 구하기
    public int countByUserId(Long userId);
    // 조회 + 좋아요 싫어요 수
    public BoardPost selectWithLikesDislikes(@Param("communityId") Long communityId, @Param("postId") Long postId) throws Exception;
  
    // 커뮤 main
    // 주요뉴스 (가장 화제글 3개 + 썸네일) - 예시: 조회수 기준
    public List<BoardPost> selectHotPosts(int limit);
    // 전체 게시글 조회
    public List<BoardPost> selectAll();
    // 인기글 (오늘기준 댓글 수, 오늘기준 좋아요 수 많은 거 10개)
    public List<BoardPost> selectPopularPosts();
    // 실시간 인기글 (시간당 댓글 수, 시간당 좋아요 수 상위 5개)
    public List<BoardPost> selectRealTimePopularPosts();
    // 검색
    public List<BoardPost> searchPosts(String query);
    // 카테고리별 게시글 조회
    public List<BoardPost> selectByCategoryId(@Param("categoryId") Long categoryId);
    // 공지사항 (매니저 작성글) - 예시로 5개만 가져오도록
    public List<BoardPost> selectNoticesByCategoryId(@Param("categoryId") Long categoryId, @Param("limit") int limit);
    // 게시판 대표 음악 설정
    public boolean setTrack(@Param("postId") Long postId, @Param("trackId") Long trackId) throws Exception;
    // 게시판 테이블 thumbnail_url 컬럼 추가
    public boolean setThumbnailUrl(@Param("postId") Long postId, @Param("thumbnailUrl") String thumbnailUrl) throws Exception;
    // 댓글 수 가져오기
    public int getCommentCount(Long postId) throws Exception;


}
