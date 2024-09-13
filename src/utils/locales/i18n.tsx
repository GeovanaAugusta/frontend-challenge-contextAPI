import en from './en.json';
import pt from './pt.json';

interface Translations {
  [key: string]: { [key: string]: string };
}

const translations: Translations = { en, pt };

const languageMap: { [key: string]: string } = {
  'pt-BR': 'pt',
  'en': 'en-US'
};

let currentLanguage: string = 'en';

export const setLanguage = (lang: string): void => {
  const mappedLang = languageMap[lang] || lang;
  if (translations[mappedLang]) {
    currentLanguage = mappedLang;
  }
};

export const translate = (key: string): string => {
  const cleanedKey = key.trim();
  return translations[currentLanguage][cleanedKey] || cleanedKey;
};

