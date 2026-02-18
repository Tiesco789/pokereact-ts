import { useState, useMemo, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { usePokemon } from './hooks/usePokemon';
import { PokemonGrid } from './components/pokemon/PokemonGrid';
import { PokemonFilter } from './components/pokemon/PokemonFilter';
import { PokemonDetailPanel } from './components/pokemon/PokemonDetailPanel';
import { Pagination } from './components/ui/Pagination';
import { GENERATIONS } from './lib/generations';
import { Pokemon } from './types/pokemon';
import { Ghost } from 'lucide-react';

const PAGE_SIZE_DEFAULT = 100;

function App() {
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const headerTextRef = useRef<HTMLDivElement>(null);

  // Header entrance animation on mount
  useEffect(() => {
    if (headerLogoRef.current) {
      animate(headerLogoRef.current, {
        scale: [0, 1],
        opacity: [0, 1],
        duration: 700,
        ease: 'outBack(1.7)',
      });
    }
    if (headerTextRef.current) {
      const children = Array.from(headerTextRef.current.children) as HTMLElement[];
      animate(children, {
        translateY: [30, 0],
        opacity: [0, 1],
        delay: stagger(120, { start: 200 }),
        duration: 600,
        ease: 'outExpo',
      });
    }
  }, []);

  // Generation filter — drives which ID range is fetched
  const [selectedGenId, setSelectedGenId] = useState<number | null>(null);

  const genRange = useMemo(() => {
    if (selectedGenId === null) return { start: 1, end: 1025 };
    const gen = GENERATIONS.find((g) => g.id === selectedGenId)!;
    return { start: gen.start, end: gen.end };
  }, [selectedGenId]);

  const { pokemons, loading, error } = usePokemon(genRange.start, genRange.end);

  // Search + type filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT);

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Reset page when filters change
  const handleSearchChange = (v: string) => { setSearchTerm(v); setCurrentPage(1); };
  const handleTypeChange = (t: string | null) => { setSelectedType(t); setCurrentPage(1); };
  const handleGenChange = (id: number | null) => {
    setSelectedGenId(id);
    setSelectedType(null);
    setCurrentPage(1);
  };

  // Collect unique types from the currently loaded generation
  const availableTypes = useMemo(() => {
    const typeSet = new Set<string>();
    pokemons.forEach((p) => p.types.forEach((t) => typeSet.add(t.type.name)));
    return Array.from(typeSet).sort();
  }, [pokemons]);

  // Apply search + type filters
  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        selectedType === null || pokemon.types.some((t) => t.type.name === selectedType);
      return matchesSearch && matchesType;
    });
  }, [pokemons, searchTerm, selectedType]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filteredPokemons.length / pageSize));
  const pagedPokemons = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPokemons.slice(start, start + pageSize);
  }, [filteredPokemons, currentPage, pageSize]);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col items-center text-center relative">
          <div
            ref={headerLogoRef}
            style={{ opacity: 0, transform: 'scale(0)' }}
            className="mb-4 rounded-full bg-red-500 p-4 text-white shadow-lg"
          >
            <Ghost className="h-8 w-8" />
          </div>
          <div ref={headerTextRef}>
            <h1 className="mb-2 text-4xl font-extrabold tracking-tight lg:text-5xl" style={{ opacity: 0 }}>
              PokeReact <span className="text-red-500">19</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400" style={{ opacity: 0 }}>
              Modern Pokédex built with React 19 &amp; Tailwind CSS
            </p>
          </div>
        </header>

        <main>
          <PokemonFilter
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            availableTypes={availableTypes}
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
            selectedGenId={selectedGenId}
            onGenChange={handleGenChange}
          />

          {error ? (
            <div className="rounded-lg bg-red-50 p-4 text-red-500 dark:bg-red-900/20">
              {error}
            </div>
          ) : (
            <>
              <PokemonGrid
                pokemons={pagedPokemons}
                loading={loading}
                onSelect={setSelectedPokemon}
              />

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={(size) => { setPageSize(size); setCurrentPage(1); }}
                totalItems={filteredPokemons.length}
              />
            </>
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
