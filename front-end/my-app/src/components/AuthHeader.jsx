import React from 'react';
import Header from './header/Header';
import { menuItems } from '../constants';

const AuthHeader = ({ children, theme = 'light' }) => {

  return (
    <>
      <Header theme={theme} menuItems={menuItems} />
      {children}
    </>
  );
};

export default AuthHeader;