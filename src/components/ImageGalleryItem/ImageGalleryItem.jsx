import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends PureComponent {
  static propTypes = {
    id: PropTypes.number.isRequired,
    tags: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  };

  render() {
    const { webformatURL, tags, id } = this.props;
    const { ImageGalleryItem__image } = styles;

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
  }
}

export default ImageGalleryItem;
