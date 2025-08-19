package com.cosmus.resonos.mapper.community;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.Community;

@Mapper
public interface CommunityMapper extends BaseMapper<Community> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
    // 게시판 대표 음악 설정
    // boolean -> int 수정함
    int setTrack(@Param("categoryId") Long categoryId, @Param("trackId") Long trackId) throws Exception;
    // 한줄 소개 설정
    int setIntro(@Param("communityId") Long communityId, @Param("intro") String intro) throws Exception;

    // 게시판 순위 Top5 - communityService
    List<Community> getTopCommunities(int limit) throws Exception;

    // 신설 게시판 - communityService
    List<Community> getNewCommunities(int limit) throws Exception;

    // 모든 커뮤니티 조회
    List<Community> getAllCommunities() throws Exception;

    // 모든 커뮤니티 조회 + 키워드
    List<Community> searchCommunities(@Param("query") String query) throws Exception;

}