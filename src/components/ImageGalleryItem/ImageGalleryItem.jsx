import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, tags, webformatURL, largeImg, onClick }) => {
  const { ImageGalleryItem, ImageGalleryItem__image } = styles;
  return (
    <li className={ImageGalleryItem} key={id}>
      <img
        className={ImageGalleryItem__image}
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImg, tags)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
