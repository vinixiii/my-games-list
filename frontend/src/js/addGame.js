import $ from 'jquery';
import { gamesService } from './services/gamesApi';
import { form } from './utils/form';
import { loadingButton } from './utils/loadingButton';
import { toast } from './utils/toast';

const addGame = async (formData, form) => {
  const addGameButton = $('#addGameForm #addGameButton');
  const addGameButtonText = $('#addGameButton #buttonText');
  const addGameButtonSpinner = $('#addGameForm #buttonSpinner');

  loadingButton.showLoading(addGameButtonText, addGameButtonSpinner);

  addGameButton.prop('disabled', true);

  formData.year = Number(formData.year);
  formData.minimumAge = Number(formData.minimumAge);

  try {
    await gamesService.create(formData);

    toast.success('Jogo adicionado com sucesso :)');

    $(form).trigger('reset');
  } catch (error) {
    toast.error(
      `Não foi possível adicionar um novo jogo :(\n Tente novamente!`
    );
  } finally {
    loadingButton.hideLoading(addGameButtonText, addGameButtonSpinner);

    $('#add-game-form input').removeClass('is-valid is-invalid');
    $('#add-game-form textarea').removeClass('is-valid is-invalid');

    addGameButton.prop('disabled', false);
  }
};

const handleSubmitForm = (form) => {
  const serializedForm = $(form).serializeArray();

  const formData = {};

  serializedForm.forEach((field) => {
    formData[field.name] = field.value.trim();
  });

  addGame(formData, form);
};

$(() => {
  form.validate('add-game-form', handleSubmitForm);
});
