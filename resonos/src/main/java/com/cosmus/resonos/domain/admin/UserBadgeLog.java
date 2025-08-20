package com.cosmus.resonos.domain.admin;

import java.util.Date;

import lombok.Data;
@Data
public class UserBadgeLog {
    private Long id;
    private Long userId;
    private Long badgeId;
    private String action;      // 'GRANT', 'REVOKE', 'EXPIRE' 등
    private Long actorId;       // 관리자 or null(자동)
    private String reason;
    private Date createdAt;

}