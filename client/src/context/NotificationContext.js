import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const { auth } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (auth.isAuthenticated) {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/notifications`);
                    setNotifications(res.data);
                } catch (err) {
                    console.error('Error fetching notifications:', err.response ? err.response.data.msg : err.message);
                }
            }
        };
        fetchNotifications();
    }, [auth]);

    return (
        <NotificationContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => useContext(NotificationContext);
