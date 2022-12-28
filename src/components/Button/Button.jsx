import styles from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ page, onClick }) => (
  <button className={styles.buttonMore} onClick={() => onClick(page)}>
    Load more
  </button>
);

Button.propTypes = {
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
