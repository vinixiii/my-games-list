import { Router } from 'express';
import { GameController } from '../controllers/games.controller';
import { validatePayload } from '../middlewares/validatePayload.middleware';
import { createGameSchema, updateGameSchema } from '../schemas/games.schema';

const gamesRouter = Router();

const gamesController = new GameController();

gamesRouter.get('/api/games', gamesController.getAll);
gamesRouter.get('/api/games/:id', gamesController.getById);

gamesRouter.post(
  '/api/games',
  validatePayload(createGameSchema),
  gamesController.create
);

gamesRouter.put(
  '/api/games',
  validatePayload(updateGameSchema),
  gamesController.update
);

gamesRouter.delete('/api/games/:id', gamesController.delete);

export { gamesRouter };
