import { Request, Response } from 'express';
import { gamesService } from '../services/games.service';
import { Game } from '../domains/games.domain';

export class GameController {
  async getAll(req: Request, res: Response) {
    const gameList = await gamesService.getAll();

    return res.status(200).json(gameList);
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const game = await gamesService.getById(id);

    return res.status(200).json(game);
  }

  async create(req: Request<{}, {}, Game>, res: Response) {
    const game = req.body;

    const createdGameId = await gamesService.create(game);

    return res.status(201).json(createdGameId);
  }

  async delete(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    await gamesService.delete(id);

    return res.status(200).json(true);
  }
}
