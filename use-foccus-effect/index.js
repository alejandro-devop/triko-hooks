import {useRef, useCallback, useState, useEffect} from 'react';
import {AppState} from 'react-native';

const useFocusEffect = (callback) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (callback && callback instanceof Function) {
          callback();
        }
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    },
    [callback],
  );
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);
  return {appStateVisible};
};

export default useFocusEffect;
