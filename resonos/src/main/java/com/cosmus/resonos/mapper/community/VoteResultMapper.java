package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.VoteResult;

@Mapper
public interface VoteResultMapper extends BaseMapper<VoteResult> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}