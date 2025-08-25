package com.cosmus.resonos.service.websocket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.websocket.ChatMessage;
import com.cosmus.resonos.domain.websocket.MessageMention;
import com.cosmus.resonos.domain.websocket.WebsocketNotification;
import com.cosmus.resonos.mapper.websocket.ChatMessageMapper;
import com.cosmus.resonos.mapper.websocket.MessageMentionMapper;
import com.cosmus.resonos.mapper.websocket.WebsocketNotificationMapper;

@Service
public class ChatServiceImpl implements ChatService {

    @Autowired
    private ChatMessageMapper chatMessageMapper;

    @Autowired
    private MessageMentionMapper mentionMapper;

    @Autowired
    private WebsocketNotificationMapper notificationMapper;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public void sendMessage(ChatMessage dto) {
        // 1. 메시지 저장
        ChatMessage message = new ChatMessage();
        message.setRoomId(dto.getRoomId());
        message.setSenderId(dto.getSenderId());
        message.setContent(dto.getContent());
        chatMessageMapper.insert(message);

        // 2. 멘션 처리
        List<Long> mentionedUsers = dto.getMentionedUserIds();
        if (mentionedUsers != null) {
            for (Long userId : mentionedUsers) {
                MessageMention mention = new MessageMention();
                mention.setMessageId(message.getId());
                mention.setMentionedUserId(userId);
                mentionMapper.insert(mention);

                // 3. 알람 생성
                WebsocketNotification notification = new WebsocketNotification();
                notification.setType("MENTION");
                notification.setMessage("You were mentioned in a message!");
                notification.setContent("Message ID: " + message.getId());
                notification.setUserId(userId);
                notificationMapper.insert(notification);

                // 4. WebSocket 실시간 전송
                messagingTemplate.convertAndSend("/queue/notifications-" + userId, notification);
            }
        }
    }
}
