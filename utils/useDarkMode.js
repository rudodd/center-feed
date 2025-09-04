// import library functionality
import { useEffect, useState } from 'react';

/**
 * Custom hook for tracking the user preference for color scheme ************************************
 */

export function useDarkMode() {

  const [prefersDarkMode, setPrefersDarkMode] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setDarkMode = () => setPrefersDarkMode(mediaQuery.matches);
    setDarkMode();
    mediaQuery.addEventListener('change', setDarkMode);
    
    return () => mediaQuery.removeEventListener('change', setDarkMode);
  }, []);

  return { prefersDarkMode }
}