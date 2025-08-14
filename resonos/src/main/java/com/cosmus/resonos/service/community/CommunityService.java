package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.Community;

public interface CommunityService extends BaseService<Community> {

    
    
    boolean deleteAll() throws Exception;
}