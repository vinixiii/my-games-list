import { Request, Response } from 'express';
import { gamesService } from '../services/games.service';

export class GameController {
  async getAll(req: Request, res: Response) {
    const gameList = await gamesService.getAll();

    return res.status(200).json(gameList);
  }
}
