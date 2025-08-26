package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;

import com.cosmus.resonos.validation.GuestCheck;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Comment {

    private Long id;

    // 채울거
    @NotBlank(message = "댓글 내용을 입력하세요.")
    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private Date createdAt;

    private Long userId;

    private String type;

    private Long targetId;

    private Long boardPostId;

    private Long parentCommentId;

    private Long communityId;

    private String userNickname;

    private int commentLikes;

    private int commentDislikes;

    private List<Comment> replies;

    //비로그인시
    @NotBlank(message = "닉네임을 입력하세요.", groups = GuestCheck.class)
    private String guestNickname;

    //비로그인시
    @NotBlank(message = "비밀번호를 입력하세요.", groups = GuestCheck.class)
    private String guestPassword;

    private boolean userLiked;
    
    private boolean userDisliked;

}