import { useEffect, useState } from 'react';

import Pokecard from './components/Pokecard';
import { Busca } from './services/api';
import './styles/index.css';
import SearchBar from './components/SearchBar';

interface Pokemon {
  id: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  color: string;
}

interface PokemonApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<PokemonApiResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    Busca('?limit=493', (data: PokemonApiResponse) => setPokemons(data));
  }, []);

  useEffect(() => {
    setFilteredPokemon(pokemons?.results || []);
  }, [pokemons]);

  const handleSearch = (searchTerm: string) => {
    console.log('Termo de busca:', searchTerm);
    const filteredResults =
      pokemons?.results?.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    console.log('Resultados filtrados:', filteredResults);
    setFilteredPokemon(filteredResults);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((pokemon: Pokemon) => (
            <Pokecard
              color={pokemon.color}
              key={pokemon.name}
              name={pokemon.name}
              split={undefined}
            />
          ))
        ) : (
          <p>Nenhum Pokémon encontrado.</p> // Mensagem se a lista estiver vazia
        )}
      </div>
    </>
  );
};

export default App;
