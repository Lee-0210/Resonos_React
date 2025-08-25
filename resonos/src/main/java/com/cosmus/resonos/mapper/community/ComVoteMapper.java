package com.cosmus.resonos.mapper.community;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.ComVote;

@Mapper
public interface ComVoteMapper extends BaseMapper<ComVote> {

    public ComVote selectByPostId(@Param("postId") Long postId) throws Exception;
    public int completeAll() throws Exception;
    public int deleteAll() throws Exception;
}