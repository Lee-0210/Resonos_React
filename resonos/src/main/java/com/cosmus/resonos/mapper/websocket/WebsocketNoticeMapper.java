package com.cosmus.resonos.mapper.websocket;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.websocket.WebsocketNotice;

@Mapper
public interface WebsocketNoticeMapper {
    void insert(WebsocketNotice notice);
    List<WebsocketNotice> findActiveNotices();
}
