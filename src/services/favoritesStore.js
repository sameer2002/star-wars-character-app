import { create } from 'zustand';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Zustand store for favorites management
 */
export const useFavoritesStore = create((set) => {
  const { getItem, setItem } = useLocalStorage();

  // Load favorites from localStorage on init
  const savedFavorites = getItem('favorites');
  const initialFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

  return {
    favorites: initialFavorites,

    addFavorite: (character) =>
      set((state) => {
        const updated = [...state.favorites, character];
        setItem('favorites', JSON.stringify(updated));
        return { favorites: updated };
      }),

    removeFavorite: (characterUrl) =>
      set((state) => {
        const updated = state.favorites.filter((char) => char.url !== characterUrl);
        setItem('favorites', JSON.stringify(updated));
        return { favorites: updated };
      }),

    isFavorite: (characterUrl) =>
      (state) => state.favorites.some((char) => char.url === characterUrl),

    clearFavorites: () => {
      setItem('favorites', JSON.stringify([]));
      set({ favorites: [] });
    },
  };
});