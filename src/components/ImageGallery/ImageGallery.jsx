import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

import { fetchImages } from 'services/images-api.service.js';
import { INITIAL_STATES } from 'constants/initial-states.constants';

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = { ...INITIAL_STATES };

  totalPages = 0;
  currentLargeImg = '';
  currentAlt = '';

  componentDidMount() {
    const { searchQuery } = this.props;
    this.setState({ search: searchQuery });
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const newSearch = prevProps.searchQuery !== searchQuery;

    if (newSearch) {
      this.setState({ ...INITIAL_STATES, search: searchQuery });
    }

    const { page, search } = this.state;
    const changedPage = prevState.page !== page;
    const changedSearch = prevState.search !== search;

    if (changedSearch || changedPage) {
      this.setState({ loading: true });
      setTimeout(
        () =>
          fetchImages(search, page)
            .then(({ hits, totalHits }) => {
              if (!hits.length) {
                return Promise.reject(
                  new Error(`No photos for search query: ${search}`)
                );
              }

              const newImages = hits.map(
                ({ id, tags, webformatURL, largeImageURL }) => ({
                  id,
                  tags,
                  webformatURL,
                  largeImageURL,
                })
              );
              this.setState(prevState => ({
                images: [...prevState.images, ...newImages],
                totalHits,
              }));
            })
            .catch(error => {
              toast.error(error.message);

              this.setState({ totalHits: 0, error: true });
            })
            .finally(this.setState({ loading: false })),
        500
      );
    }
  }

  nextPageHandler = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  closeHandler = () => {
    this.setState({ openedModal: false });
  };

  clickImgHandler = evt => {
    const { target } = evt;

    if (target.nodeName === 'IMG') {
      this.currentLargeImg = target.getAttribute('large');
      this.currentAlt = target.getAttribute('alt');
      this.setState({ openedModal: true });
    }
  };

  render() {
    const { ImageGallery } = styles;
    const { images, loading, error, openedModal, totalHits } = this.state;

    return (
      <>
        {openedModal && (
          <Modal onClose={this.closeHandler}>
            <img
              src={this.currentLargeImg}
              alt={this.currentAlt}
              width="800"
              height="600"
            />
          </Modal>
        )}

        {!error && (
          <ul className={ImageGallery} onClick={this.clickImgHandler}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                tags={tags}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
              />
            ))}
          </ul>
        )}

        {loading && <Loader />}

        {images.length < totalHits && (
          <Button name="loadMore" onClick={this.nextPageHandler} />
        )}

        {error && <ToastContainer autoClose={3000} closeOnClick />}
      </>
    );
  }
}

export default ImageGallery;
