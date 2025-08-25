package com.cosmus.resonos.domain.websocket;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
@Data
public class ChatMessage {
    private Long id;
    private Long roomId;
    private Long senderId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // getters & setters


     private List<Long> mentionedUserIds; // @username에 해당하는 유저 ID 리스트
}
