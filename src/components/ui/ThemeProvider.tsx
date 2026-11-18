'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { readThemePreference, writeThemePreference } from '@/lib/themePreference';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script to prevent flash of wrong theme on load.
 * Reads localStorage before React hydrates and sets the class immediately.
 */
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){var t;try{var c=document.cookie.match(/(?:^|;\\s*)sundae_theme=(light|dark)(?:;|$)/);t=c&&c[1]}catch(e){}if(t!=='light'&&t!=='dark'){try{t=localStorage.getItem('sundae-theme')}catch(e){}}document.documentElement.classList.toggle('light',t==='light')})()`,
      }}
    />
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return readThemePreference();
  });

  useEffect(() => {
    writeThemePreference(theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const sync = () => setTheme(readThemePreference());
    window.addEventListener('pageshow', sync);
    window.addEventListener('focus', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('pageshow', sync);
      window.removeEventListener('focus', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      writeThemePreference(next);
      if (next === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
