import $ from 'jquery';
import { gamesService } from './services/gamesApi';
import { loadingButton } from './utils/loadingButton';
import { toast } from './utils/toast';

const gamesListSpinner = $('#games-list-spinner');
const deleteGameModal = $('#delete-game-modal');
const confirmDeletionButton = $('#confirm-deletion-button');

const deleteGame = async (gameId) => {
  const confirmDeletionButtonText = $('#confirm-deletion-button-text');
  const confirmDeletionButtonSpinner = $('#confirm-deletion-button-spinner');

  loadingButton.showLoading(
    confirmDeletionButtonText,
    confirmDeletionButtonSpinner
  );

  try {
    confirmDeletionButton.prop('disabled', true);

    await gamesService.delete(gameId);

    toast.success('Jogo excluído com sucesso!');

    $(deleteGameModal).modal('hide');

    gamesList.refresh();
  } catch (error) {
    toast.error(`Não foi possível excluir esse jogo :(\n Tente novamente!`);
  } finally {
    loadingButton.hideLoading(
      confirmDeletionButtonText,
      confirmDeletionButtonSpinner
    );

    confirmDeletionButton.prop('disabled', false);
  }
};

const openDeleteGameModal = async (gameId) => {
  $(deleteGameModal).modal('show');

  $(confirmDeletionButton).off('click');

  $(confirmDeletionButton).on('click', () => {
    deleteGame(gameId);
  });
};

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
            <button id="update-game-button-${game.id}" data-game-id="${game.id}" class="btn btn-secondary mr-2">
              <i class="bi bi-pencil-square"></i>
            </button>
            <button id="delete-game-button-${game.id}" data-game-id="${game.id}" class="btn btn-danger" data-game-id="${game.id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `);

    const updateGameButton = $(
      `#games-list-table #update-game-button-${game.id}`
    );

    updateGameButton.on('click', async (event) => {
      // TODO: handle game update
    });

    const deleteGameButton = $(
      `#games-list-table #delete-game-button-${game.id}`
    );

    deleteGameButton.on('click', async (event) => {
      const gameId = $(event.currentTarget).data('gameId');

      openDeleteGameModal(gameId);
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
