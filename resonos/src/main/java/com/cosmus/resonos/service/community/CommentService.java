package com.cosmus.resonos.service.community;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.Comment;

public interface CommentService extends BaseService<Comment> {

    
    
    boolean deleteAll() throws Exception;

    // 대댓글
    public List<Comment> findByTarget(String type, Long targetId) throws Exception;

    // 조회 + 좋아요 싫어요 수
    public List<Comment> selectWithLikesDislikes(@Param("communityId") Long communityId, @Param("postId") Long postId) throws Exception;
}