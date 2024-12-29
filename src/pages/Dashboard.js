// import React, { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { TranslationContext } from '../context/TranslationContext';

// const Dashboard = () => {
//   const { user, handleLogout } = useContext(AuthContext);
//   const { translations, handleAddTranslation } = useContext(TranslationContext);
  
//   const [newTranslation, setNewTranslation] = useState({
//     wordOriginal: '',
//     wordTranslated: '',
//     languageFrom: '',
//     languageTo: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewTranslation({ ...newTranslation, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleAddTranslation(newTranslation);
//     setNewTranslation({
//       wordOriginal: '',
//       wordTranslated: '',
//       languageFrom: '',
//       languageTo: ''
//     });
//   };

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {user ? (
//         <div>
//           <p>Welcome, {user.username}</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <p>You are not logged in.</p>
//       )}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="wordOriginal"
//           value={newTranslation.wordOriginal}
//           onChange={handleChange}
//           placeholder="Original Word"
//         />
//         <input
//           type="text"
//           name="wordTranslated"
//           value={newTranslation.wordTranslated}
//           onChange={handleChange}
//           placeholder="Translated Word"
//         />
//         <input
//           type="text"
//           name="languageFrom"
//           value={newTranslation.languageFrom}
//           onChange={handleChange}
//           placeholder="From Language"
//         />
//         <input
//           type="text"
//           name="languageTo"
//           value={newTranslation.languageTo}
//           onChange={handleChange}
//           placeholder="To Language"
//         />
//         <button type="submit">Add Translation</button>
//       </form>

//       <h3>Translations</h3>
//       <ul>
//         {translations.map((translation) => (
//           <li key={translation._id}>
//             {translation.wordOriginal} - {translation.wordTranslated}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useContext } from 'react';
import { TranslationContext } from '../context/TranslationContext';  // Assuming you have TranslationContext
import './Dashboard.css';  // Import the CSS file

const TranslationPage = () => {
  // State to handle form data
  const [formData, setFormData] = useState({
    wordOriginal: '',
    wordTranslated: '',
    languageFrom: '',
    languageTo: '',
  });

  const [searchResults, setSearchResults] = useState(null);  // To store search results
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Destructuring TranslationContext
  const { handleAddTranslation, searchTranslation } = useContext(TranslationContext);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const { wordOriginal, languageFrom, languageTo } = formData;

    // Search for existing translation in the system
    const result = searchTranslation(wordOriginal, languageFrom, languageTo);
    if (result) {
      setSearchResults(result);
      setErrorMessage(''); // Clear error if translation is found
    } else {
      setSearchResults(null);
      setErrorMessage('Translation not found. You can add it.');
    }
  };

  // Handle adding a new translation
  const handleAddSubmit = (e) => {
    e.preventDefault();
    const { wordOriginal, wordTranslated, languageFrom, languageTo } = formData;

    // Validate form before submitting
    if (!wordOriginal || !wordTranslated || !languageFrom || !languageTo) {
      setErrorMessage('All fields are required.');
      return;
    }

    handleAddTranslation(formData);  // Add new translation via context
    setSuccessMessage('Translation added successfully!');
    setErrorMessage('');  // Clear any previous error
    setFormData({ wordOriginal: '', wordTranslated: '', languageFrom: '', languageTo: '' });  // Reset form data
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
              value={formData.languageFrom}
              onChange={handleChange}
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
              value={formData.languageTo}
              onChange={handleChange}
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
              value={formData.wordOriginal}
              onChange={handleChange}
              placeholder="Enter the word to search"
              required
            />
          </div>

          <button type="submit">Search Translation</button>
        </fieldset>
      </form>

      {/* Display the translation result or error */}
      {searchResults && (
        <div>
          <h4>Translation Found:</h4>
          <p>{searchResults.wordOriginal} - {searchResults.wordTranslated}</p>
        </div>
      )}

      {errorMessage && <p>{errorMessage}</p>}

      {/* Add a new translation form */}
      <form onSubmit={handleAddSubmit}>
        <fieldset>
          <h3>Add a New Translation</h3>
          <div>
            <label htmlFor="wordOriginal">Original Word:</label>
            <input
              type="text"
              name="wordOriginal"
              value={formData.wordOriginal}
              onChange={handleChange}
              placeholder="Enter the word in the original language"
              required
            />
          </div>

          <div>
            <label htmlFor="wordTranslated">Translated Word:</label>
            <input
              type="text"
              name="wordTranslated"
              value={formData.wordTranslated}
              onChange={handleChange}
              placeholder="Enter the translated word"
              required
            />
          </div>

          <div>
            <label htmlFor="languageFrom">Language From:</label>
            <select
              name="languageFrom"
              value={formData.languageFrom}
              onChange={handleChange}
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
              value={formData.languageTo}
              onChange={handleChange}
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

      {/* Display success and error messages */}
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TranslationPage;
