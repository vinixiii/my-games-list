import cors from 'cors';
import express from 'express';
import { gamesRouter } from './routes/games.routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(gamesRouter);

const PORT = 3333;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
