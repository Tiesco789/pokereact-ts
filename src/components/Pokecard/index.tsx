import { useEffect, useState } from 'react';

import { Busca } from '../../services/api';
import { IFormatedName } from './IFormatedName';
import pokeColors from './pokecolors';
import PokeCard from './styles';

const Pokecard = (props: IFormatedName): JSX.Element => {
  const [pokemon, setPokemon] = useState({
    id: 0,
    name: '',
    sprites: {
      front_default: '',
      other: {
        official_artwork: {
          front_default: '',
        },
      },
    },
    types: [
      {
        slot: 0,
        type: {
          name: '',
          url: '',
        },
      },
    ],
  });

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
      <PokeCard>
        <img
          alt=""
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        />
        <h1>Nº {pokemon.id}</h1>
        <p>{formatName(pokemon.name)}</p>
        <div>
          {pokemon.types.map(({ type }) => (
            <span style={{ backgroundColor: pokeColors[type.name] }}>
              {' '}
              {type.name}
            </span>
          ))}
        </div>
      </PokeCard>
    </>
  );
};

export default Pokecard;
