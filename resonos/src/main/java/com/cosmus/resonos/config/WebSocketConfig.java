package com.cosmus.resonos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트가 연결할 엔드포인트임
        registry.addEndpoint("/ws-alarm").setAllowedOrigins("*");
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 이벤트가 발생하면 /topic, /queue 구독자에게 전달함
        registry.enableSimpleBroker("/topic", "/queue");
        // 클라이언트가 보낼 메시지 경로 접두어
        registry.setApplicationDestinationPrefixes("/app");
    }
}
