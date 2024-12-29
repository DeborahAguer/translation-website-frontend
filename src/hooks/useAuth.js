
import { useState, useEffect } from 'react';
import { getUserFromLocalStorage } from '../utils/authUtils';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // Check for user in localStorage on app load
  useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Handle user login and persist data to localStorage
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Handle logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return { user, login, logout };
};
