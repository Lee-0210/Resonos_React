package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Com_manager;

@Mapper
public interface Com_managerMapper extends BaseMapper<Com_manager> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}