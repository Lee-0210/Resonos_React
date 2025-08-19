package com.cosmus.resonos.domain.community;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Comment {

    private Long id;

    private String content;

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

    private String guestNickname;

    private String guestPassword;

}