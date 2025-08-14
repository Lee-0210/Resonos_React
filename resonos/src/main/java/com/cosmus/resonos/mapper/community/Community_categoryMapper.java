package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Community_category;

@Mapper
public interface Community_categoryMapper extends BaseMapper<Community_category> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}