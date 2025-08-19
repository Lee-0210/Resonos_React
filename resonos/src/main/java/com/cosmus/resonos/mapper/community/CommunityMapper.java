package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Community;

@Mapper
public interface CommunityMapper extends BaseMapper<Community> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
    // 게시판 대표 음악 설정
    // boolean -> int 수정함
    int setTrack(Long categoryId, Long trackId) throws Exception;
}