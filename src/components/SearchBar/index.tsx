import React, { useState, ChangeEvent, FormEvent } from 'react';
import Searchbar from './styles';


interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
          />
        <button type="submit">Pesquisar</button>
      </form>
    </Searchbar>
  );
};

export default SearchBar;
