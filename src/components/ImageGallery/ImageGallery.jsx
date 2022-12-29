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
  currentId: null,
};

// idle, pending, resolved, reject
class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = { ...INITIAL_STATE };

  currentPage = 1;
  totalPages = 0;

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ ...INITIAL_STATE });
      this.currentPage = 1;
      this.totalPages = 0;
      this.setState({ loading: true });
      setTimeout(() => this.fetchImages(this.currentPage), 500);
    }
  }

  fetchImages = page => {
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
        return Promise.reject(new Error('No photos for this request.'));
      })
      .then(({ hits, totalHits }) => {
        if (!hits.length) {
          return Promise.reject(new Error('No photos for this request.'));
        }

        if (page === 1) {
          this.totalPages =
            Math.trunc(totalHits / PER_PAGE) + !!(totalHits % PER_PAGE);
          this.currentPage = 1;
        }

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

  nextPageHandler = () => {
    this.currentPage += 1;
    this.setState({ loading: true });
    setTimeout(() => this.fetchImages(this.currentPage), 500);
  };

  closeHandler = () => {
    this.setState({ currentId: null });
  };

  clickImgHandler = evt => {
    const { nodeName, id } = evt.target;

    if (nodeName === 'IMG') this.setState({ currentId: id });
  };

  getLargeImgData() {
    const { images, currentId } = this.state;

    return images.filter(image => String(image.id) === currentId)[0];
  }

  render() {
    const { ImageGallery } = styles;
    const { images, error, loading, currentId } = this.state;
    const activeImage = this.getLargeImgData();

    return (
      <>
        {error && <p>{error}</p>}
        {currentId && (
          <Modal onClose={this.closeHandler}>
            <img
              src={activeImage.largeImageURL}
              alt={activeImage.tags}
              width="800"
              height="600"
            />
          </Modal>
        )}
        <ul className={ImageGallery} onClick={this.clickImgHandler}>
          {images.map(({ id, tags, webformatURL }) => (
            <ImageGalleryItem
              key={id}
              id={id}
              tags={tags}
              webformatURL={webformatURL}
            />
          ))}
        </ul>

        {loading && <Loader />}
        {this.currentPage < this.totalPages && (
          <Button onClick={this.nextPageHandler} />
        )}
      </>
    );
  }
}

export default ImageGallery;
