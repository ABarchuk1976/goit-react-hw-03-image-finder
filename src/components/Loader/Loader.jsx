import { ThreeCircles } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
      <ThreeCircles
        height="50"
        width="50"
        color="#3f51b5"
        visible={true}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default Loader;
