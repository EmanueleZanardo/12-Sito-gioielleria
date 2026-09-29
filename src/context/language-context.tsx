'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

import en from '@/locales/en.json';
import it from '@/locales/it.json';
import fr from '@/locales/fr.json';
import de from '@/locales/de.json';

const translations: Record<string, any> = { en, it, fr, de };

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('it');
  
  useEffect(() => {
    // You can also sync this with localStorage or a user setting
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    translations: translations[language] || translations.it,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
