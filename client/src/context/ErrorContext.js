// client/src/context/ErrorContext.js
import React, { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleError = (msg) => {
        setError(msg);
        setTimeout(() => setError(null), 5000);
    };

    return (
        <ErrorContext.Provider value={{ error, handleError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
