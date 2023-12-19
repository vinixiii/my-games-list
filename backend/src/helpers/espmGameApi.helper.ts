import axios from 'axios';

const espmGameApi = axios.create({
  baseURL: 'https://academico.espm.br/testeapi/jogo',
});

export { espmGameApi };
