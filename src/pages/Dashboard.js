import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TranslationContext } from '../context/TranslationContext';

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const { translations, handleAddTranslation } = useContext(TranslationContext);
  
  const [newTranslation, setNewTranslation] = useState({
    wordOriginal: '',
    wordTranslated: '',
    languageFrom: '',
    languageTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTranslation({ ...newTranslation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTranslation(newTranslation);
    setNewTranslation({
      wordOriginal: '',
      wordTranslated: '',
      languageFrom: '',
      languageTo: ''
    });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>Welcome, {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="wordOriginal"
          value={newTranslation.wordOriginal}
          onChange={handleChange}
          placeholder="Original Word"
        />
        <input
          type="text"
          name="wordTranslated"
          value={newTranslation.wordTranslated}
          onChange={handleChange}
          placeholder="Translated Word"
        />
        <input
          type="text"
          name="languageFrom"
          value={newTranslation.languageFrom}
          onChange={handleChange}
          placeholder="From Language"
        />
        <input
          type="text"
          name="languageTo"
          value={newTranslation.languageTo}
          onChange={handleChange}
          placeholder="To Language"
        />
        <button type="submit">Add Translation</button>
      </form>

      <h3>Translations</h3>
      <ul>
        {translations.map((translation) => (
          <li key={translation._id}>
            {translation.wordOriginal} - {translation.wordTranslated}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
