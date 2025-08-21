package com.cosmus.resonos.controller.websocket;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import lombok.RequiredArgsConstructor;
import com.cosmus.resonos.domain.websocket.WebsocketNotification;
import com.cosmus.resonos.domain.websocket.WebsocketNotice;

@Controller
@RequiredArgsConstructor
public class AlarmWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;

    // @MessageMapping: 클라이언트에서 /app/notify 로 메시지 전송 시 트리거됨
    @MessageMapping("/notify")
    public void notifyUser(WebsocketNotification notification) {
        // 단일 사용자 알림(권장 경로: /user/{userId}/queue/alarms)
        messagingTemplate.convertAndSendToUser(
            notification.getUserId().toString(),
            "/queue/alarms",
            notification
        );
    }

    // 공지사항 전체 브로드캐스트
    public void sendNoticeToAll(WebsocketNotice notice) {
        messagingTemplate.convertAndSend("/topic/alarms", notice);
    }
}
