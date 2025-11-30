import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Pokemon, PokemonApiResponse } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export function usePokemon(limit = 151) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemons = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get<PokemonApiResponse>(`${BASE_URL}?limit=${limit}`);

      // We need to fetch details for each pokemon to get the image and types
      // The list endpoint only returns name and url
      const results = response.data.results;

      const detailedPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return detailResponse.data;
        })
      );

      setPokemons(detailedPokemons);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pokemons');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return { pokemons, loading, error };
}
