import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, roles, ...rest }) => {
    const { auth } = useAuth();

    if (!auth.isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (roles && roles.length > 0 && !roles.includes(auth.user.role)) {
        return <Navigate to="/unauthorized" />;
    }

    return <Element {...rest} />;
};

export default ProtectedRoute;
