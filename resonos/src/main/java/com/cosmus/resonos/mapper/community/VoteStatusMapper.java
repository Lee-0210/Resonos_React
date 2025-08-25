package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.VoteStatus;

@Mapper
public interface VoteStatusMapper extends BaseMapper<VoteStatus> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
    // 특정 선택지의 모든 투표 상태 삭제
    void deleteByArgId(Long id);
}