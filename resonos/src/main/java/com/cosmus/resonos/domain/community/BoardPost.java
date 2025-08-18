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

    // 실제DB상 없음 
    // 커뮤니티 정보, 이름 
    private Community community;

    // 컬럼 추가
    // 게시판 대표 음악 설정
    private String trackId;
    // 게시판 테이블 thumbnail_url 컬럼 추가
    private String thumbnailUrl;

}
