package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class VoteStatus {


    private Long id; 

    private Long arg_id; 

    private Long user_id; 

    private Date created_at; 

}