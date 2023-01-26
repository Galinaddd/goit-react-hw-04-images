import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const handleOverlayClik = e => {
    if (e.currentTarget !== e.target) onCloseModal();
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClik}>
      <div className={css.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};
