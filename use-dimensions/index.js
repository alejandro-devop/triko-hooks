import {Dimensions} from 'react-native';

const useDimensions = () => {
  const {width, height} = Dimensions.get('window');
  return {screenW: width, screenH: height};
};

export default useDimensions;
