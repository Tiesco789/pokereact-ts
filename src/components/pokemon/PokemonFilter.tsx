import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface PokemonFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function PokemonFilter({ searchTerm, onSearchChange }: PokemonFilterProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 rounded-full border-0 bg-white pl-12 shadow-lg ring-1 ring-slate-100 transition-all focus-visible:ring-2 focus-visible:ring-red-500 dark:bg-slate-800 dark:ring-slate-800"
        />
      </div>
    </div>
  );
}
