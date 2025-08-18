package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.ComManager;

@Mapper
public interface ComManagerMapper extends BaseMapper<ComManager> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}