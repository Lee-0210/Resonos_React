package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.Likes_dislikes;

@Mapper
public interface Likes_dislikesMapper extends BaseMapper<Likes_dislikes> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}