package com.cosmus.resonos.service.community;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.CustomUser;
import com.cosmus.resonos.domain.community.Comment;
import com.github.pagehelper.PageInfo;

public interface CommentService extends BaseService<Comment> {
    
    boolean deleteAll() throws Exception;

    // 대댓글
    public List<Comment> findByTarget(String type, Long targetId) throws Exception;

    // 조회 + 좋아요 싫어요 수
    public PageInfo<Comment> selectWithLikesDislikes(@Param("postId") Long postId, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize) throws Exception;

    // 페이지네이션 포함 댓글
    // public PageInfo<Comment> commentsWithPagination(@Param("postId") Long postId, @Param("pageNum") int pageNum, @Param("pageSize") int pageSize) throws Exception;

    // 댓글/대댓글 작성
    public void writeComment(Comment comment, CustomUser loginUser) throws Exception;

    // 비로그인 댓글 비밀번호 체크
    public boolean checkGuestPassword(Comment comment, String rawPassword) throws Exception;
}