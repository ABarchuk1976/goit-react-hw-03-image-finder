import PropTypes from 'prop-types';
import styles from './Modal.module.css';

const Modal = ({ largeImg, tags }) => {
  const { overlay, modal } = styles;
  return (
    <div class={overlay}>
      <div class={modal}>
        <img src={largeImg} alt={tags} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;
