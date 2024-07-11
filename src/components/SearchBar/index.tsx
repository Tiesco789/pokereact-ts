import React, { useState, ChangeEvent, FormEvent } from 'react';
import Searchbar from './styles';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    console.log("Search term updated:", newSearchTerm); // Verificação
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Search submitted:", searchTerm); // Verificação
    onSearch(searchTerm);
  };

  return (
    <Searchbar>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome do Pokémon..."
          value={searchTerm}
          onChange={handleChange}
          className='pokeSearch'
          />
        <button type="submit">Pesquisar</button>

        <input className='pokeFilter' type="button" value="Filtro" />
      </form>
    </Searchbar>
  );
};

export default SearchBar;
