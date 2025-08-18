package com.cosmus.resonos.service.community;

import com.cosmus.resonos.domain.community.Community;

public interface CommunityService extends BaseService<Community> {

    
    boolean deleteAll() throws Exception;
    // 게시판 대표 음악 설정
    Long setTrack(Long categoryId, Long trackId) throws Exception;

}