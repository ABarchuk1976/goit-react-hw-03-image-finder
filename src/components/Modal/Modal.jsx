import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handelKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handelKeyClose);
  }

  handelKeyClose = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handelClose = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { overlay, modal } = styles;
    const { children } = this.props;
    return (
      <div className={overlay} onClick={this.handelClose}>
        <div className={modal}>{children}</div>
      </div>
    );
  }
}

export default Modal;
