package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class VoteResult {


    private Long id; 

    private Long voteId; 

    private Long argId; 

    private Integer count; 

    private Date createdAt; 
}