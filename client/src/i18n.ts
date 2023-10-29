import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import portuguese_translation from './locales/portuguese.json';
import english_translation from './locales/english.json';

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: true,
        fallbackLng: 'pt',
        interpolation: {
            escapeValue: false,
        },
        lng: 'pt',
        resources: {
            pt: portuguese_translation,
            en: english_translation,
        },
    });

export default i18n;
