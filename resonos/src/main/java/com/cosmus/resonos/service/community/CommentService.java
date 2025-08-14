package com.cosmus.resonos.service.community;

import java.util.List;

import com.cosmus.resonos.domain.community.Comment;

public interface CommentService extends BaseService<Comment> {

    
    
    boolean deleteAll() throws Exception;

    // 대댓글
    public List<Comment> findByTarget(String type, Long targetId) throws Exception;
}