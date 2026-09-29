'use client';

import { useLanguage } from '@/context/language-context';

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
    
    if (text === undefined) {
      console.warn(`Translation not found for key: ${fullKey} in language: ${language}`);
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
