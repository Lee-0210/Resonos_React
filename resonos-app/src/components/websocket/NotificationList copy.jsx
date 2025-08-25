import React, { useContext } from 'react';
import { NotificationContext } from './NotificationContext';
import axios from 'axios';

const NotificationList = () => {
  const { notifications, setNotifications } = useContext(NotificationContext);

  const handleClick = async (notification) => {
    if (!notification.is_read) {
      await axios.post(`http://localhost:8080/api/notifications/read/${notification.id}`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notification.id ? { ...n, is_read: 1 } : n))
      );
    }

    // 상세 보기
    const res = await axios.get(`http://localhost:8080/api/notifications/detail/${notification.id}`);
    alert(`상세 내용:\n${res.data.content || res.data.message}`);
  };

  return (
    <div style={{ position: 'fixed', top: 10, right: 10, width: 300 }}>
      {notifications.map((n, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(n)}
          style={{
            border: '1px solid #ccc',
            marginBottom: 5,
            padding: 5,
            background: n.is_read ? '#f0f0f0' : '#fff',
            cursor: 'pointer',
          }}
        >
          <strong>{n.type}</strong>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
