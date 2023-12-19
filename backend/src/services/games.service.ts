import { EspmGameDTO } from '../dtos/espmGame.dto';
import { espmGameApi } from '../helpers/espmGameApi.helper';
import { espmGamesDTOToGames } from '../mappers/games.mapper';

class GamesService {
  async getAll() {
    const apiResponse = await espmGameApi.get<EspmGameDTO[]>('/');

    return espmGamesDTOToGames(apiResponse.data);
  }
}

const gamesService = new GamesService();

export { gamesService };
