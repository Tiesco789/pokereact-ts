import { Pokemon } from '../../types/pokemon';
import { cn } from '../../lib/utils';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const typeColors: Record<string, string> = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-300',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const colorClass = typeColors[mainType] || 'bg-gray-400';

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer border border-slate-100",
        "dark:bg-slate-900 dark:border-slate-800"
      )}
      onClick={() => onClick?.(pokemon)}
    >
      <div className={cn("absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-20", colorClass)} />

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 relative h-32 w-32">
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="h-full w-full object-contain drop-shadow-md transition-transform group-hover:scale-110"
            loading="lazy"
          />
        </div>

        <span className="mb-1 text-xs font-bold text-slate-400">
          #{String(pokemon.id).padStart(3, '0')}
        </span>

        <h3 className="mb-2 text-lg font-bold capitalize text-slate-800 dark:text-slate-100">
          {pokemon.name}
        </h3>

        <div className="flex gap-2">
          {pokemon.types?.map((type: any) => (
            <span
              key={type.type.name}
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider",
                typeColors[type.type.name] || 'bg-gray-400'
              )}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
