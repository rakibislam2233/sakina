'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_THEME,
  getThemeById,
  normalizeThemeId,
  SAKINA_THEMES,
  type SakinaTheme,
  type SakinaThemeId,
} from '@/lib/themes';

interface ThemeContextType {
  theme: SakinaThemeId;
  themeConfig: SakinaTheme;
  themes: SakinaTheme[];
  setTheme: (id: SakinaThemeId) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'sakina_theme';

function applyTheme(id: SakinaThemeId) {
  document.documentElement.setAttribute('data-theme', id);
  localStorage.setItem(STORAGE_KEY, id);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<SakinaThemeId>(DEFAULT_THEME);

  useEffect(() => {
    const saved = normalizeThemeId(localStorage.getItem(STORAGE_KEY));
    setThemeState(saved);
    applyTheme(saved);
  }, []);

  const setTheme = useCallback((id: SakinaThemeId) => {
    setThemeState(id);
    applyTheme(id);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'parchment' || theme === 'dawn' ? 'night' : 'parchment');
  }, [theme, setTheme]);

  const themeConfig = getThemeById(theme);
  const isDarkMode = theme === 'night' || theme === 'forest' || theme === 'ocean';

  return (
    <ThemeContext.Provider
      value={{ theme, themeConfig, themes: SAKINA_THEMES, setTheme, isDarkMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
