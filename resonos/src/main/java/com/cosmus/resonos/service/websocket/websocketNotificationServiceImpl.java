package com.cosmus.resonos.service.websocket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.websocket.WebsocketNotification;
import com.cosmus.resonos.mapper.websocket.WebsocketNotificationMapper;

@Service
public class websocketNotificationServiceImpl implements websocketNotificationService {

    @Autowired
    private WebsocketNotificationMapper notificationMapper;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    @Override
    public void sendNotification(WebsocketNotification notification) {
        notificationMapper.insert(notification);
        messagingTemplate.convertAndSend("/queue/notifications-" + notification.getUserId(), notification);
    }

    @Override
    public List<WebsocketNotification> getUserNotifications(Long userId) {
        return notificationMapper.findByUserId(userId);
    }

    @Override
    public void markAsRead(Long notificationId) {
        notificationMapper.markAsRead(notificationId);
    }

    @Override
    public void save(WebsocketNotification notification) {
        notificationMapper.insert(notification);
    }

    @Override
    public List<WebsocketNotification> getNotifications(Long userId) {
        return notificationMapper.findByUserId(userId);
    }

    @Override
    public void deleteNotification(Long notificationId) {
        notificationMapper.delete(notificationId);
    }

    @Override
    public WebsocketNotification getNotificationDetail(Long id) {
         return notificationMapper.findById(id);
    }
}
