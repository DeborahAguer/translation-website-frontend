import axios from 'axios';

// Base URL for the API (you can replace this with your actual backend URL)
const baseURL = 'http://localhost:5000/api/';

// Create an axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in the header (if user is logged in)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle any API errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here, like 401 (Unauthorized), 500 (Server errors), etc.
    if (error.response && error.response.status === 401) {
      // You can redirect to login page or handle token expiration here
      console.error('Unauthorized, please login');
    }
    return Promise.reject(error);
  }
);

export default api;
