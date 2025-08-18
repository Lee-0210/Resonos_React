package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.ComManager;

public interface ComManagerService extends BaseService<ComManager> {

    
    
    boolean deleteAll() throws Exception;
}