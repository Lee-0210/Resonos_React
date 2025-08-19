package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class ComVote {


    private Long id; 

    private Long postId; 

    private String title; 

    private Date createdAt; 

    private String closedAt; 

    private Boolean isCompleted; 

    // DB 상 없는 컬럼
    // 투표 선택지
    private List<ComVoteArgument> arguments;
}