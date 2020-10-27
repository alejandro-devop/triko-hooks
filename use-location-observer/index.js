import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
});

const useLocationObserver = (options = {}) => {
  const {
    distanceFilter = 20,
    timeout = 1000,
    enableHighAccuracy = false,
    maximumAge = 5000,
  } = options;
  const [initialized, setInitialized] = useState(false);
  const [location, setLocation] = useState({latitude: null, longitude: null});
  let observerId = null;

  const initialize = async () => {
    setInitialized(true);
    observerId = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        setLocation({
          latitude,
          longitude,
        });
      },
      (errorInfo) => {
        console.log('Error while watching position: ', errorInfo);
      },
      {
        timeout,
        enableHighAccuracy,
        maximumAge,
        distanceFilter,
      },
    );
  };

  const stopObserver = () => {
    Geolocation.clearWatch(observerId);
    Geolocation.stopObserving();
  };

  return {
    initialize,
    initialized,
    location,
    stopObserver,
  };
};

export default useLocationObserver;
