import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

export const connectNotification = (userId, onMessageReceived) => {
  const socket = new SockJS('http://localhost:8080/ws');
  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
  });

  stompClient.onConnect = () => {
    console.log('WebSocket connected!');

    // 개인 알림 구독
    stompClient.subscribe(`/queue/notifications-${userId}`, (msg) => {
      onMessageReceived(JSON.parse(msg.body));
    });

    // 공지 구독
    stompClient.subscribe(`/topic/notice`, (msg) => {
      onMessageReceived(JSON.parse(msg.body));
    });
  };

  stompClient.activate();
};

export const disconnectNotification = () => {
  if (stompClient) stompClient.deactivate();
};
