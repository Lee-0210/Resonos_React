package com.cosmus.resonos.controller.websocket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cosmus.resonos.domain.websocket.WebsocketNotice;
import com.cosmus.resonos.service.websocket.websocketNoticeService;

@RestController
@RequestMapping("/api/notices")
public class websocketNoticeController {

    @Autowired
    private websocketNoticeService noticeService;

    @GetMapping("/active")
    public List<WebsocketNotice> getActiveNotices() {
        return noticeService.getActiveNotices();
    }

    @PostMapping("/create")
    public void createNotice(@RequestBody WebsocketNotice notice) {
        noticeService.createNotice(notice);
    }
}
