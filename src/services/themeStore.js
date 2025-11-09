import { create } from 'zustand';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Zustand store for theme management
 */
export const useThemeStore = create((set) => {
  const { getItem, setItem } = useLocalStorage();

  const savedTheme = getItem('theme') || 'light';

  return {
    theme: savedTheme,

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        setItem('theme', newTheme);
        return { theme: newTheme };
      }),

    setTheme: (theme) => {
      setItem('theme', theme);
      set({ theme });
    },
  };
});