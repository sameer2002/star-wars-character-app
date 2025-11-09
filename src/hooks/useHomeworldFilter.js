import { useState, useMemo } from 'react';
import { swapiService } from '../services/swapiService';

/**
 * Hook for homeworld filtering
 */
export const useHomeworldFilter = (characters) => {
  const [homeworldMap, setHomeworldMap] = useState({});
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    const fetchHomeworlds = async () => {
      setLoading(true);
      const map = {};

      for (const character of characters) {
        try {
          if (!map[character.homeworld]) {
            const homeworld = await swapiService.getHomeworld(character.homeworld);
            map[character.homeworld] = homeworld.name;
          }
        } catch (err) {
          map[character.homeworld] = 'Unknown';
        }
      }

      setHomeworldMap(map);
      setLoading(false);
    };

    if (characters.length > 0) {
      fetchHomeworlds();
    }
  }, [characters]);

  return { homeworldMap, loading };
};