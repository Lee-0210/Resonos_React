import React, { useEffect, useContext } from 'react';
import { NotificationProvider, NotificationContext } from './NotificationContext';
import { connectNotification, disconnectNotification } from './notification';
import NotificationList from './NotificationList';

const NotificationHandler = () => {  // NotificationProvider 안에서 context를 사용
  const userId = 1;

  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    connectNotification(userId, (notification) => {
      addNotification(notification);
    });

    return () => {
      disconnectNotification();
    };
  }, [userId, addNotification]);

  return <NotificationList />;
};

const App3 = () => {
  return (
    <div>
      <h1>Real-time Notification Demo</h1>
      <NotificationProvider>
        <NotificationHandler />
      </NotificationProvider>
    </div>
  );
}

export default App3;
