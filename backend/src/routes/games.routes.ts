import { Router } from 'express';
import { GameController } from '../controllers/games.controller';

const gamesRouter = Router();

const gamesController = new GameController();

gamesRouter.get('/api/games', gamesController.getAll);
gamesRouter.get('/api/games/:id', gamesController.getById);

export { gamesRouter };
