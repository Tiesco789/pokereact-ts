import React, { useEffect, useState } from 'react';
import SelectType from './styles';
import { Dropdown } from 'primereact/dropdown';

interface PokemonTypeFilterProps {
  onTypeSelect: (type: string) => void;
}

interface TypeOption {
  label: string;
  value: string;
}

const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({ onTypeSelect }) => {
  const [types, setTypes] = useState<TypeOption[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/type')
      .then(response => response.json())
      .then(data => {
        const typeOptions = data.results.map((type: any) => ({
          label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
          value: type.name
        }));
        setTypes(typeOptions);
      })
      .catch(error => console.error('Erro ao buscar tipos de Pokémon:', error));
  }, []);

  const handleTypeChange = (e: { value: string }) => {
    setSelectedType(e.value);
    onTypeSelect(e.value);
  };

  return (
    <SelectType>
      <Dropdown
        value={selectedType}
        onChange={handleTypeChange}
        options={types}
        placeholder="Tipo do Pokémon"
        filter
        className="w-full md:w-14rem"
      />
    </SelectType>
  );
};

export default PokemonTypeFilter;
