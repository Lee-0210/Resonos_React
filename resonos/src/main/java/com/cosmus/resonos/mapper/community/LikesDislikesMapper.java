package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.community.LikesDislikes;

@Mapper
public interface LikesDislikesMapper extends BaseMapper<LikesDislikes> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
}