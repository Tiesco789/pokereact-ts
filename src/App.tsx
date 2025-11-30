import { useState, useMemo } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { PokemonGrid } from './components/pokemon/PokemonGrid';
import { PokemonFilter } from './components/pokemon/PokemonFilter';
import { PokemonDetailPanel } from './components/pokemon/PokemonDetailPanel';
import { Pokemon } from './types/pokemon';
import { Ghost } from 'lucide-react';

function App() {
  const { pokemons, loading, error } = usePokemon(151);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemons, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col items-center text-center relative">
          <div className="mb-4 rounded-full bg-red-500 p-4 text-white shadow-lg">
            <Ghost className="h-8 w-8" />
          </div>
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl">
            PokeReact <span className="text-red-500">19</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Modern Pokedex built with React 19 & Tailwind CSS
          </p>
        </header>

        <main>
          <PokemonFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {error ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-900/20">
              {error}
            </div>
          ) : (
            <PokemonGrid
              pokemons={filteredPokemons}
              loading={loading}
              onSelect={setSelectedPokemon}
            />
          )}
        </main>

        <PokemonDetailPanel
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      </div>
    </div>
  );
}

export default App;
