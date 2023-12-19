import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello World!');
});

const PORT = 3333;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
