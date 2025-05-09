import { JSX, useEffect, useState } from 'react';
import { Card } from 'primereact/card';

import { Busca } from '../../services/api';
import { IFormatedName } from './IFormatedName';
import pokeColors from './pokecolors';
import { Pokemon } from '../../IPokemon';

import './styles.scss';

const Pokecard = (props: IFormatedName): JSX.Element => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const { name } = props;
    Busca(name, setPokemon);
  }, [props]);

  if (!pokemon) {
    const { name } = props;
    return (
      <>
        <p>Carregando {name}</p>
      </>
    );
  }

  const formatName = (name: string) => {
    if (!name) {
      return '';
    }

    const arr = name.split(' ');

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    return arr.join(' ');
  };

  return (
    <>
      <Card className='pokecard'>
        <img
          alt={pokemon.name}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}

        />
        <h4>Nº {pokemon.id}</h4>
        <p>{formatName(pokemon.name)}</p>
        <div id='types'>
          {pokemon.types.map(({ type }) => (
            <span style={{ backgroundColor: pokeColors[type.name] }}>
              {' '}
              {type.name}
            </span>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Pokecard;
