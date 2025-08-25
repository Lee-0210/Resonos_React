import React from 'react';
import useNotifications from './useNotifications';

const NotificationPanel = ({ userId }) => {
  const { notifications, notices } = useNotifications(userId);

  return (
    <div>
      <h3>공지사항</h3>
      {notices.map((notice, idx) => (
        <div key={idx}>{notice.message}</div>
      ))}

      <h3>알림</h3>
      {notifications.map((notif, idx) => (
        <div key={idx}>
          {notif.type}: {notif.message} {notif.isRead ? '(읽음)' : '(새 알림)'}
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel;
