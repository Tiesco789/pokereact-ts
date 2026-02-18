import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

export function PokeballLoader() {
  const ballRef = useRef<SVGSVGElement>(null);
  const btnRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!ballRef.current || !btnRef.current) return;

    // Continuous rotation
    const rotAnim = animate(ballRef.current, {
      rotate: '1turn',
      duration: 1800,
      ease: 'linear',
      loop: true,
    });

    // Pulsing center button
    const pulseAnim = animate(btnRef.current, {
      scale: [1, 1.4, 1],
      opacity: [1, 0.5, 1],
      duration: 900,
      ease: 'inOutSine',
      loop: true,
    });

    return () => {
      rotAnim.cancel();
      pulseAnim.cancel();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <svg
        ref={ballRef}
        width="72"
        height="72"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top half — red */}
        <path d="M 10 50 A 40 40 0 0 1 90 50 Z" fill="#ef4444" />
        {/* Bottom half — white */}
        <path d="M 10 50 A 40 40 0 0 0 90 50 Z" fill="white" />
        {/* Outer ring */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#1e293b" strokeWidth="5" />
        {/* Middle band */}
        <line x1="10" y1="50" x2="90" y2="50" stroke="#1e293b" strokeWidth="5" />
        {/* Center button ring */}
        <circle cx="50" cy="50" r="12" fill="white" stroke="#1e293b" strokeWidth="5" />
        {/* Center button inner */}
        <circle ref={btnRef} cx="50" cy="50" r="6" fill="#1e293b" />
      </svg>
      <p className="text-sm font-medium text-slate-400 dark:text-slate-500 animate-pulse">
        Loading Pokémon…
      </p>
    </div>
  );
}

/** Skeleton grid shown while streaming — fades in each placeholder */
export function SkeletonGrid({ count = 10 }: { count?: number }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.children);
    animate(cards, {
      opacity: [0, 1],
      delay: stagger(60),
      duration: 400,
      ease: 'outQuad',
    });
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{ opacity: 0 }}
          className="h-64 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800"
        />
      ))}
    </div>
  );
}
