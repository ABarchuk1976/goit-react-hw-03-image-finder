import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  componentDidMount() {
    this.setState({ search: '' });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  };

  handlerInputChange = evt => {
    const { value } = evt.target;
    this.setState({ search: value });
  };

  render() {
    const { search } = this.state;
    const { Searchbar, SearchForm, SearchForm__button, SearchForm__input } =
      styles;

    return (
      <header className={Searchbar}>
        <form className={SearchForm} onSubmit={this.handleSubmit}>
          <button
            className={SearchForm__button}
            type="submit"
            disabled={!search}
          >
            &#128269;
          </button>
          <input
            className={SearchForm__input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            title="field for entering search query"
            value={search}
            onChange={this.handlerInputChange}
            required
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
