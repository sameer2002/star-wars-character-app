import axios from 'axios';

const API_BASE = 'https://swapi.dev/api';

export const swapiService = {
    /**
     * Fetch characters from SWAPI
     * @param {number} page - Page number
     * @returns {Promise<Object>}
     */
    async getCharacters(page = 1) {
        const response = await axios.get(`${API_BASE}/people/?page=${page}`);
        return response.data;
    },

    /**
     * Get character details
     * @param {string} url - Character URL
     * @returns {Promise<Object>}
     */
    async getCharacterDetails(url) {
        const response = await axios.get(url);
        return response.data;
    },

    /**
     * Get homeworld details
     * @param {string} url - Homeworld URL
     * @returns {Promise<Object>}
     */
    async getHomeworld(url) {
        const response = await axios.get(url);
        return response.data;
    },

    /**
     * Get species details
     * @param {string} url - Species URL
     * @returns {Promise<Object>}
     */
    async getSpecies(url) {
        const response = await axios.get(url);
        return response.data;
    },

    /**
     * Get films count for character
     * @param {Object} character - Character object
     * @returns {Promise<number>}
     */
    async getFilmsCount(character) {
        return character.films.length;
    },
};