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

  // componentDidMount() {
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   if (parsedContacts) this.setState({ contacts: [...parsedContacts] });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { contacts } = this.state;

  //   if (prevState.contacts !== contacts)
  //     contacts.length
  //       ? localStorage.setItem('contacts', JSON.stringify(contacts))
  //       : localStorage.removeItem('contacts');
  // }

  submitFormHandler = ({ search }) => {
    this.setState({ searchQuery: search });
  };

  // filterChangeHandler = evt => {
  //   const normalizedStr = evt.target.value.trim().toLowerCase();
  //   this.setState({ filter: normalizedStr });
  // };

  // deleteContactHandler = id => {
  //   const { contacts } = this.state;
  //   this.setState({ contacts: contacts.filter(contact => contact.id !== id) });
  // };

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
