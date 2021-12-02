import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export const Busca = (url: string, setDado: (arg0: any) => void): any =>
  api.get(url).then((res) => {
    setDado(res.data);
  });
