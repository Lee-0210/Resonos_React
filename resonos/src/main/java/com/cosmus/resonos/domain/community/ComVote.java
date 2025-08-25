package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ComVote {


    private Long id;

    private Long postId;

    @NotBlank(message = "투표 제목을 입력하세요.")
    private String title;

    private Date createdAt;

    @Future(message = "투표 종료일시는 미래 일시여야 합니다.")
    private Date closedAt;

    private Boolean isCompleted;

    // DB 상 없는 컬럼
    // 투표 선택지
    @Valid
    @NotNull(message = "투표 항목을 입력하세요.")
    private List<ComVoteArgument> arguments;

    // 투표 결과 
    public Object getQuestion;
    
}