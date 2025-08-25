package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class BoardPost {
    private Long id;
    private String title;
    private String content;
    private String type;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdAt;
    private Long communityId;
    private Long userId;
    private Long views;
    private String userNickname;
    private String guestNickname;
    private String guestPassword;

    // 조인해서 가져올 데이터
    private int postLikes;
    private int postDislikes;
    private boolean userLiked;
    private boolean userDisliked;

    // 실제DB상 없음
    // 커뮤니티 정보, 이름
    private Community community;
    // 댓글 수
    private int commentCount;

    // 컬럼 추가
    // 게시판 대표 음악 설정
    private String trackId;
    // 게시판 테이블 thumbnail_url 컬럼 추가
    private String thumbnailUrl;

    // vote
    private ComVote vote;
    private Boolean voteActive;

}
