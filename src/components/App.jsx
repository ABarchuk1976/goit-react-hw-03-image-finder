import React, { Component } from 'react';

import styles from './App.module.css';
import ImageGallery from './ImageGallery';
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
    const { searchQuery } = this.state;

    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.submitFormHandler} />
        {searchQuery && <ImageGallery searchQuery={searchQuery} />}
      </div>
    );
  }
}

export default App;
