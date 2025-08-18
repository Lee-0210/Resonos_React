package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.VoteStatus;

@Mapper
public interface VoteStatusMapper extends BaseMapper<VoteStatus> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}