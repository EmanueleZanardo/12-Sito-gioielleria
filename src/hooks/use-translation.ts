'use client';

import { useLanguage } from '@/context/language-context';
// Bundle italiano per il fallback: se una chiave manca nella lingua attiva,
// si mostra l'italiano (lingua primaria del sito) invece della chiave grezza.
// L'import è condiviso con language-context, nessun costo aggiuntivo di bundle.
import itTranslations from '@/locales/it.json';

type Params = { [key: string]: string | number };

const get = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const useTranslation = (namespace?: string) => {
  const { language, translations } = useLanguage();

  const getTranslatedString = (key: string, params?: Params) => {
    let fullKey = key;
    if (namespace) {
      fullKey = `${namespace}.${key}`;
    }

    let text: string | undefined = get(translations, fullKey);

    if (text === undefined && language !== 'it') {
      // Fallback alla lingua primaria: una stringa in italiano è sempre
      // meglio della chiave grezza (es. "home.gallery.eyebrow") mostrata
      // al visitatore.
      text = get(itTranslations, fullKey);
    }

    if (text === undefined) {
      console.warn(`Translation not found for key: ${fullKey} in language: ${language} (fallback it assente)`);
      text = fullKey;
    }


    if (params && typeof text === 'string') {
        Object.keys(params).forEach(paramKey => {
            const regex = new RegExp(`{{${paramKey}}}`, 'g');
            text = text!.replace(regex, String(params[paramKey]));
        });
    }

    return text || '';
  };

  const t = (key: string, params?: Params) => getTranslatedString(key, params);

  return { t, language };
};
