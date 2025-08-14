package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Com_vote_argument;

@Mapper
public interface Com_vote_argumentMapper extends BaseMapper<Com_vote_argument> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}