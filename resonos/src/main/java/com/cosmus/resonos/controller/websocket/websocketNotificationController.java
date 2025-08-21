package com.cosmus.resonos.controller.websocket;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.cosmus.resonos.domain.websocket.WebsocketNotification;
import com.cosmus.resonos.service.websocket.websocketNotificationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class websocketNotificationController {
    private final websocketNotificationService notificationService;

    @GetMapping("/{userId}")
    public List<WebsocketNotification> getNotifications(@PathVariable Long userId) {
        return notificationService.getNotifications(userId);
    }

    @PostMapping("/read/{id}")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @GetMapping("/detail/{id}")
    public WebsocketNotification getDetail(@PathVariable Long id) {
        return notificationService.getNotificationDetail(id);
    }
}
