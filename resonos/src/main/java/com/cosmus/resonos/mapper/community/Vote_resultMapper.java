package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Vote_result;

@Mapper
public interface Vote_resultMapper extends BaseMapper<Vote_result> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}