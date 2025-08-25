package com.cosmus.resonos.mapper.websocket;

import org.apache.ibatis.annotations.Mapper;

import com.cosmus.resonos.domain.websocket.MessageMention;

@Mapper
public interface MessageMentionMapper {
    void insert(MessageMention mention);
}
