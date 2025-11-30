import { X, Ruler, Weight, Activity } from 'lucide-react';
import { Pokemon } from '../../types/pokemon';
import { usePokemonDetails } from '../../hooks/usePokemonDetails';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

interface PokemonDetailPanelProps {
  pokemon: Pokemon | null;
  onClose: () => void;
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

export function PokemonDetailPanel({ pokemon, onClose }: PokemonDetailPanelProps) {
  const { species, evolutionChain, loading } = usePokemonDetails(pokemon);

  if (!pokemon) return null;

  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const colorClass = typeColors[mainType] || 'bg-gray-400';

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm transition-all" onClick={onClose}>
      <div
        className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl dark:bg-slate-900 sm:w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize text-slate-900 dark:text-white">
            {pokemon.name}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className={cn("relative mb-8 flex items-center justify-center rounded-2xl p-8", colorClass)}>
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="h-48 w-48 object-contain drop-shadow-lg"
          />
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={cn(
                "rounded-full px-4 py-1 text-sm font-bold text-white uppercase tracking-wider",
                typeColors[type.type.name] || 'bg-gray-400'
              )}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <Ruler className="mb-2 h-5 w-5 text-slate-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{pokemon.height / 10}m</span>
            <span className="text-xs text-slate-500">Height</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <Weight className="mb-2 h-5 w-5 text-slate-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">{pokemon.weight / 10}kg</span>
            <span className="text-xs text-slate-500">Weight</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
            <Activity className="mb-2 h-5 w-5 text-slate-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {pokemon.stats[0]?.base_stat || 0}
            </span>
            <span className="text-xs text-slate-500">HP</span>
          </div>
        </div>

        {species && (
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">About</h3>
            <p className="text-slate-600 dark:text-slate-300">
              {species.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text.replace(/\f/g, ' ')}
            </p>
          </div>
        )}

        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Base Stats</h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium capitalize text-slate-500 dark:text-slate-400">
                  {stat.stat.name.replace('-', ' ')}
                </span>
                <span className="w-8 text-sm font-bold text-slate-900 dark:text-white">
                  {stat.base_stat}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={cn("h-full rounded-full transition-all duration-500", colorClass)}
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
          </div>
        ) : (
          <div>
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Evolution Chain</h3>
            <div className="flex items-center justify-between gap-2">
              {evolutionChain.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className="relative mb-2 h-20 w-20 rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                    <img
                      src={step.image}
                      alt={step.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="text-xs font-medium capitalize text-slate-600 dark:text-slate-400">
                    {step.name}
                  </span>
                  {index < evolutionChain.length - 1 && (
                    <div className="absolute left-1/2 hidden h-0.5 w-8 bg-slate-200 dark:bg-slate-700 sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
