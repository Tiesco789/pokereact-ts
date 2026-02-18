import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { X, Ruler, Weight, Activity, ArrowRight } from 'lucide-react';
import { Pokemon } from '../../types/pokemon';
import { usePokemonDetails, EvolutionNode } from '../../hooks/usePokemonDetails';
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

// ─── Evolution rendering helpers ────────────────────────────────────────────

function EvoSprite({ node, size = 'md' }: { node: EvolutionNode; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-14 w-14' : 'h-20 w-20';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn('rounded-full bg-slate-100 p-2 dark:bg-slate-800', dim)}>
        <img src={node.image} alt={node.name} className="h-full w-full object-contain" />
      </div>
      <span className="text-xs font-medium capitalize text-slate-600 dark:text-slate-400 text-center leading-tight">
        {node.name}
      </span>
    </div>
  );
}

function EvoArrow({ trigger }: { trigger?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      {trigger && (
        <span className="text-[10px] font-semibold capitalize text-slate-400 dark:text-slate-500 text-center leading-tight max-w-[60px]">
          {trigger}
        </span>
      )}
      <ArrowRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
    </div>
  );
}

function EvoTree({ node }: { node: EvolutionNode }) {
  const isBranching = node.evolutions.length > 1;
  const isLinear = node.evolutions.length === 1;

  if (isBranching) {
    return (
      <div className="flex items-center gap-3 w-full">
        <EvoSprite node={node} />
        <div className="flex flex-col gap-2">
          {node.evolutions.map((evo) => (
            <EvoArrow key={evo.name} trigger={evo.trigger} />
          ))}
        </div>
        <div className="flex flex-col gap-3 flex-1">
          {node.evolutions.map((evo) => (
            <div key={evo.name} className="flex items-center gap-2">
              <EvoSprite node={evo} size="sm" />
              {evo.evolutions.length > 0 && (
                <>
                  <EvoArrow trigger={evo.evolutions[0].trigger} />
                  <EvoSprite node={evo.evolutions[0]} size="sm" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isLinear) {
    const next = node.evolutions[0];
    return (
      <div className="flex items-center gap-2">
        <EvoSprite node={node} />
        <EvoArrow trigger={next.trigger} />
        <EvoTree node={next} />
      </div>
    );
  }

  return <EvoSprite node={node} />;
}

// ─── Main panel ─────────────────────────────────────────────────────────────

export function PokemonDetailPanel({ pokemon, onClose }: PokemonDetailPanelProps) {
  const { species, evolutionTree, loading } = usePokemonDetails(pokemon);

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const statsAnimatedRef = useRef(false);

  // Panel slide-in on mount
  useEffect(() => {
    if (!pokemon || !panelRef.current || !backdropRef.current) return;
    statsAnimatedRef.current = false;

    // Backdrop fade in
    animate(backdropRef.current, {
      opacity: [0, 1],
      duration: 300,
      ease: 'outQuad',
    });

    // Panel slide in from right
    animate(panelRef.current, {
      translateX: ['100%', '0%'],
      duration: 480,
      ease: 'outExpo',
    });
  }, [pokemon]);

  // Stat bars animate when panel content is ready
  useEffect(() => {
    if (!panelRef.current || statsAnimatedRef.current) return;
    const bars = panelRef.current.querySelectorAll<HTMLElement>('.stat-bar-fill');
    if (bars.length === 0) return;

    statsAnimatedRef.current = true;

    // Temporarily set width to 0 then animate to target
    bars.forEach((bar) => {
      const target = bar.dataset.width || '0%';
      bar.style.width = '0%';
      animate(bar, {
        width: target,
        delay: stagger(80),
        duration: 700,
        ease: 'outExpo',
      });
    });
  });

  if (!pokemon) return null;

  const mainType = pokemon.types?.[0]?.type?.name || 'normal';
  const colorClass = typeColors[mainType] || 'bg-gray-400';

  return (
    <div
      ref={backdropRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        style={{ transform: 'translateX(100%)' }}
        className="h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl dark:bg-slate-900 sm:w-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold capitalize text-slate-900 dark:text-white">
            {pokemon.name}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Artwork */}
        <div className={cn('relative mb-8 flex items-center justify-center rounded-2xl p-8', colorClass)}>
          <img
            src={pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="h-48 w-48 object-contain drop-shadow-lg"
          />
        </div>

        {/* Types */}
        <div className="mb-8 flex justify-center gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={cn(
                'rounded-full px-4 py-1 text-sm font-bold text-white uppercase tracking-wider',
                typeColors[type.type.name] || 'bg-gray-400'
              )}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        {/* Quick stats */}
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

        {/* About */}
        {species && (
          <div className="mb-8">
            <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">About</h3>
            <p className="text-slate-600 dark:text-slate-300">
              {species.flavor_text_entries
                .find((entry) => entry.language.name === 'en')
                ?.flavor_text.replace(/\f/g, ' ')}
            </p>
          </div>
        )}

        {/* Base Stats — animated bars */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">Base Stats</h3>
          <div className="space-y-3">
            {pokemon.stats.map((stat) => {
              const pct = `${(stat.base_stat / 255) * 100}%`;
              return (
                <div key={stat.stat.name} className="flex items-center gap-4">
                  <span className="w-24 text-sm font-medium capitalize text-slate-500 dark:text-slate-400">
                    {stat.stat.name.replace('-', ' ')}
                  </span>
                  <span className="w-8 text-sm font-bold text-slate-900 dark:text-white">
                    {stat.base_stat}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className={cn('stat-bar-fill h-full rounded-full', colorClass)}
                      data-width={pct}
                      style={{ width: '0%' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Evolution Chain / Tree */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
            {evolutionTree && evolutionTree.evolutions.length > 1
              ? 'Evolution Possibilities'
              : 'Evolution Chain'}
          </h3>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-600" />
            </div>
          ) : evolutionTree ? (
            <div className="overflow-x-auto">
              <EvoTree node={evolutionTree} />
            </div>
          ) : (
            <p className="text-sm text-slate-400">No evolution data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
