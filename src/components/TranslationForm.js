import React, { useState } from 'react';
import axios from 'axios';

const TranslationPage = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');

  const handleTranslate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        sourceLanguage: sourceLang,
        targetLanguage: targetLang,
        text,
      });
      setTranslatedText(response.data.translation);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div className="w-full bg-gray-200 p-8 flex flex-col items-center">
      {/* Welcome Section */}
      <div className="flex items-center mb-6">
        <img
          src="logo.jpg"
          alt="Dinkaslate Logo"
          className="h-12 w-auto"
        />
        <h1 className="text-6xl font-bold ml-4">Dinkaslate</h1>
      </div>
      <p className="text-lg mb-6 text-center">
        Welcome to Dinkaslate! Our app provides seamless translation services to bridge language barriers. 
        Start translating text effortlessly.
      </p>

      {/* Translation Form */}
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Translation App</h2>
        <form onSubmit={handleTranslate}>
          <div className="mb-6">
            <label htmlFor="textToTranslate" className="block text-lg font-medium">
              Text to Translate:
              <input
                type="text"
                id="textToTranslate" // Added id
                name="textToTranslate" // Added name
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-2 block w-full p-4 border rounded-lg"
                placeholder="Enter text"
              />
            </label>
          </div>
          <div className="flex space-x-4 mb-6">
            <div className="w-1/2">
              <label htmlFor="sourceLanguage" className="block text-lg font-medium">Source Language:</label>
              <select
                id="sourceLanguage" 
                name="sourceLanguage" 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="mt-2 block w-full p-4 border rounded-lg"
              >
                <option value="en">English</option>
                <option value="dk">Dinka</option>
                <option value="kis">Kiswahili</option>
              </select>
            </div>
            <div className="w-1/2">
              <label htmlFor="targetLanguage" className="block text-lg font-medium">Target Language:</label>
              <select
                id="targetLanguage"
                name="targetLanguage" 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="mt-2 block w-full p-4 border rounded-lg"
              >
                <option value="en">English</option>
                <option value="dk">Dinka</option>
                <option value="kis">Kiswahili</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg"
          >
            Translate
          </button>
        </form>
        {translatedText && (
          <div className="mt-6 p-6 bg-gray-100 rounded-lg">
            <h2 className="font-semibold text-xl">Translation:</h2>
            <p className="mt-2 text-lg">{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslationPage;
