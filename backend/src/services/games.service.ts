import { EspmGameDTO } from '../dtos/espmGame.dto';
import { espmGameApi } from '../helpers/espmGameApi.helper';
import {
  espmGameDTOToGame,
  espmGamesDTOToGames,
} from '../mappers/games.mapper';

class GamesService {
  async getAll() {
    const apiResponse = await espmGameApi.get<EspmGameDTO[]>('/');

    return espmGamesDTOToGames(apiResponse.data);
  }

  async getById(id: string) {
    const apiResponse = await espmGameApi.get<EspmGameDTO>(`/${id}`);

    return espmGameDTOToGame(apiResponse.data);
  }
}

const gamesService = new GamesService();

export { gamesService };
