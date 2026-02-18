import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon, PokemonApiResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const BATCH_SIZE = 20;

/** Fetch a range of Pokémon by national dex IDs [start, end] (inclusive), in batches. */
export function usePokemon(start = 1, end = 1025) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchPokemons() {
      try {
        setLoading(true);
        setError(null);
        setPokemons([]);

        const count = end - start + 1;
        const offset = start - 1; // PokeAPI is 0-indexed for offset

        // Step 1: single list call to get all URLs for this range
        const listRes = await axios.get<PokemonApiResponse>(
          `${BASE_URL}?limit=${count}&offset=${offset}`
        );
        if (cancelled) return;

        const urls = listRes.data.results.map((r) => r.url);

        // Step 2: fetch details in batches, streaming results in as they arrive
        const accumulated: Pokemon[] = [];
        for (let i = 0; i < urls.length; i += BATCH_SIZE) {
          if (cancelled) return;
          const batch = urls.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.all(
            batch.map((url) => axios.get<Pokemon>(url).then((r) => r.data))
          );
          accumulated.push(...batchResults);
          if (!cancelled) setPokemons([...accumulated]);
        }

        if (!cancelled) setError(null);
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
