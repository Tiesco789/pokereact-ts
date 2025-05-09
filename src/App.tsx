import { JSX, useEffect, useState } from 'react';
import Header from './components/Header';
import Pokecard from './components/Pokecard';
import SearchBar from './components/SearchBar';
import PokemonTypeFilter from './components/SearchBar/SearchType'; // Novo componente de filtro
import { Pokemon } from './IPokemon';
import { Busca } from './services/api';
import { Button } from 'primereact/button';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex
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
  const [typeFilter, setTypeFilter] = useState<string>('');

  // Função para busca inicial dos Pokémons
  const fetchPokemons = () => {
    Busca('?limit=151', (data: PokemonApiResponse) => setPokemons(data));
  };

  // Busca e armazena a lista de Pokémons após a montagem
  useEffect(() => {
    fetchPokemons();
  }, []);

  // Atualiza a lista filtrada sempre que pokemons ou typeFilter mudarem
  useEffect(() => {
    setFilteredPokemon(pokemons?.results || []);
  }, [pokemons]);

  // Função de busca por nome do Pokémon
  const handleSearch = (searchTerm: string) => {
    const filteredResults = pokemons?.results?.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
    setFilteredPokemon(filteredResults);
  };

  // Função para buscar Pokémons por tipo
  const handleTypeFilter = async (selectedType: string) => {
    setTypeFilter(selectedType);

    if (selectedType) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
        const data = await response.json();
        const filteredResults = data.pokemon.map((p: { pokemon: Pokemon }) => p.pokemon);

        setFilteredPokemon(filteredResults);
      } catch (error) {
        console.error('Erro ao buscar Pokémon por tipo:', error);
      }
    } else {
      // Se nenhum tipo for selecionado, mostra todos os Pokémons
      setFilteredPokemon(pokemons.results);
    }
  };

  return (
    <>
      <Header />

      <SearchBar onSearch={handleSearch} />
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
