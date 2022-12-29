import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, tags, webformatURL }) => {
  const { ImageGalleryItem, ImageGalleryItem__image } = styles;
  return (
    <li className={ImageGalleryItem}>
      <img
        className={ImageGalleryItem__image}
        src={webformatURL}
        alt={tags}
        id={id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
