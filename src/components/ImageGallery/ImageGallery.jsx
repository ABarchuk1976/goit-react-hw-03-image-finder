import React, { Component, Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import Loader from 'components/Loader';
import Button from 'components/Button';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

import { PER_PAGE, searchAPI } from 'services/images.service.js';
import { INITIAL_STATE } from 'constants/initState.constants.js';

// idle, pending, resolved, reject
class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
  };

  state = { ...INITIAL_STATE };

  totalPages = 0;

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page } = this.state;

    if (prevProps.searchQuery !== searchQuery) {
      this.setState({ ...INITIAL_STATE });
      this.setState({ loading: true });
      setTimeout(() => this.fetchImages(), 500);
    }

    if (prevState.page !== page) {
      this.setState({ loading: true });
      setTimeout(() => this.fetchImages(page), 500);
    }
  }

  fetchImages(currentPage = 1) {
    const { searchQuery } = this.props;

    fetch(searchAPI(currentPage, searchQuery))
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

        if (currentPage === 1) {
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

        this.setState({ error: true });
        this.totalPages = 0;
        this.setState({ ...INITIAL_STATE });
      })
      .finally(this.setState({ loading: false }));
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
    const { images, loading, currentId } = this.state;
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
        {!loading && this.state.page < this.totalPages && (
          <Button onClick={this.nextPageHandler} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    );
  }
}

export default ImageGallery;
