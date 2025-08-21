package com.cosmus.resonos.domain.websocket;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class WebsocketNotification {
    private Long id;
    private String type;          // MENTION, DM, ADMIN, etc.
    private String message;
    private String content;       // JSON or extra info
    private Boolean isRead = false;
    private LocalDateTime createdAt;
    private Long targetId;        // 원본 메시지 ID
    private Long userId;          // 알람 받을 유저

    // getters & setters
}
