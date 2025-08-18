package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.ComVote;

public interface ComVoteService extends BaseService<ComVote> {

    
    
    boolean deleteAll() throws Exception;
}