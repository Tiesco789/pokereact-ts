export interface Pokemon {
  id: number;
  name: string;
  color: string;
  sprites: {
    front_default: string,
    other: {
      official_artwork: {
        front_default: string
      },
    },
  },
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
