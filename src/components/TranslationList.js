import React, { useState, useEffect } from 'react';
import { getTranslations } from '../services/translationService';

const TranslationList = () => {
  const [translations, setTranslations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  // Fetch translations from the server on component mount
  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async (search = '') => {
    try {
      setError('');
      const response = await getTranslations(search);
      setTranslations(response.data);
    } catch (err) {
      setError('Failed to fetch translations. Please try again.');
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTranslations(searchTerm);
  };

  return (
    <div className="translation-list">
      <h2>Translations</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by word or translation..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {translations.length > 0 ? (
          translations.map((translation) => (
            <li key={translation._id}>
              <strong>{translation.wordOriginal}</strong> → {translation.wordTranslated} 
              <em>({translation.languageFrom} to {translation.languageTo})</em>
            </li>
          ))
        ) : (
          <p>No translations found.</p>
        )}
      </ul>
    </div>
  );
};

export default TranslationList;
