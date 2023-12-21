import $ from 'jquery';
import 'jquery-validation';

const validateForm = (formId, onSubmit) => {
  $.validator.addMethod(
    'whitespace',
    (value) => {
      return Boolean(value.trim().length);
    },
    'O campo não pode conter apenas espaços em branco.'
  );

  $.validator.addMethod(
    'int',
    (value, element) => {
      return this.optional(element) || /^\d+$/.test(value.trim());
    },
    'Por favor, insira apenas números inteiros.'
  );

  return $(formId).validate({
    rules: {
      name: {
        required: true,
        whitespace: true,
      },
      description: {
        required: true,
        whitespace: true,
      },
      developedBy: {
        required: true,
        whitespace: true,
      },
      year: {
        required: true,
        int: true,
        whitespace: true,
      },
      minimumAge: {
        required: true,
        int: true,
        whitespace: true,
      },
    },
    messages: {
      name: {
        required: 'Este campo é obrigatório.',
      },
      description: {
        required: 'Este campo é obrigatório.',
      },
      developedBy: {
        required: 'Este campo é obrigatório.',
      },
      year: {
        required: 'Este campo é obrigatório.',
        number: 'Este campo deve ser um número.',
      },
      minimumAge: {
        required: 'Este campo é obrigatório.',
        number: 'Este campo deve ser um número.',
      },
    },
    errorElement: 'label',
    errorPlacement: (error, element) => {
      error.addClass('invalid-feedback');
      error.insertAfter(element);
    },
    highlight: (element, errorClass, validClass) => {
      $(element).addClass('is-invalid').removeClass('is-valid');
    },
    unhighlight: (element, errorClass, validClass) => {
      $(element).removeClass('is-invalid').addClass('is-valid');
    },

    submitHandler: onSubmit,
  });
};

const form = {
  validate(formId, onSubmit) {
    validateForm(formId, onSubmit);
  },
};

export { form };
