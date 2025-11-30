import { Pokemon } from '../../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemons: Pokemon[];
  loading: boolean;
  onSelect: (pokemon: Pokemon) => void;
}

export function PokemonGrid({ pokemons, loading, onSelect }: PokemonGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-slate-500">
        <p className="text-lg">No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}
