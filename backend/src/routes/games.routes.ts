import { Router } from 'express';
import { GameController } from '../controllers/games.controller';

const gamesRouter = Router();

const gamesController = new GameController();

gamesRouter.get('/api/games', gamesController.getAll);

export { gamesRouter };
