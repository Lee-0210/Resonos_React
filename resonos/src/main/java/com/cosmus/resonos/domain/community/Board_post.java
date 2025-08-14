package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Board_post {


    private Long id; 

    private String title; 

    private String content; 

    private String type; 

    private Date created_at; 

    private Long community_id; 

    private Long user_id; 

    private Long views; 


}