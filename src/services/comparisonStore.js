import { create } from 'zustand';

/**
 * Zustand store for character comparison
 */
export const useComparisonStore = create((set) => ({
  selectedCharacters: [],

  addCharacterToCompare: (character) =>
    set((state) => {
      if (state.selectedCharacters.length >= 2) {
        return state;
      }
      return {
        selectedCharacters: [...state.selectedCharacters, character],
      };
    }),

  removeCharacterFromCompare: (characterUrl) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (char) => char.url !== characterUrl
      ),
    })),

  clearComparison: () => set({ selectedCharacters: [] }),

  isComparing: (characterUrl) =>
    (state) => state.selectedCharacters.some((char) => char.url === characterUrl),
}));