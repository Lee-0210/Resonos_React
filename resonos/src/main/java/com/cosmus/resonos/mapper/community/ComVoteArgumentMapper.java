package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.ComVoteArgument;

@Mapper
public interface ComVoteArgumentMapper extends BaseMapper<ComVoteArgument> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}