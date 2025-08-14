package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.UUID;

import lombok.Data;

@Data
public class Likes_dislikes {


    private Long id; 

    private String type; 

    private Long user_id; 

    private Boolean is_likes; 

    private Long target_id; 

    private Date created_at; 

}