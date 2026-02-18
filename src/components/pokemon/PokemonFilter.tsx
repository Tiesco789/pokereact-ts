import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { GENERATIONS } from '../../lib/generations';

const TYPE_COLORS: Record<string, string> = {
  normal: 'bg-stone-400   text-white',
  fire: 'bg-orange-500  text-white',
  water: 'bg-blue-500    text-white',
  electric: 'bg-yellow-400  text-slate-900',
  grass: 'bg-green-500   text-white',
  ice: 'bg-cyan-400    text-white',
  fighting: 'bg-red-700     text-white',
  poison: 'bg-purple-500  text-white',
  ground: 'bg-yellow-600  text-white',
  flying: 'bg-indigo-400  text-white',
  psychic: 'bg-pink-500    text-white',
  bug: 'bg-lime-500    text-white',
  rock: 'bg-yellow-700  text-white',
  ghost: 'bg-violet-700  text-white',
  dragon: 'bg-indigo-700  text-white',
  dark: 'bg-slate-700   text-white',
  steel: 'bg-slate-400   text-white',
  fairy: 'bg-pink-300    text-slate-900',
};

interface PokemonFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  availableTypes: string[];
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  selectedGenId: number | null;
  onGenChange: (genId: number | null) => void;
}

export function PokemonFilter({
  searchTerm,
  onSearchChange,
  availableTypes,
  selectedType,
  onTypeChange,
  selectedGenId,
  onGenChange,
}: PokemonFilterProps) {
  const pillNeutral =
    'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700';

  return (
    <div className="mb-8 flex flex-col gap-4">
      {/* Search bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 rounded-full border-0 bg-white pl-12 shadow-lg ring-1 ring-slate-100 transition-all focus-visible:ring-2 focus-visible:ring-red-500 dark:bg-slate-800 dark:ring-slate-800"
        />
      </div>

      {/* Generation filter */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Generation</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onGenChange(null)}
            className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${selectedGenId === null
                ? 'bg-red-500 text-white shadow-md'
                : pillNeutral
              }`}
          >
            All
          </button>
          {GENERATIONS.map((gen) => {
            const isSelected = selectedGenId === gen.id;
            return (
              <button
                key={gen.id}
                onClick={() => onGenChange(isSelected ? null : gen.id)}
                title={gen.region}
                className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium transition-all ${isSelected
                    ? 'bg-red-500 text-white shadow-md scale-105'
                    : pillNeutral
                  }`}
              >
                {gen.label}
                <span className="hidden sm:inline text-xs opacity-70">· {gen.region}</span>
                {isSelected && <X className="h-3 w-3" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type filter */}
      {availableTypes.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Type</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onTypeChange(null)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${selectedType === null
                  ? 'bg-red-500 text-white shadow-md'
                  : pillNeutral
                }`}
            >
              All
            </button>
            {availableTypes.map((type) => {
              const isSelected = selectedType === type;
              const colorClass = TYPE_COLORS[type] ?? 'bg-slate-500 text-white';
              return (
                <button
                  key={type}
                  onClick={() => onTypeChange(isSelected ? null : type)}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium capitalize transition-all ${isSelected
                      ? `${colorClass} shadow-md scale-105`
                      : pillNeutral
                    }`}
                >
                  {type}
                  {isSelected && <X className="h-3 w-3" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
