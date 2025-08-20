package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.Files;

public interface FilesService extends BaseService<Files> {

    
    
    boolean deleteAll() throws Exception;
}