package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.LikesDislikes;

public interface LikesDislikesService extends BaseService<LikesDislikes> {

    
    
    boolean deleteAll() throws Exception;
}