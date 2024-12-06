import axios from 'axios';

// Base URL for the API
const API_URL = 'http://localhost:5000/api/translations/';

// Get all translations or search for a specific translation
export const getTranslations = async (searchTerm = '') => {
  try {
    const response = await axios.get(`${API_URL}search?search=${searchTerm}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add a new translation
export const addTranslation = async (translationData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}add`,
      translationData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
