package com.cosmus.resonos.mapper.websocket;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.websocket.WebsocketNotification;

@Mapper
public interface WebsocketNotificationMapper {
    void insert(WebsocketNotification notification);
    List<WebsocketNotification> findByUserId(Long userId);
    WebsocketNotification findById(Long id); // 단건 상세 조회 추가
    void markAsRead(Long id);
    void delete(Long id);
}
