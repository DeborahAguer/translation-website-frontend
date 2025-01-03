import React, { useState, useContext } from 'react';
import { TranslationContext } from '../context/TranslationContext';  // Assuming you have TranslationContext
import './Dashboard.css';  // Import the CSS file
import { getTranslations } from '../services/translationService';

const TranslationPage = () => {
  // State for the Add Translation Form
  const [addFormData, setAddFormData] = useState({
    wordOriginal: '',
    wordTranslated: '',
    languageFrom: '',
    languageTo: '',
  });

  // State for the Search Form
  const [searchFormData, setSearchFormData] = useState({
    wordOriginal: '',
    languageFrom: '',
    languageTo: '',
  });

  const [searchResults, setSearchResults] = useState(null);  // To store search results
  const [searchErrorMessage, setSearchErrorMessage] = useState('');  // Separate error for search
  const [successMessage, setSuccessMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');  // Separate error for adding translation

  // Destructuring only handleAddTranslation from TranslationContext
  const { handleAddTranslation } = useContext(TranslationContext); 

  // Handle input change for the Add Translation Form
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({
      ...addFormData,
      [name]: value,
    });
  };

  // Handle input change for the Search Form
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchFormData({
      ...searchFormData,
      [name]: value,
    });
  };

  // Handle search form submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { wordOriginal, wordTranslated, languageFrom, languageTo } = addFormData;
  
    // Validate form before submitting
    if (!wordOriginal || !wordTranslated || !languageFrom || !languageTo) {
      setAddErrorMessage('All fields are required.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');  // Assuming token is used
      await handleAddTranslation(addFormData, token);  // Add new translation via context
      setSuccessMessage('Translation added successfully!');
      setAddErrorMessage('');  // Clear any previous error
      setAddFormData({ wordOriginal: '', wordTranslated: '', languageFrom: '', languageTo: '' });  // Reset form data
  
      // Log the translations to check if the new translation was added
      console.log('New translation added: ', addFormData);
    } catch (error) {
      setAddErrorMessage('Error adding translation.');
    }
  };
  
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const { wordOriginal, languageFrom, languageTo } = searchFormData;
  
    // Clear previous search results and error messages
    setSearchResults(null);
    setSearchErrorMessage('');
  
    try {
      // Search for existing translation in the system
      const result = await getTranslations(wordOriginal, languageFrom, languageTo);
  
      // Log the result to see if the search function is working
      console.log('Search result: ', result);
  
      if (result) {
        setSearchResults(result);
        setSearchErrorMessage(''); // Clear error if translation is found
      } else {
        setSearchResults(null);
        setSearchErrorMessage('Translation not found. You can add it.');
      }
    } catch (error) {
      setSearchErrorMessage('Error searching translation.');
    }
  };
  
  return (
    <div>
      <h2>Translation Page</h2>

      {/* Search for existing translation */}
      <form onSubmit={handleSearchSubmit}>
        <fieldset>
          <h3>Search for Translation</h3>
          <div>
            <label htmlFor="languageFrom">Language From:</label>
            <select
              name="languageFrom"
              value={searchFormData.languageFrom}
              onChange={handleSearchChange}
              required
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="kiswahili">Kiswahili</option>
              <option value="dinka">Dinka</option>
            </select>
          </div>

          <div>
            <label htmlFor="languageTo">Language To:</label>
            <select
              name="languageTo"
              value={searchFormData.languageTo}
              onChange={handleSearchChange}
              required
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="kiswahili">Kiswahili</option>
              <option value="dinka">Dinka</option>
            </select>
          </div>

          <div>
            <label htmlFor="wordOriginal">Word:</label>
            <input
              type="text"
              name="wordOriginal"
              value={searchFormData.wordOriginal}
              onChange={handleSearchChange}
              placeholder="Enter the word to search"
              required
            />
          </div>

          <button type="submit">Search Translation</button>
        </fieldset>
      </form>

      {/* Display search error message */}
      {searchErrorMessage && <p>{searchErrorMessage}</p>}

      {/* Display the translation result if found */}
      {searchResults && (
        <div>
          <h4>Translation Found:</h4>
          <p>{searchResults.wordOriginal} - {searchResults.wordTranslated}</p>
        </div>
      )}

      {/* Add a new translation form */}
      <form onSubmit={handleAddSubmit}>
        <fieldset>
          <h3>Add a New Translation</h3>
          <div>
            <label htmlFor="wordOriginal">Original Word:</label>
            <input
              type="text"
              name="wordOriginal"
              value={addFormData.wordOriginal}
              onChange={handleAddChange}
              placeholder="Enter the word in the original language"
              required
            />
          </div>

          <div>
            <label htmlFor="wordTranslated">Translated Word:</label>
            <input
              type="text"
              name="wordTranslated"
              value={addFormData.wordTranslated}
              onChange={handleAddChange}
              placeholder="Enter the translated word"
              required
            />
          </div>

          <div>
            <label htmlFor="languageFrom">Language From:</label>
            <select
              name="languageFrom"
              value={addFormData.languageFrom}
              onChange={handleAddChange}
              required
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="kiswahili">Kiswahili</option>
              <option value="dinka">Dinka</option>
            </select>
          </div>

          <div>
            <label htmlFor="languageTo">Language To:</label>
            <select
              name="languageTo"
              value={addFormData.languageTo}
              onChange={handleAddChange}
              required
            >
              <option value="">Select Language</option>
              <option value="english">English</option>
              <option value="kiswahili">Kiswahili</option>
              <option value="dinka">Dinka</option>
            </select>
          </div>

          <button type="submit">Add Translation</button>
        </fieldset>
      </form>

      {/* Display success and error messages for adding translation */}
      {successMessage && <p>{successMessage}</p>}
      {addErrorMessage && <p>{addErrorMessage}</p>}
    </div>
  );
};

export default TranslationPage;
