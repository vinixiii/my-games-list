import axios from 'axios';

const gamesApi = axios.create({
  baseURL: 'http://localhost:3333/api/games',
});

const gamesService = {
  async getAll() {
    const apiResponse = await gamesApi.get('/');

    return apiResponse.data;
  },

  async getById(id) {
    const apiResponse = await gamesApi.get(`/${id}`);

    return apiResponse.data;
  },

  async create(game) {
    await gamesApi.post('/', game);
  },

  async update(game) {
    await gamesApi.put('', game);
  },

  async delete(id) {
    await gamesApi.delete(`/${id}`);
  },
};

export { gamesService };
