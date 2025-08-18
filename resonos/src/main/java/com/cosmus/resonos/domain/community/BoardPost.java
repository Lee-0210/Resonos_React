package com.cosmus.resonos.domain.community;

import java.util.Date;

import lombok.Data;

@Data
public class BoardPost {
    private Long id;
    private String title;
    private String content;
    private String type;
    private Date createdAt;
    private Long communityId;
    private Long userId;
    private Long views;

    // 커뮤니티 정보, 이름 
    private Community community;
}
