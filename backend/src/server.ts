import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { handleHttpErrors } from './middlewares/handleHttpErrors.middleware';
import { gamesRouter } from './routes/games.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(gamesRouter);

app.use(handleHttpErrors);

const PORT = 3333;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
