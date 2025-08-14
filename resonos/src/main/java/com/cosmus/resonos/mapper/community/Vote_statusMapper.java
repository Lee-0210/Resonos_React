package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Vote_status;

@Mapper
public interface Vote_statusMapper extends BaseMapper<Vote_status> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}