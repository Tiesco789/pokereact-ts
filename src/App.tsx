import { useEffect, useState } from 'react';

import Pokecard from './components/Pokecard';
import { Busca } from './services/api';
import './styles/index.css';

const App = (): JSX.Element => {
  const [pokemons, setPokemons] = useState<any>([]);

  useEffect(() => {
    Busca('?limit=493', setPokemons);
  }, []);

  return (
    <>
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
