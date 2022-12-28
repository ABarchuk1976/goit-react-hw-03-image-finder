import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';

const INITIAL_STATE = {
  images: [],
  error: '',
  status: 'idle',
};

// idle, pending, resolved, reject
class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = { ...INITIAL_STATE };

  componentDidUpdate(prevProps, _) {
    console.log(prevProps.searchQuery, this.props.searchQuery);
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ ...INITIAL_STATE });
      this.getImagesHandler(1);
    }
  }

  currentPage = 1;
  totalPages = 0;

  getImagesHandler = page => {
    const { searchQuery } = this.props;
    const API = 'https://pixabay.com/api/';
    const KEY = '13063741-5515a23bced967f7d7ac2fd10';
    const TYPE = 'photo';
    const ORIENTATION = 'horizontal';
    const PER_PAGE = 12;
    const params = {
      q: searchQuery,
      page: page,
      key: KEY,
      image_type: TYPE,
      orientation: ORIENTATION,
      per_page: PER_PAGE,
    };
    const searchAPI = API + '?' + new URLSearchParams(params);

    fetch(searchAPI)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error('No photos for this request'));
      })
      .then(({ hits, totalHits }) => {
        if (page === 1) {
          this.totalPages =
            Math.trunc(totalHits / PER_PAGE) + !!(totalHits % PER_PAGE);
          this.currentPage = 1;
        }
        this.currentPage += 1;
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
        }));
      })
      .catch(error => {
        this.setState({ error, images: [], status: 'rejected' });
        this.totalPages = 0;
        this.currentPage = 1;
      });
  };

  render() {
    const { images, status } = this.state;
    const { ImageGallery } = styles;

    if (status === 'idle') return;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <></>;
    }

    if (status === 'resolved') {
      return (
        <>
          <ul className={ImageGallery}>
            {images.map(({ id, tags, webformatURL }) => (
              <ImageGalleryItem
                id={id}
                tags={tags}
                webformatURL={webformatURL}
              />
            ))}
          </ul>
          {this.currentPage < this.totalPages && (
            <Button page={this.currentPage} onClick={this.getImagesHandler} />
          )}
        </>
      );
    }
  }
}

export default ImageGallery;
