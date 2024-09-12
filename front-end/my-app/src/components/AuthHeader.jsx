import React from 'react';
import Header from './header/Header';

const AuthHeader = ({ children, theme = 'light' }) => {

  return (
    <>
      <Header theme={theme} />
      {children}
    </>
  );
};

export default AuthHeader;