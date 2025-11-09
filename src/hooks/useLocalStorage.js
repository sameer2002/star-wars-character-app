/**
 * Hook for localStorage operations
 * @returns {{getItem: Function, setItem: Function, removeItem: Function}}
 */
export const useLocalStorage = () => {
    const getItem = (key) => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? item : null;
        } catch {
            return null;
        }
    };

    const setItem = (key, value) => {
        try {
            window.localStorage.setItem(key, value);
        } catch {
            console.error('Failed to set item in localStorage');
        }
    };

    const removeItem = (key) => {
        try {
            window.localStorage.removeItem(key);
        } catch {
            console.error('Failed to remove item from localStorage');
        }
    };

    return { getItem, setItem, removeItem };
};