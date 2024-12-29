// import React, { createContext, useState, useEffect } from 'react';
// import { login, register, logout } from '../services/authService';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Tracks logged-in user
//   const [loading, setLoading] = useState(true);

//   // Token validation on mount and when localStorage changes
//   useEffect(() => {
//     const checkToken = () => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         console.log('Token found in localStorage');
//         setUser({ token }); // Set token in context
//       } else {
//         console.log('No token found');
//         setUser(null);
//       }
//       setLoading(false);
//     };

//     checkToken();
//   }, []);

//   const handleLogin = async (userData) => {
//     try {
//       const response = await login(userData);
//       setUser({ token: response.token });
//       localStorage.setItem('token', response.token);
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         handleLogin,
//         handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthProvider, AuthContext };
import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Tracks logged-in user
  const [loading, setLoading] = useState(true);

  // Token validation on mount and when localStorage changes
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('name');
      if (token) {
        console.log('Token found in localStorage');
        setUser({ token, name }); // Save token and name if available
      } else {
        console.log('No token found');
        setUser(null);
      }
      setLoading(false);
    };

    checkToken();
  }, []); // Empty dependency ensures this runs only on initial mount

  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);
      setUser({ token: response.token, name: response.name }); // Save response with name
      localStorage.setItem('token', response.token);
      localStorage.setItem('name', response.name); // Save name in localStorage as well
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name'); // Remove name as well
    setUser(null); // Clear user state
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
