import { ThreeCircles } from 'react-loader-spinner';

const Loader = ({ id, name, number, onClick }) => {
  return (
    <ThreeCircles
      height="100"
      width="100"
      color="#3f51b5"
      visible={true}
      ariaLabel="three-circles-rotating"
    />
  );
};

export default Loader;
