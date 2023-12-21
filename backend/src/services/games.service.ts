import { Game } from '../domains/games.domain';
import {
  CreateEspmGameDTO,
  EspmGameDTO,
  UpdateEspmGameDTO,
} from '../dtos/espmGame.dto';
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

    const apiResponse = await espmGameApi.post<number>('/', dto);

    return apiResponse.data;
  }

  async update(game: Game) {
    const { id, name, description, developedBy, year, minimumAge } = game;

    const dto: UpdateEspmGameDTO = {
      id,
      nome: name,
      descricao: description,
      produtora: developedBy,
      ano: year,
      idadeMinima: minimumAge,
    };

    await espmGameApi.put<true>('/', dto);
  }

  async delete(id: string) {
    await espmGameApi.delete<true>(`/${id}`);
  }
}

const gamesService = new GamesService();

export { gamesService };
