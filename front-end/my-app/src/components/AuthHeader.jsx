import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './header/Header';

const AuthHeader = ({ children, theme = 'light' }) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const buttonText = isLoggedIn ? "Sign out" : "Sign in";
  const buttonPath = isLoggedIn ? "/" : "/login";
  const onClick = isLoggedIn ? handleSignOut : undefined;

  return (
    <>
      <Header theme={theme} buttonText={buttonText} buttonPath={buttonPath} onClick={onClick} />
      {children}
    </>
  );
};

export default AuthHeader;