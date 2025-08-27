package com.cosmus.resonos.domain.community;

import java.util.Date;

import lombok.Data;

@Data
public class Files {


    private Long no; 

    private String id; 

    private String p_table; 

    private Long p_no; 

    private String file_name; 

    private String origin_name; 

    private String file_path; 

    private Long file_size; 

    private Date createdAt; 

    private Date updatedAt; 

    private String type; 

    private Long seq; 

    private String PRIMARY; 

}