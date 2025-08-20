package com.cosmus.resonos.service.community;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.Community;
import com.github.pagehelper.PageInfo;

public interface CommunityService extends BaseService<Community> {


    boolean deleteAll() throws Exception;
    // 게시판 대표 음악 설정
    // Long 에서 boolean 으로 수정함
    boolean setTrack(@Param("communityId") Long communityId, @Param("trackId") String trackId) throws Exception;

    // 한줄 소개 설정
    boolean setIntro(@Param("communityId") Long communityId, @Param("intro") String intro) throws Exception;

    // 게시판 순위 Top5 - communityService
    List<Community> getTopCommunities(int limit) throws Exception;

    // 신설 게시판 - communityService
    List<Community> getNewCommunities(int limit) throws Exception;

    // 커뮤니티 id 기반 생성자 정보 조회
    Community selectById(String id) throws Exception;

    // 모든 커뮤니티 조회
    List<Community> getAllCommunities() throws Exception;

    // 모든 커뮤니티 조회 + 키워드
    PageInfo<Community> searchCommunities(@Param("query") String query, @Param("page") int page, @Param("size") int size) throws Exception;
    // 모든 커뮤니티 조회 + 키워드 + 커뮤니티별 작성된 boardPost count
    PageInfo<Community> searchCommunities2(@Param("query") String query, @Param("page") int page, @Param("size") int size) throws Exception;

    /* 마이페이지 */
    // 유저의 커뮤니티 조회
    public List<Community> getUsersCommunities(Long userId) throws Exception;

}