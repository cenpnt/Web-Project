import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

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
        
        if(storedLoginStatus) {    // Only chcek when user already logged in
            const checkExpiration = () => {
                if (isTokenExpired()) {
                    logout();
                }
            };
            checkExpiration();
            const intervalID = setInterval(checkExpiration, 3600000); // Check every hour
            return () => clearInterval(intervalID);
        }
    }, []);

    const login = (data) => {
        const decodedToken = jwtDecode(data);
        const expirationTime = decodedToken.exp * 1000;
        setIsLoggedIn(true);
        setUser(decodedToken.sub);
        localStorage.setItem('access_token', data);  // Store JWT in localStorage
        localStorage.setItem('token_expiration', expirationTime); // Store token expiration time
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify(decodedToken.sub));
        if(decodedToken.role === 'admin') {
            localStorage.setItem('isAdmin', 'true');
        } else {
            localStorage.setItem('isAdmin', 'false');
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('token_expiration');
        navigate('/');
    }

    const isTokenExpired = () => {
        const tokenExpiration = localStorage.getItem('token_expiration');
        if (!tokenExpiration) {
            return false; // No expiration set, assume token is not expired
        }
        return new Date().getTime() > parseInt(tokenExpiration);
    };

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