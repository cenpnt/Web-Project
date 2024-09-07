import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const storedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(storedLoginStatus);

        const storedUser = localStorage.getItem('user')
        if(storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch(error) {
                console.error('Failed to parse user data from localStorage', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);