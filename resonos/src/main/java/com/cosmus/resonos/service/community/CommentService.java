package com.cosmus.resonos.service.community;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.Comment;

public interface CommentService extends BaseService<Comment> {

    
    
    boolean deleteAll() throws Exception;

    // 대댓글
    public List<Comment> findByTarget(String type, Long targetId) throws Exception;

    // 조회 + 좋아요 싫어요 수
    public List<Comment> selectWithLikesDislikes(@Param("postId") Long postId) throws Exception;

    // 댓글/대댓글 작성
    public void writeComment(Comment comment, CustomUser loginUser) throws Exception;

    // 비로그인 댓글 비밀번호 체크
    public boolean checkGuestPassword(Comment comment, String rawPassword) throws Exception;
}