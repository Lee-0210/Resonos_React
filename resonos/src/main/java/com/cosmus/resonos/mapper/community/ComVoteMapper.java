package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.ComVote;

@Mapper
public interface ComVoteMapper extends BaseMapper<ComVote> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}