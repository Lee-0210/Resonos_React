package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Com_manager {


    private Long id; 

    private Long user_id; 

    private Long com_id; 

    private Date created_at; 

}