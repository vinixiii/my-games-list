import { Game } from '../domains/games.domain';
import { CreateEspmGameDTO, EspmGameDTO } from '../dtos/espmGame.dto';
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

  async create(game: Game) {
    const { name, description, developedBy, year, minimumAge } = game;

    const dto: CreateEspmGameDTO = {
      nome: name,
      descricao: description,
      produtora: developedBy,
      ano: year,
      idadeMinima: minimumAge,
    };

    const apiResponse = await espmGameApi.post<number>('', dto);

    return apiResponse.data;
  }

  async delete(id: string) {
    await espmGameApi.delete<true>(`/${id}`);
  }
}

const gamesService = new GamesService();

export { gamesService };
