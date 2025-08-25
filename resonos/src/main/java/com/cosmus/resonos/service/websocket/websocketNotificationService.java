package com.cosmus.resonos.service.websocket;

import java.util.List;

import com.cosmus.resonos.domain.websocket.WebsocketNotification;

public interface websocketNotificationService {
    void sendNotification(WebsocketNotification notification);
    List<WebsocketNotification> getUserNotifications(Long userId);
    void markAsRead(Long notificationId);
    void save(WebsocketNotification notification);
    List<WebsocketNotification> getNotifications(Long userId);
    void deleteNotification(Long notificationId);
    WebsocketNotification getNotificationDetail(Long id); // id로 상세조회
}

