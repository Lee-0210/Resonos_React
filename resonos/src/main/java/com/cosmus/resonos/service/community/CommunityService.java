package com.cosmus.resonos.service.community;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.Community;

public interface CommunityService extends BaseService<Community> {


    boolean deleteAll() throws Exception;
    // 게시판 대표 음악 설정
    // Long 에서 boolean 으로 수정함
    boolean setTrack(@Param("categoryId") Long categoryId, @Param("trackId") String trackId) throws Exception;

}