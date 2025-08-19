package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Files;

@Mapper
public interface FilesMapper extends BaseMapper<Files> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}