import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { Pokemon, PokemonApiResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';
const BATCH_SIZE = 20;

// Module-level cache: avoids refetching when toggling between generations
const pokemonCache = new Map<string, Pokemon[]>();

/** Fetch a range of Pokémon by national dex IDs [start, end] (inclusive), in batches. */
export function usePokemon(start = 1, end = 1025) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const cacheKey = `${start}-${end}`;

    async function fetchPokemons() {
      // Check cache first
      const cached = pokemonCache.get(cacheKey);
      if (cached) {
        setPokemons(cached);
        setLoading(false);
        setError(null);
        return;
      }

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

        // Step 2: fetch details in batches, collecting all before updating state.
        // The old code called setPokemons() per batch while loading=true, which
        // caused ~50 wasted re-renders (each just re-showing the shimmer skeleton).
        const allResults: Pokemon[] = [];
        for (let i = 0; i < urls.length; i += BATCH_SIZE) {
          if (cancelled) return;
          const batch = urls.slice(i, i + BATCH_SIZE);
          const batchResults = await Promise.all(
            batch.map((url) => axios.get<Pokemon>(url).then((r) => r.data))
          );
          allResults.push(...batchResults);
        }

        if (!cancelled) {
          // Sort by ID to ensure consistent order
          allResults.sort((a, b) => a.id - b.id);
          // Cache results for future use
          pokemonCache.set(cacheKey, allResults);
          // Single state update instead of per-batch updates
          setPokemons(allResults);
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

  // Stable return reference: avoids creating a new object every render
  // which would invalidate downstream useMemo/useEffect dependencies
  return useMemo(() => ({ pokemons, loading, error }), [pokemons, loading, error]);
}
