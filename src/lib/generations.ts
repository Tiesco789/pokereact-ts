export interface Generation {
  id: number;
  label: string;
  /** Inclusive start Pokémon national dex ID */
  start: number;
  /** Inclusive end Pokémon national dex ID */
  end: number;
  region: string;
}

export const GENERATIONS: Generation[] = [
  { id: 1, label: 'Gen I', start: 1, end: 151, region: 'Kanto' },
  { id: 2, label: 'Gen II', start: 152, end: 251, region: 'Johto' },
  { id: 3, label: 'Gen III', start: 252, end: 386, region: 'Hoenn' },
  { id: 4, label: 'Gen IV', start: 387, end: 493, region: 'Sinnoh' },
  { id: 5, label: 'Gen V', start: 494, end: 649, region: 'Unova' },
  { id: 6, label: 'Gen VI', start: 650, end: 721, region: 'Kalos' },
  { id: 7, label: 'Gen VII', start: 722, end: 809, region: 'Alola' },
  { id: 8, label: 'Gen VIII', start: 810, end: 905, region: 'Galar' },
  { id: 9, label: 'Gen IX', start: 906, end: 1025, region: 'Paldea' },
];
