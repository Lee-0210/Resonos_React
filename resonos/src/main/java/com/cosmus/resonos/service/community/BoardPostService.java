package com.cosmus.resonos.service.community;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.BoardPost;
import com.github.pagehelper.PageInfo;

public interface BoardPostService {
    // 전체 조회
    public List<BoardPost> list() throws Exception;
    // 조회
    public BoardPost select(Long id) throws Exception;
    // 삽입
    public boolean insert(BoardPost post) throws Exception;
    // 수정
    public boolean update(BoardPost post) throws Exception;
    // 삭제
    public boolean delete(Long id) throws Exception;
    // 커뮤니티
    public List<BoardPost> findByCommunity(Long communityId) throws Exception;
    // 어드민 통계용
    public int countAll() throws Exception;
    // 조회 + 좋아요 싫어요 수
    public BoardPost selectWithLikesDislikes(@Param("communityId") Long communityId, @Param("postId") Long postId) throws Exception;
    
    // 커뮤 main
    // 주요뉴스 (가장 화제글 3개 + 썸네일) - 예시: 조회수 기준
    public List<BoardPost> getHotPosts(int limit) throws Exception;
    // 페이징 처리 list
    public PageInfo<BoardPost> list(int pageNum, int pageSize) throws Exception;
    // 인기글 (오늘기준 댓글 수, 오늘기준 좋아요 수 많은 거 10개)
    public PageInfo<BoardPost> getPopularPosts(int pageNum, int pageSize) throws Exception;
    // 실시간 인기글 (시간당 댓글 수, 시간당 좋아요 수 상위 5개)
    public PageInfo<BoardPost> getRealTimePopularPosts(int pageNum, int pageSize) throws Exception;
    // 검색 키워드가 포함된 게시글 검색
    public PageInfo<BoardPost> searchPosts(String query, int pageNum, int pageSize) throws Exception;
    // 해당 게시판의 게시글 목록 가져오기 (페이징 처리)
    public PageInfo<BoardPost> listByCategoryId(Long categoryId, int pageNum, int pageSize) throws Exception;
    // 공지사항 (매니저 작성글) - 예시로 5개만 가져오도록
    public List<BoardPost> getNoticesByCategoryId(Long categoryId, int limit) throws Exception;
}
