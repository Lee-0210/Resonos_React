package com.cosmus.resonos.domain.websocket;

import java.time.LocalDateTime;

import lombok.Data;
@Data
public class MessageMention {
    private Long id;
    private Long messageId;
    private Long mentionedUserId;
    private LocalDateTime createdAt;

    // getters & setters
}
