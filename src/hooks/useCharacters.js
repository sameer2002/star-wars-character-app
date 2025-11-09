import { useState, useEffect } from 'react';
import { swapiService } from '../services/swapiService';

/**
 * Hook to fetch characters
 * @param {number} page - Current page
 * @returns {{characters: Array, loading: boolean, error: string|null, nextPage: string|null, prevPage: string|null, totalCount: number}}
 */
export const useCharacters = (page = 1) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await swapiService.getCharacters(page);
                setCharacters(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);
                setTotalCount(data.count);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch characters');
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [page]);

    return { characters, loading, error, nextPage, prevPage, totalCount };
};

/**
 * Hook to fetch character details
 * @param {Object} character - Character object
 * @returns {{homeworld: Object|null, species: Object|null, filmsCount: number, loading: boolean}}
 */
export const useCharacterDetails = (character) => {
    const [homeworld, setHomeworld] = useState(null);
    const [species, setSpecies] = useState(null);
    const [filmsCount, setFilmsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [hw, sp, films] = await Promise.all([
                    swapiService.getHomeworld(character.homeworld),
                    character.species[0] ? swapiService.getSpecies(character.species[0]) : Promise.resolve(null),
                    swapiService.getFilmsCount(character),
                ]);
                setHomeworld(hw);
                setSpecies(sp);
                setFilmsCount(films);
            } catch (err) {
                console.error('Failed to fetch character details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [character]);

    return { homeworld, species, filmsCount, loading };
};