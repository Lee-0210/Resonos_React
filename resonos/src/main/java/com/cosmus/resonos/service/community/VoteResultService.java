package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.VoteResult;

public interface VoteResultService extends BaseService<VoteResult> {

    
    
    boolean deleteAll() throws Exception;
}