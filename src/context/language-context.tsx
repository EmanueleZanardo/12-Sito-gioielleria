'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

import en from '@/locales/en.json';
import it from '@/locales/it.json';
import fr from '@/locales/fr.json';
import de from '@/locales/de.json';

const translations: Record<string, any> = { en, it, fr, de };

// La lingua scelta dal visitatore viene ricordata tra le visite: al primo
// mount si rilegge la preferenza salvata, ad ogni cambio si riscrive.
// Chiave namespaced per non collidere con altri siti sullo stesso dominio.
const LANGUAGE_STORAGE_KEY = 'gdc-jewellery-lab:language';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  translations: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState('it');

  // Ripristina la lingua scelta in una visita precedente (solo client).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && translations[stored]) {
        setLanguage(stored);
      }
    } catch {
      // localStorage non disponibile (es. navigazione privata restrittiva):
      // si resta sulla lingua di default senza rompere nulla.
    }
  }, []);

  useEffect(() => {
    // You can also sync this with localStorage or a user setting
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // scrittura non disponibile: la preferenza non viene persistita,
      // il sito continua a funzionare con la lingua corrente.
    }
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
