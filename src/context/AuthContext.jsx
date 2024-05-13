import React, { createContext, useState } from 'react';
import { reIssue } from './reIssue'; // reIssue 함수 임포트

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken')
  );

  const newAccessToken = async () => {
    const newAccessToken = await reIssue();
    setAccessToken(newAccessToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, newAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
