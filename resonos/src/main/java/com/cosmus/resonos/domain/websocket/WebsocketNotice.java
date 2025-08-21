package com.cosmus.resonos.domain.websocket;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class WebsocketNotice {
    private Long id;
    private String title;
    private String content;
    private Long authorId;
    private Boolean isActive = true;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // getters & setters
}
