import React, { useEffect, useState } from 'react';
import SelectType from './styles';

interface PokemonTypeFilterProps {
  onTypeSelect: (type: string) => void;
}

const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({ onTypeSelect }) => {
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => setTypes(data.results.map((type: any) => type.name)))
      .catch(error => console.error('Erro ao buscar tipos de Pokémon:', error));
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeSelect(event.target.value);
  };

  return (
    <>
      <SelectType>
        <select onChange={handleTypeChange}>
          <option value="">Tipo do Pokemon ↴</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </SelectType>
    </>
  );
};

export default PokemonTypeFilter;
