import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Pokemon } from '../../types/pokemon';
import { PokemonCard } from './PokemonCard';

interface PokemonGridProps {
  pokemons: Pokemon[];
  loading: boolean;
  onSelect: (pokemon: Pokemon) => void;
}

/** Shimmer skeleton card */
function ShimmerCard() {
  return (
    <div className="rounded-xl bg-white border border-slate-100 p-4 dark:bg-slate-900 dark:border-slate-800 overflow-hidden">
      {/* Image area */}
      <div className="mb-4 mx-auto h-32 w-32 rounded-full shimmer" />
      {/* ID */}
      <div className="mb-2 mx-auto h-3 w-12 rounded shimmer" />
      {/* Name */}
      <div className="mb-3 mx-auto h-5 w-24 rounded shimmer" />
      {/* Type badges */}
      <div className="flex justify-center gap-2">
        <div className="h-5 w-14 rounded-full shimmer" />
        <div className="h-5 w-14 rounded-full shimmer" />
      </div>
    </div>
  );
}

export function PokemonGrid({ pokemons, loading, onSelect }: PokemonGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const prevKeyRef = useRef('');

  // Animate all cards in once when the list changes (filter/page/gen change)
  useEffect(() => {
    if (!gridRef.current || pokemons.length === 0) return;

    // Build a key from the first+last id to detect meaningful list changes
    const key = `${pokemons[0]?.id}-${pokemons[pokemons.length - 1]?.id}-${pokemons.length}`;
    if (key === prevKeyRef.current) return;
    prevKeyRef.current = key;

    const cards = Array.from(gridRef.current.children) as HTMLElement[];
    animate(cards, {
      opacity: [0, 1],
      translateY: [32, 0],
      scale: [0.93, 1],
      delay: stagger(35),
      duration: 420,
      ease: 'outExpo',
    });
  }, [pokemons]);

  // Show shimmer while loading (even if some pokemons are already streaming in)
  if (loading) {
    return (
      <>
        <style>{`
          @keyframes shimmer {
            0%   { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          .shimmer {
            background: linear-gradient(
              90deg,
              #e2e8f0 25%,
              #f1f5f9 50%,
              #e2e8f0 75%
            );
            background-size: 800px 100%;
            animation: shimmer 1.4s ease-in-out infinite;
          }
          .dark .shimmer {
            background: linear-gradient(
              90deg,
              #1e293b 25%,
              #334155 50%,
              #1e293b 75%
            );
            background-size: 800px 100%;
          }
        `}</style>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-slate-500">
        <p className="text-lg">No Pokémon found</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
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
