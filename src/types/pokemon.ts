export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: {
    front_default: string;
    other?: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  height: number;
  weight: number;
  species: {
    name: string;
    url: string;
  };
}

export interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface EvolutionChainLink {
  species: {
    name: string;
    url: string;
  };
  evolves_to: EvolutionChainLink[];
  evolution_details: {
    item: { name: string } | null;
    trigger: { name: string } | null;
    min_level: number | null;
    min_happiness: number | null;
    time_of_day: string;
  }[];
}

export interface EvolutionChain {
  chain: EvolutionChainLink;
}

export interface PokemonSpecies {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
    };
  }[];
}
