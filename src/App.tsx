import { useEffect, useState } from 'react';

import Pokecard from './components/Pokecard';
import { Busca } from './services/api';
import './styles/index.css';
import SearchBar from './components/SearchBar';

const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<any>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<any[]>([]);

  useEffect(() => {
    Busca('?limit=493', setPokemons);
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filteredResults = filteredPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filteredResults);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="container">
        {pokemons.results?.map((pokemon: any) => (
          <Pokecard
            color={pokemon.color}
            key={pokemon.name}
            name={pokemon.name}
            split={undefined}
          />
        ))}
      </div>
    </>
  );
};

export default App;
