// // authUtils.js

// export const getUserFromLocalStorage = () => {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   };
  // utils/authUtils.js

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user'); // Retrieve the user data
  return user ? JSON.parse(user) : null; // Parse and return user data if available, else return null
};
