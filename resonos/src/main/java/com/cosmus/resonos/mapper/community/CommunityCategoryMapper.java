package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.CommunityCategory;

@Mapper
public interface CommunityCategoryMapper extends BaseMapper<CommunityCategory> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}