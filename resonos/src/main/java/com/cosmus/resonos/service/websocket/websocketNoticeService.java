package com.cosmus.resonos.service.websocket;

import java.util.List;

import com.cosmus.resonos.domain.websocket.WebsocketNotice;

public interface websocketNoticeService {
    void createNotice(WebsocketNotice notice);
    List<WebsocketNotice> getActiveNotices();
}
