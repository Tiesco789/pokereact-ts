import { useEffect, useState } from 'react';
import Header from './components/Header';
import Pokecard from './components/Pokecard';
import SearchBar from './components/SearchBar';
import PokemonTypeFilter from './components/SearchBar/SearchType'; // Novo componente de filtro
import { Pokemon } from './IPokemon';
import { Busca } from './services/api';
import './styles/index.css';

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
  const [typeFilter, setTypeFilter] = useState<string>(''); // Estado para o tipo selecionado

  // Busca a lista completa de Pokémon
  useEffect(() => {
    Busca('?limit=151', (data: PokemonApiResponse) => setPokemons(data));
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

  // Função para lidar com a filtragem por tipo de Pokémon
  const handleTypeFilter = (selectedType: string) => {
    setTypeFilter(selectedType);

    if (selectedType) {
      fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
        .then(response => response.json())
        .then(data => {
          const filteredResults = data.pokemon.map((p: any) => p.pokemon);
          setFilteredPokemon(filteredResults);
        })
        .catch(error => {
          console.error('Erro ao buscar Pokémon por tipo:', error);
        });
    } else {
      // Se nenhum tipo estiver selecionado, exibe todos os Pokémon
      setFilteredPokemon(pokemons.results);
    }
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {/* Componente de filtro de tipo de Pokémon */}
      <PokemonTypeFilter onTypeSelect={handleTypeFilter} />
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
          <div>
            <p>Nenhum Pokémon encontrado.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
