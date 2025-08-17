package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.VoteStatus;

public interface VoteStatusService extends BaseService<VoteStatus> {

    
    
    boolean deleteAll() throws Exception;
}