import React, { Component } from 'react';
// import shortid from 'shortid';

import styles from './App.module.css';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Searchbar from './Searchbar';

// idle, pending, resolved, reject, modal
class App extends Component {
  state = {
    searchQuery: '',
  };

  submitFormHandler = ({ search }) => {
    this.setState({ searchQuery: search.trim().toLowerCase() });
  };

  render() {
    const { searchQuery, status } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.submitFormHandler} />
        {status === 'pending' && <Loader />}
        <ImageGallery searchQuery={searchQuery} />
      </div>
    );
  }
}

export default App;
