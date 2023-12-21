import $ from 'jquery';
import { form } from './utils/form';
import { gamesService } from './services/gamesApi';
import { loadingButton } from './utils/loadingButton';
import { toast } from './utils/toast';

const updateGameFormSpinner = $('#update-game-form-spinner');
const updateGameFormSection = $('#update-game-form-section');

const renderGameInfo = (game) => {
  updateGameFormSpinner.css('display', 'none');
  updateGameFormSection.css('display', 'block');

  const id = $('#id');
  const name = $('#name');
  const description = $('#description');
  const developedBy = $('#developedBy');
  const year = $('#year');
  const minimumAge = $('#minimumAge');

  id.val(game.id);
  name.val(game.name);
  description.val(game.description);
  developedBy.val(game.developedBy);
  year.val(game.year);
  minimumAge.val(game.minimumAge);
};

const renderErrorSection = (type) => {
  const updateGameFormErrorSection = $('#update-game-form-error-section');

  updateGameFormSpinner.css('display', 'none');
  updateGameFormSection.css('display', 'none');
  updateGameFormErrorSection.css('display', 'block');
};

const gameInfo = {
  async fetch() {
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('id');

    try {
      const game = await gamesService.getById(gameId);

      renderGameInfo(game);
    } catch (error) {
      renderErrorSection();
    }
  },
};

$(() => {
  gameInfo.fetch();
});

const updateGame = async (game) => {
  const updateButton = $('#update-game-form #update-button');
  const updateButtonText = $('#update-game-form #update-button-text');
  const updateButtonSpinner = $('#update-game-form #update-button-spinner');

  loadingButton.showLoading(updateButtonText, updateButtonSpinner);

  updateButton.prop('disabled', true);

  game.id = Number(game.id);
  game.year = Number(game.year);
  game.minimumAge = Number(game.minimumAge);

  try {
    await gamesService.update(game);

    toast.success('Jogo atualizado com sucesso!');

    gameInfo.fetch();
  } catch (error) {
    toast.error(`Não foi possível atualizar esse jogo :(\n Tente novamente!`);
  } finally {
    loadingButton.hideLoading(updateButtonText, updateButtonSpinner);

    form.resetStyle('update-game-form');

    updateButton.prop('disabled', false);
  }
};

const handleSubmitForm = (form) => {
  const serializedForm = $(form).serializeArray();

  const formData = {};

  serializedForm.forEach((field) => {
    formData[field.name] = field.value.trim();
  });

  updateGame(formData);
};

$(() => {
  form.validate('update-game-form', handleSubmitForm);
});
