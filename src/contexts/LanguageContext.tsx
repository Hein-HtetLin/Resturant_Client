'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  getTranslation: (data: { [key: string]: string } | undefined, key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<string>('en'); // Initialize with a default value

    useEffect(() => {
      const storedLanguage = localStorage.getItem('language');
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }, []); // Run only once on the client side

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const getTranslation = (data: { [key: string]: string } | undefined, key: string): string => {
    if (!data) return key;
    console.log(key);
    return data[key] || data['en'] || key; // Fallback to 'en' then key
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};