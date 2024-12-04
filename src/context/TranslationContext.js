import React, { createContext, useState, useEffect } from 'react';
import { getTranslations, addTranslation } from '../services/translationService';

const TranslationContext = createContext();

const TranslationProvider = ({ children }) => {
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch translations when the component mounts
  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const data = await getTranslations();
        setTranslations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching translations:', error);
        setLoading(false);
      }
    };

    fetchTranslations();
  }, []);

  const handleAddTranslation = async (translationData) => {
    try {
      await addTranslation(translationData);
      const newTranslations = await getTranslations(); // Fetch updated list
      setTranslations(newTranslations);
    } catch (error) {
      console.error('Error adding translation:', error);
    }
  };

  return (
    <TranslationContext.Provider
      value={{
        translations,
        loading,
        handleAddTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export { TranslationProvider, TranslationContext };
