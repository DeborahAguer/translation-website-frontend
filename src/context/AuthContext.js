import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if there's a saved token in localStorage and set user data accordingly
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);
      setUser({ token: response.token });
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      setUser({ token: response.token });
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
