package com.cosmus.resonos.domain.community;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComVoteArgument {


    private Long id;

    private Long voteId;

    @NotBlank(message = "투표 항목을 모두 입력하세요.")
    private String content;

    private int argNo;

    // DB 상 없는 컬럼 
    private int voteCount;  // 집계용


}