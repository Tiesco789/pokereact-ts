import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon, PokemonSpecies, EvolutionChain, EvolutionChainLink } from '../types/pokemon';

export interface EvolutionStep {
  name: string;
  image: string;
  id: number;
}

export function usePokemonDetails(pokemon: Pokemon | null) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemon) {
      setSpecies(null);
      setEvolutionChain([]);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch Species to get Evolution Chain URL and flavor text
        const speciesResponse = await axios.get<PokemonSpecies>(pokemon.species.url);
        setSpecies(speciesResponse.data);

        // 2. Fetch Evolution Chain
        const evolutionResponse = await axios.get<EvolutionChain>(speciesResponse.data.evolution_chain.url);

        // 3. Process Evolution Chain
        const chain: EvolutionStep[] = [];
        let current: EvolutionChainLink | undefined = evolutionResponse.data.chain;

        while (current) {
          const speciesName = current.species.name;
          // We need to fetch the pokemon data to get the image
          // Optimization: We could cache this or use a predictable URL if available, 
          // but fetching ensures we get the correct sprite.
          // For simplicity/speed in this demo, we'll construct the image URL from ID if possible,
          // or just fetch the basic info.
          // The species URL contains the ID: https://pokeapi.co/api/v2/pokemon-species/1/
          const id = parseInt(current.species.url.split('/').filter(Boolean).pop() || '0');

          chain.push({
            name: speciesName,
            id: id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          });

          current = current.evolves_to[0]; // Simplified: only taking the first evolution path
        }

        setEvolutionChain(chain);

      } catch (err) {
        console.error(err);
        setError('Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon]);

  return { species, evolutionChain, loading, error };
}
