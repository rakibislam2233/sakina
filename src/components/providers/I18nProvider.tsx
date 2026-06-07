'use client';

import { useEffect, useState } from 'react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import en from '@/locales/en.json';
import bn from '@/locales/bn.json';

let initialized = false;

function applyLanguage(lang: string) {
  document.documentElement.lang = lang;
  document.documentElement.classList.toggle('lang-bn', lang === 'bn');
}

function initI18n() {
  if (initialized) return;
  const savedLang = typeof window !== 'undefined' ? localStorage.getItem('sakina_lang') || 'en' : 'en';

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

  applyLanguage(savedLang);
  initialized = true;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initI18n();
    setReady(true);

    const onLanguageChanged = (lang: string) => {
      applyLanguage(lang);
      localStorage.setItem('sakina_lang', lang);
    };

    i18n.on('languageChanged', onLanguageChanged);
    return () => {
      i18n.off('languageChanged', onLanguageChanged);
    };
  }, []);

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
