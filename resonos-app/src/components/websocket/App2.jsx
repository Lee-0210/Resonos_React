import React, { useEffect, useContext } from 'react';
import { NotificationProvider, NotificationContext } from './context/NotificationContext';
import { connectNotification, disconnectNotification } from './ws/notification';
import NotificationList from './components/NotificationList';

function App2() {
  const userId = 1; // 로그인 후 실제 userId로 변경

  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    connectNotification(userId, (notification) => {
      addNotification(notification);
    });

    return () => {
      disconnectNotification();
    };
  }, [userId, addNotification]);

  return (
    <div>
      <h1>Real-time Notification Demo</h1>
      <NotificationList />
    </div>
  );
}

export default () => (
  <NotificationProvider>
    <App2 />
  </NotificationProvider>
);
