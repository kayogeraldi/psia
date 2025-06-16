// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../api/services/authServices';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // null indica que ainda estamos carregando/verificando a autenticação
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const authData = await AuthService.checkAuth();
      setIsAuthenticated(authData.isAuthenticated);
      setUser(authData.user);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
