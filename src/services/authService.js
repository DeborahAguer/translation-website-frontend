
import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/auth/';

// Register new user
// export const register = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}register`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };
export const register = async (userData) => {
  try {
    console.log('Sending registration data:', userData); // Log the request payload
    const response = await axios.post(`${API_URL}register`, userData);
    console.log('Response from backend:', response.data); // Log the backend response
    return response.data; // Ensure this is returned properly
  } catch (error) {
    console.error('Error response from backend:', error.response);
    const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
    throw new Error(errorMessage); // Throw meaningful error
  }
};

// Login user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    localStorage.setItem('token', response.data.token);  // Save token to local storage
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');  // Remove token from local storage
};

