import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const toast = {
  success: (message) => {
    Toastify({
      text: message,
      offset: {
        x: 8,
        y: 118,
      },
      style: {
        background: '#0CBAFF',
        color: '#1E1E1E',
      },
    }).showToast();
  },
  error: (message) => {
    Toastify({
      text: message,
      offset: {
        x: 8,
        y: 118,
      },
      style: {
        background: '#fd094f',
        color: '#fafafa',
      },
    }).showToast();
  },
};

export { toast };
