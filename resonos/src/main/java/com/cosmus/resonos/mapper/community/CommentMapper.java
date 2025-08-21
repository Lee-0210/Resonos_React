package com.cosmus.resonos.mapper.community;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.Comment;

@Mapper
public interface CommentMapper extends BaseMapper<Comment> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;

    // 대댓글
    public List<Comment> findByTarget(String type, Long targetId) throws Exception;
    // 댓글 수 구하기
    public int countByUserId(@Param("userId") Long userId);
    // 조회 + 좋아요 싫어요 수
    public List<Comment> selectWithLikesDislikes(@Param("postId") Long postId) throws Exception;
    // 댓글, 대댓글 일괄 select
    public List<Comment> selectAllWithOrder(@Param("postId") Long postId) throws Exception;

}