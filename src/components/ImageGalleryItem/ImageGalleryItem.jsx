import css from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  imageItem: { webformatURL, tags, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toogleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <li className={css.ImageGalleryItem} onClick={toogleModal}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
      />
      {isModalOpen && (
        <Modal onCloseModal={toogleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
