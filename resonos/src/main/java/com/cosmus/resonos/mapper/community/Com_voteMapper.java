package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Com_vote;

@Mapper
public interface Com_voteMapper extends BaseMapper<Com_vote> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}