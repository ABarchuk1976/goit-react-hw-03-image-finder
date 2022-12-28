import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, tags, webformatURL }) => {
  const { ImageGalleryItem, ImageGalleryItem__image } = styles;
  return (
    <li className={ImageGalleryItem} key={id}>
      <img className={ImageGalleryItem__image} src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
