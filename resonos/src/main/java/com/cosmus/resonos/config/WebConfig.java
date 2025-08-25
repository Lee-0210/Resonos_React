package com.cosmus.resonos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 클라이언트 STOMP 접속 엔드포인트: "/ws-alarm"
        registry.addEndpoint("/ws-alarm")
                .setAllowedOriginPatterns("*")
                .withSockJS();
        
        // SockJS 없는 순수 WebSocket 엔드포인트도 추가 (선택사항)
        registry.addEndpoint("/ws-alarm")
                .setAllowedOriginPatterns("*");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // /topic, /queue 브로커 활성화
        config.enableSimpleBroker("/topic", "/queue");
        // 클라이언트 SEND 주소 접두어: /app
        config.setApplicationDestinationPrefixes("/app");
        // 유저 푸시: /user/queue/alarms 등 자동 매핑
        config.setUserDestinationPrefix("/user");
    }

    // PasswordEncoder Bean 등록 (임시 해결책)
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}