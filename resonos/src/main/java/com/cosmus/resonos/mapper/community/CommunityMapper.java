package com.cosmus.resonos.mapper.community;

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



}