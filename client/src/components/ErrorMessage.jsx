// client/src/components/ErrorMessage.js
import React from 'react';
import { useError } from '../context/ErrorContext';

const ErrorMessage = () => {
    const { error } = useError();

    if (!error) return null;

    return (
        <div style={{ color: 'red', position: 'fixed', top: 0, width: '100%', textAlign: 'center' }}>
            {error}
        </div>
    );
};

export default ErrorMessage;
