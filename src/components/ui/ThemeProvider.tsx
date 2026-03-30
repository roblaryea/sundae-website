'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

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
        __html: `(function(){try{var t=localStorage.getItem('sundae-theme');if(t==='light'){document.documentElement.classList.add('light')}else{document.documentElement.classList.remove('light')}}catch(e){}})()`,
      }}
    />
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return localStorage.getItem('sundae-theme') === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('sundae-theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('sundae-theme', next);
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
