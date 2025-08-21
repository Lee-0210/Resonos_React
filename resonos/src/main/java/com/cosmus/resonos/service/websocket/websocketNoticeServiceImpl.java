package com.cosmus.resonos.service.websocket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.cosmus.resonos.domain.websocket.WebsocketNotice;
import com.cosmus.resonos.domain.websocket.WebsocketNotification;
import com.cosmus.resonos.mapper.websocket.WebsocketNoticeMapper;

@Service
public class websocketNoticeServiceImpl implements websocketNoticeService {

    @Autowired
    private WebsocketNoticeMapper noticeMapper;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Override
    public void createNotice(WebsocketNotice notice) {
        noticeMapper.insert(notice);
        WebsocketNotification notification = new WebsocketNotification();
        notification.setMessage("New notice: " + notice.getTitle());
        notification.setType("NOTICE");
        messagingTemplate.convertAndSend("/topic/notices", notification);
    }

    @Override
    public List<WebsocketNotice> getActiveNotices() {
        return noticeMapper.findActiveNotices();
    }
}
