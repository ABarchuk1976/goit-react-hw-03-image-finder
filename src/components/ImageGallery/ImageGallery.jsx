import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

const INITIAL_STATE = {
  images: [],
  loading: false,
  error: '',
  isModalOpen: false,
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

    this.setState({ loading: true });

    fetch(searchAPI)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(new Error('No photos for this request'));
      })
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          return Promise.reject(new Error('No photos for this request'));
        }

        if (page === 1) {
          this.totalPages =
            Math.trunc(totalHits / PER_PAGE) + !!(totalHits % PER_PAGE);
          this.currentPage = 1;
        }

        this.currentPage += 1;

        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
        }));
      })
      .catch(error => {
        this.setState({ error: error.message });
        this.totalPages = 0;
        this.currentPage = 1;
      })
      .finally(this.setState({ loading: false }));
  };

  handleToggle = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { images, error, loading, isModalOpen } = this.state;
    const { ImageGallery } = styles;
    return (
      <>
        {error && <p>{error}</p>}

        {isModalOpen && <Modal>modal</Modal>}

        <ul className={ImageGallery}>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              id={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImg={largeImageURL}
              onClick={this.handleToggle}
            />
          ))}
        </ul>
        {loading && <Loader />}
        {this.currentPage < this.totalPages && (
          <Button page={this.currentPage} onClick={this.getImagesHandler} />
        )}
      </>
    );
  }
}

export default ImageGallery;
