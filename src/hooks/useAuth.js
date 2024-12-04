// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUserFromLocalStorage } from '../utils/authUtils';

// export const useAuth = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // Load user info from local storage on initial load
//   useEffect(() => {
//     const userData = getUserFromLocalStorage();
//     if (userData) {
//       setUser(userData);
    
//     }
//   }, []);

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/login'); // Redirect to the login page
//   };
  

//   return { user, logout };
// };
// hooks/useAuth.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromLocalStorage } from '../utils/authUtils'; // Helper to get user from localStorage

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user info from local storage on initial load
  useEffect(() => {
    const userData = getUserFromLocalStorage(); // Retrieve user from localStorage
    if (userData) {
      setUser(userData); // Set user state if found
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Reset user state
    navigate('/login'); // Redirect to login page
  };

  return { user, logout }; // Return user state and logout function
};
