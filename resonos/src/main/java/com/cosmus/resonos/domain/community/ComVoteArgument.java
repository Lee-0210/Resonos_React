package com.cosmus.resonos.domain.community;

import java.util.UUID;

import lombok.Data;

@Data
public class ComVoteArgument {


    private Long id;

    private Long voteId;

    private String content;

    private int argNo;

    // DB 상 없는 컬럼 
    private int voteCount;  // 집계용


}