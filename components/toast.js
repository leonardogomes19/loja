import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = ({ message, type }) => {
  const showToast = (toastType) => {
    switch (toastType) {
      case 'success':
        toast.success(message, getToastOptions());
        break;
      case 'error':
        toast.error(message, getToastOptions());
        break;
      case 'info':
        toast.info(message, getToastOptions());
        break;
      case 'warning':
        toast.warning(message, getToastOptions());
        break;
      default:
        toast(message, getToastOptions());
    }
  };

  const getToastOptions = () => ({
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark',
  });

  // Exibe o Toast com base no tipo fornecido (default para outros tipos não especificados)
  showToast(type);

  return null;
};

export default Toast;