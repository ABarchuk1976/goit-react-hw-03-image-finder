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
import { PER_PAGE } from 'constants/images-api.constants.js';
import { INITIAL_STATES } from 'constants/initial-states.constants';

class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = { ...INITIAL_STATES };

  totalPages = 0;

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

              if (page === 1) {
                this.totalPages =
                  Math.trunc(totalHits / PER_PAGE) + !!(totalHits % PER_PAGE);
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
              }));
            })
            .catch(error => {
              toast.error(error.message);
              this.totalPages = 0;
              this.setState({ page: null, images: [], error: true });
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
    const { images, loading, currentId, error } = this.state;
    const activeImage = this.getLargeImgData();

    return (
      <>
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

        {!error && (
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
        )}

        {loading && <Loader />}

        {!loading && this.state.page < this.totalPages && (
          <Button onClick={this.nextPageHandler} />
        )}

        {error && <ToastContainer autoClose={3000} closeOnClick />}
      </>
    );
  }
}

export default ImageGallery;
