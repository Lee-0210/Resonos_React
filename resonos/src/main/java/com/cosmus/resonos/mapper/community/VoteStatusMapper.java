package com.cosmus.resonos.mapper.community;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.cosmus.resonos.domain.community.VoteStatus;

@Mapper
public interface VoteStatusMapper extends BaseMapper<VoteStatus> {

    int completeAll() throws Exception;
    int deleteAll() throws Exception;
    // 특정 선택지의 모든 투표 상태 삭제
    void deleteByArgId(Long id);
    // userId + postId 로 투표 상태 조회 (중복 투표 방지용)
    VoteStatus selectByUserIdAndPostId(@Param("userId") Long userId, @Param("argId") Long argId) throws Exception;
    // userId 로 모든 투표 상태 조회 (투표 변경용)
    List<VoteStatus> selectByUserId(Long userId);
    // userId 로 모든 투표 상태 삭제
    void deleteByUserId(Long userId);
    // argId로 PostId 조회
    Long selectPostIdByArgId(Long argId);
    
}