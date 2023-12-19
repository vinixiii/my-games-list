import { Game } from '../domains/games.domain';
import { EspmGameDTO } from '../dtos/espmGame.dto';

export const espmGameDTOToGame = (testGameDTO: EspmGameDTO): Game => ({
  id: testGameDTO.id,
  name: testGameDTO.nome,
  description: testGameDTO.descricao,
  developedBy: testGameDTO.produtora,
  year: testGameDTO.ano,
  minimumAge: testGameDTO.idadeMinima,
});

export const espmGamesDTOToGames = (testGameDTO: EspmGameDTO[]): Game[] => {
  return testGameDTO.map(espmGameDTOToGame);
};
