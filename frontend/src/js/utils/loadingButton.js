import $ from 'jquery';

const loadingButton = {
  showLoading: (textElement, spinnerElement) => {
    $(textElement).css({ opacity: '0', visibility: 'hidden' });
    $(spinnerElement).css({ opacity: '1', visibility: 'visible' });
  },
  hideLoading(textElement, spinnerElement) {
    $(textElement).css({ opacity: '1', visibility: 'visible' });
    $(spinnerElement).css({ opacity: '0', visibility: 'hidden' });
  },
};

export { loadingButton };
