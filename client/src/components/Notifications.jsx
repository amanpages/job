import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Notifications = () => {
    const { notifications, setNotifications } = useNotifications();
    const { auth } = useAuth();

    const markAsRead = async (id) => {
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/notifications/${id}`, {}, {
                headers: {
                    'x-auth-token': auth.token,
                },
            });
            setNotifications(notifications.filter(notification => notification._id !== id));
        } catch (err) {
            console.error('Error marking notification as read:', err.response ? err.response.data.msg : err.message);
        }
    };

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification._id}>
                        {notification.message}
                        <button onClick={() => markAsRead(notification._id)}>Mark as read</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
