package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Community_category {


    private Long id; 

    private Boolean is_kor; 

    private String name; 

    private Date created_at; 
}