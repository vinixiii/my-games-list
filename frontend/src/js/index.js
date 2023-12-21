import $ from 'jquery';
import { gamesService } from './services/gamesApi';

const gamesListSpinner = $('#games-list-spinner');

const renderGamesList = (gamesList) => {
  gamesListSpinner.css('display', 'none');

  const gamesListSection = $('#games-list-section');

  gamesListSection.css('display', 'flex');

  const gamesListTableBody = $('#games-list-table tbody');

  gamesListTableBody.empty();

  gamesList.forEach((game) => {
    gamesListTableBody.append(`
      <tr class="align-content-center">
        <td>${game.name}</td>
        <td style="max-width: 400px">${game.description}</td>
        <td>${game.developedBy}</td>
        <td>${game.year}</td>
        <td>${game.minimumAge}</td>
        <td>
          <div class="d-flex">
            <button id="updateGameButton-${game.id}" data-game-id="${game.id}" class="editButton btn btn-secondary mr-2">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button id="deleteGameButton-${game.id}" data-game-id="${game.id}" class="deleteButton btn btn-danger" data-game-id="${game.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `);

    const updateGameButton = $(
      `#games-list-table #updateGameButton-${game.id}`
    );

    updateGameButton.on('click', async (event) => {
      // TODO: handle game update
    });

    const deleteGameButton = $(
      `#games-list-table #deleteGameButton-${game.id}`
    );

    deleteGameButton.on('click', async (event) => {
      // TODO: handle game delete
    });
  });
};

const renderEmptyListSection = (type) => {
  gamesListSpinner.css('display', 'none');

  if (type === 'error') {
    $('#empty-title').text('Ocorreu um erro ao buscar os jogos :(');
    $('#empty-text').text('Recarregue a página para tentar novamente.');
  }

  const gamesListTableBody = $('#games-list-table');
  const gamesListEmptySection = $('#games-list-empty-section');

  gamesListTableBody.css('display', 'none');
  gamesListEmptySection.css('display', 'block');
};

const gamesList = {
  async fetch() {
    try {
      const gamesList = await gamesService.getAll();

      console.log(!gamesList.length);

      if (!gamesList.length) {
        renderEmptyListSection();
      }

      renderGamesList(gamesList);
    } catch (error) {
      renderEmptyListSection('error');
    }
  },
  async refresh() {
    gamesList.fetch();
  },
};

$(() => {
  gamesList.fetch();
});
