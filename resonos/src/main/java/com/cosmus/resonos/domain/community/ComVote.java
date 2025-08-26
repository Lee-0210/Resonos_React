package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    @Future(message = "투표 종료일시는 미래 일시여야 합니다.")
    private Date closedAt;

    private Boolean isCompleted;

    // DB 상 없는 컬럼
    // 투표 선택지
    @Valid
    @NotNull(message = "투표 항목을 입력하세요.")
    private List<ComVoteArgument> arguments;
    // 총 투표 수
    private Long totalVoteCount;

    // 투표 결과 
    public Object getQuestion;
    
}