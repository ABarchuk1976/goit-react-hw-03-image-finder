import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ page, onClick }) => (
  <button className={styles.buttonMore} onClick={onClick}>
    Load more
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
