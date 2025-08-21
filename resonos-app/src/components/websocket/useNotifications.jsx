import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({ webSocketFactory: () => socket });

    stompClient.onConnect = () => {
      // 개인 알람 구독
      stompClient.subscribe(`/queue/notifications-${userId}`, (msg) => {
        setNotifications(prev => [...prev, JSON.parse(msg.body)]);
      });

      // 공지 구독
      stompClient.subscribe('/topic/notices', (msg) => {
        setNotices(prev => [...prev, JSON.parse(msg.body)]);
      });
    };

    stompClient.activate();
    return () => stompClient.deactivate();
  }, [userId]);

  return { notifications, notices };
};

export default useNotifications;
