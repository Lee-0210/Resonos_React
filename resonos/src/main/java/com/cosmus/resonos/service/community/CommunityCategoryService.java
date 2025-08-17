package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.CommunityCategory;

public interface CommunityCategoryService extends BaseService<CommunityCategory> {

    
    
    boolean deleteAll() throws Exception;
}