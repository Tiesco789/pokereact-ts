import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon, PokemonSpecies, EvolutionChain, EvolutionChainLink } from '../types/pokemon';

export interface EvolutionStep {
  name: string;
  image: string;
  id: number;
}

/** A node in the evolution tree. `evolutions` holds all possible next forms. */
export interface EvolutionNode {
  name: string;
  id: number;
  image: string;
  /** Trigger label, e.g. "Fire Stone", "Level 36", "Friendship" */
  trigger?: string;
  evolutions: EvolutionNode[];
}

function extractTrigger(link: EvolutionChainLink): string | undefined {
  const detail = link.evolution_details?.[0];
  if (!detail) return undefined;

  const itemName = detail.item?.name?.replace(/-/g, ' ');
  if (itemName) return itemName;

  if (detail.trigger?.name === 'level-up') {
    if (detail.min_level) return `Lv. ${detail.min_level}`;
    if (detail.min_happiness) return 'Friendship';
    if (detail.time_of_day) return `${detail.time_of_day} (friendship)`;
    return 'Level up';
  }
  if (detail.trigger?.name === 'trade') return 'Trade';
  return detail.trigger?.name?.replace(/-/g, ' ');
}

function buildTree(link: EvolutionChainLink): EvolutionNode {
  const id = parseInt(link.species.url.split('/').filter(Boolean).pop() || '0');
  return {
    name: link.species.name,
    id,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    trigger: extractTrigger(link),
    evolutions: link.evolves_to.map(buildTree),
  };
}

export function usePokemonDetails(pokemon: Pokemon | null) {
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evolutionTree, setEvolutionTree] = useState<EvolutionNode | null>(null);
  /** Flat chain kept for backwards compat (linear evolutions) */
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pokemon) {
      setSpecies(null);
      setEvolutionChain([]);
      setEvolutionTree(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const speciesResponse = await axios.get<PokemonSpecies>(pokemon.species.url);
        setSpecies(speciesResponse.data);

        const evolutionResponse = await axios.get<EvolutionChain>(
          speciesResponse.data.evolution_chain.url
        );

        const tree = buildTree(evolutionResponse.data.chain);
        setEvolutionTree(tree);

        // Build flat chain for simple linear cases
        const flat: EvolutionStep[] = [];
        let cur: EvolutionNode | undefined = tree;
        while (cur) {
          flat.push({ name: cur.name, id: cur.id, image: cur.image });
          cur = cur.evolutions[0];
        }
        setEvolutionChain(flat);
      } catch (err) {
        console.error(err);
        setError('Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon]);

  return { species, evolutionChain, evolutionTree, loading, error };
}
