package com.cosmus.resonos.service.community;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.ComVote;
import com.cosmus.resonos.domain.community.ComVoteArgument;

public interface ComVoteService extends BaseService<ComVote> {

    public ComVote selectByPostId(@Param("postId") Long postId) throws Exception;
    public void createVoteWithArguments(ComVote comVote, List<ComVoteArgument> arguments) throws Exception;
    
    public boolean deleteAll() throws Exception;
}