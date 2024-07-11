import { useEffect, useState } from 'react';
import Pokecard from './components/Pokecard';
import { Busca } from './services/api';
import './styles/index.css';
import SearchBar from './components/SearchBar';
import { Pokemon } from './IPokemon';
import Header from './components/Header';
import Footer from './components/Footer';

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
    Busca('?limit=386', (data: PokemonApiResponse) => setPokemons(data));
  }, []);

  useEffect(() => {
    setFilteredPokemon(pokemons?.results || []);
  }, [pokemons]);

  const handleSearch = (searchTerm: string) => {
    const filteredResults =
      pokemons?.results?.filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    setFilteredPokemon(filteredResults);
  };

  return (
    <>
      <Header />
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
      <Footer />

      {/* <button onClick={handleLoadMore}>Carregar Mais</button> */}
    </>
  );
};

export default App;
