// Define um tipo para o link de uma URL que seja um objeto com 'name' e 'url'
export type UrlEntity = {
  name: string;
  url: string;
};

// Define o tipo para o Pokémon, incluindo suas propriedades principais
export interface Pokemon {
  id: number;
  name: string;
  color: string;
  sprites: PokemonSprites;
  types: PokemonType[];
}

// Define o tipo para as sprites do Pokémon, separando as imagens
export interface PokemonSprites {
  frontDefault: string;
  officialArtwork: string;
}

// Tipo para o tipo do Pokémon, incluindo o slot e o tipo
export interface PokemonType {
  slot: number;
  type: UrlEntity;
}
