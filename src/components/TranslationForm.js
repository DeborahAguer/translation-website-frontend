// import React, { useState } from 'react';
// import { addTranslation } from '../services/translationService';

// const TranslationForm = ({ onAddTranslation }) => {
//   const [formData, setFormData] = useState({
//     wordOriginal: '',
//     wordTranslated: '',
//     languageFrom: '',
//     languageTo: '',
//   });

//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors

//     const { wordOriginal, wordTranslated, languageFrom, languageTo } = formData;


//     if (!wordOriginal || !wordTranslated || !languageFrom || !languageTo) {
//       setError('All fields are required.');
//       return;
//     }

//     try {
//       await addTranslation(formData); // Call API service
//       onAddTranslation(formData); // Trigger callback to update parent state
//       setFormData({ wordOriginal: '', wordTranslated: '', languageFrom: '', languageTo: '' }); // Reset form
//     } catch (error) {
//       setError('Failed to add translation. Please try again.');
//     }
//   };

//   return (
//     <div className="translation-form">
//       <h2>Add New Translation</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="wordOriginal">Original Word</label>
//           <input
//             type="text"
//             id="wordOriginal"
//             name="wordOriginal"
//             value={formData.wordOriginal}
//             onChange={handleChange}
//             placeholder="Enter original word"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="wordTranslated">Translated Word</label>
//           <input
//             type="text"
//             id="wordTranslated"
//             name="wordTranslated"
//             value={formData.wordTranslated}
//             onChange={handleChange}
//             placeholder="Enter translated word"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="languageFrom">Language From</label>
//           <input
//             type="text"
//             id="languageFrom"
//             name="languageFrom"
//             value={formData.languageFrom}
//             onChange={handleChange}
//             placeholder="Enter original language"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="languageTo">Language To</label>
//           <input
//             type="text"
//             id="languageTo"
//             name="languageTo"
//             value={formData.languageTo}
//             onChange={handleChange}
//             placeholder="Enter target language"
//             required
//           />
//         </div>
//         <button type="submit">Add Translation</button>
//       </form>
//     </div>
//   );
// };

// export default TranslationForm;
import React, { useState } from 'react';
import { addTranslation } from '../services/translationService';
import './TranslationForm.css'; // Importing the styles

const TranslationForm = ({ onAddTranslation }) => {
  const [formData, setFormData] = useState({
    wordOriginal: '',
    wordTranslated: '',
    languageFrom: '',
    languageTo: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage(''); // Clear any previous success messages

    const { wordOriginal, wordTranslated, languageFrom, languageTo } = formData;

    if (!wordOriginal || !wordTranslated || !languageFrom || !languageTo) {
      setError('All fields are required.');
      return;
    }

    try {
      await addTranslation(formData); // Call API service
      onAddTranslation(formData); // Trigger callback to update parent state
      setFormData({ wordOriginal: '', wordTranslated: '', languageFrom: '', languageTo: '' }); // Reset form
      setSuccessMessage('Translation added successfully!');
    } catch (error) {
      setError('Failed to add translation. Please try again.');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="main-container">
      <header className="header">
        <h1>Welcome</h1>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          ) : (
            <>
              <button className="login-btn" onClick={handleLogin}>
                Log In
              </button>
              <button className="register-btn">
                Register
              </button>
            </>
          )}
        </div>
      </header>

      <div className="content-container">
        <section className="form-section">
          <h2>Add a New Translation</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="wordOriginal">Original Word</label>
              <input
                type="text"
                id="wordOriginal"
                name="wordOriginal"
                value={formData.wordOriginal}
                onChange={handleChange}
                placeholder="Enter the word in the original language"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="wordTranslated">Translated Word</label>
              <input
                type="text"
                id="wordTranslated"
                name="wordTranslated"
                value={formData.wordTranslated}
                onChange={handleChange}
                placeholder="Enter the translated word"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="languageFrom">Language From</label>
              <input
                type="text"
                id="languageFrom"
                name="languageFrom"
                value={formData.languageFrom}
                onChange={handleChange}
                placeholder="Enter the language of the original word"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="languageTo">Language To</label>
              <input
                type="text"
                id="languageTo"
                name="languageTo"
                value={formData.languageTo}
                onChange={handleChange}
                placeholder="Enter the language to which it is translated"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">Add Translation</button>
            </div>
          </form>
        </section>

        <section className="translations-section">
          <h3>Translations</h3>
          {/* You can map through translations and display them here */}
          <ul>
            <li>Translation 1</li>
            <li>Translation 2</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default TranslationForm;
