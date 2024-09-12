import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    
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
        navigate('/');
    }

    const buttonText = isLoggedIn ? "Sign out" : "Sign in";
    const buttonPath = isLoggedIn ? "/" : "/login";
    const buttonClick = isLoggedIn ? logout : () => navigate('/login');

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout, buttonText, buttonPath, buttonClick }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);