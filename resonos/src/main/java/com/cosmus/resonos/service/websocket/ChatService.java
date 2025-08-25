package com.cosmus.resonos.service.websocket;

import com.cosmus.resonos.domain.websocket.ChatMessage;

public interface ChatService {
    void sendMessage(ChatMessage message);
}
