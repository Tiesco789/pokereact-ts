import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

/** Fetch a range of Pokémon by national dex IDs [start, end] (inclusive). */
export function usePokemon(start = 1, end = 1025) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPokemons() {
      try {
        setLoading(true);
        setPokemons([]);

        const ids = Array.from({ length: end - start + 1 }, (_, i) => start + i);

        const detailedPokemons = await Promise.all(
          ids.map((id) => axios.get<Pokemon>(`${BASE_URL}/${id}`).then((r) => r.data))
        );

        if (!cancelled) {
          setPokemons(detailedPokemons);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to fetch Pokémon');
          console.error(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPokemons();
    return () => { cancelled = true; };
  }, [start, end]);

  return { pokemons, loading, error };
}
