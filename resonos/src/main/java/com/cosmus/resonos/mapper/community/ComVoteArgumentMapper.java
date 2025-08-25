package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.ComVoteArgument;

@Mapper
public interface ComVoteArgumentMapper extends BaseMapper<ComVoteArgument> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
    // 특정 투표의 모든 선택지 삭제
    void deleteByVoteId(Long voteId);
}