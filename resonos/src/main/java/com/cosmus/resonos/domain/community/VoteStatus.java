package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class VoteStatus {


    private Long id; 

    private Long argId; 

    private Long userId; 

    private Date createdAt;

    // 없는 컬럼 
    public ComVote vote;
    public List<ComVote> votes;

}