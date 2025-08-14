package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Vote_result {


    private Long id; 

    private Long vote_id; 

    private Long arg_id; 

    private Integer count; 

    private Date created_at; 
}