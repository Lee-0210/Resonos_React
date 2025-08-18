package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class VoteStatus {


    private Long id; 

    private Long argId; 

    private Long userId; 

    private Date createdAt; 

}