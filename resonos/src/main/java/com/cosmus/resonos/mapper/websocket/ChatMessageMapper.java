package com.cosmus.resonos.mapper.websocket;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.websocket.ChatMessage;

@Mapper
public interface ChatMessageMapper {
    void insert(ChatMessage message);
}
