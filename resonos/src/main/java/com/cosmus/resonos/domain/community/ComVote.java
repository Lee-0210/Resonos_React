package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class ComVote {


    private Long id; 

    private Long post_id; 

    private String title; 

    private Date created_at; 

    private String closed_at; 

    private Boolean is_completed; 

}