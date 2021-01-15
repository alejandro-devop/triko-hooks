import {useState, useRef} from 'react';
import {Dimensions, Platform} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const defaultOffset = Platform.select({ios: 220, android: 160});

const useScrollIndicator = (config = {}) => {
  const {offset = defaultOffset, maxOffset = 50} = config;
  const scrollRef = useRef(null);
  const [needScroll, setNeedScroll] = useState(false);
  const [visibleIndicator, setVisibleIndicator] = useState(false);
  const onScroll = ({nativeEvent}) => {
    const {y} = nativeEvent.contentOffset;
    if (needScroll && y >= maxOffset) {
      setVisibleIndicator(false);
    } else if (needScroll && y < maxOffset) {
      setVisibleIndicator(true);
    }
  };
  const onLayout = ({nativeEvent}) => {
    const {height} = nativeEvent.layout;
    if (height + offset > screenHeight) {
      setNeedScroll(true);
      setVisibleIndicator(true);
    } else {
      setNeedScroll(false);
      setVisibleIndicator(false);
    }
  };
  return {
    scrollRef,
    visibleIndicator,
    needScroll,
    onScroll,
    onLayout,
  };
};

export default useScrollIndicator;
