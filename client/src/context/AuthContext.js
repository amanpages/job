import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null,
        token: null,
        loading: true, 
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            axios.defaults.headers.common['x-auth-token'] = token;
            setAuth({
                isAuthenticated: true,
                user: JSON.parse(user),
                token: token,
                loading: false, 
            });
        } else {
           
            setAuth({
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
            });
        }

        axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['x-auth-token'] = token;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }, []);

    const login = async (credentials) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setAuth({
                isAuthenticated: true,
                user: res.data.user,
                token: res.data.token,
                loading: false,
            });
            return res.data;
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message);
            return { error: err.response ? err.response.data : err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['x-auth-token'];
        setAuth({
            isAuthenticated: false,
            user: null,
            token: null,
            loading: false, 
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {!auth.loading && children} 
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
